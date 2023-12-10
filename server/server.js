const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const http = require("http");
const { Server } = require("socket.io");

const saltRounds = 10;
const PORT = 5000;
const lUser = process.env.USER;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://chat.david-boden.com",
    methods: ["GET", "POST"],
  },
});

// Database configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'dboden',
  password: 'davbod12',
  database: 'mdchatdb',
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

// Socket.IO
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);

    socket.broadcast.emit('receive_message', data);

    const { message, userid, name } = data;
    const query = 'INSERT INTO chats (name, userid, message) VALUES(?, ?, ?);';

    db.query(query, [name, userid, message], (error) => {
      if (error) {
        console.log("Error adding a new message to the chats database");
      }
    });
  });
});

// Routes
app.get('/api/users', getAllUsers);
app.post('/api/login', loginUser);
app.post('/api/signup', signUpUser);
app.post('/api/signout', signOutUser);
app.get('/api/chats', getAllChats);
app.post('/api/convo-list', getConversationList);
// Helper functions
function handleDatabaseError(error, res) {
  console.error('Error executing query: ' + error);
  res.status(500).send('Error during database operation');
}

function handleDatabaseResponse(error, results, res) {
  if (error) {
    handleDatabaseError(error, res);
  } else {
    res.json(results);
  }
}

// Route handlers
function getAllUsers(req, res) {
  const query = 'SELECT * FROM users';
  db.query(query, (error, results) => {
    handleDatabaseResponse(error, results, res);
  });
}

function loginUser(req, res) {
  const { username, pass } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?;';
  const setStatus = 'UPDATE users SET isonline = 1 WHERE id = ?;';

  db.query(query, [username], (error, results) => {
    if (error) {
      return handleDatabaseError(error, res);
    }

    if (results.length === 1) {
      bcrypt.compare(pass, results[0].password, (compareErr, isMatch) => {
        if (compareErr) {
          return handleDatabaseError(compareErr, res);
        }
        if (isMatch) {
          db.query(setStatus, results[0].id, (aError) => {
            if (aError) {
              return handleDatabaseError(aError, res);
            }
            res.status(200).json({ message: 'Login successful', name: results[0].firstname, id: results[0].id, status: 1 });
          });
        } else {
          res.status(401).json({ message: 'Login failed', status: 0 });
        }
      });
    } else {
      res.status(401).json({ message: 'Login failed', status: 0 });
    }
  });
}

function signUpUser(req, res) {
  const { username, fname, lname, pass } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?;';
  const addUserQuery = 'INSERT INTO users (username, firstname, lastname, password) VALUES(?, ?, ?, ?);';

  bcrypt.hash(pass, saltRounds, (hashErr, hash) => {
    if (hashErr) {
      return handleDatabaseError(hashErr, res);
    }

    db.query(query, [username], (error, results) => {
      if (error) {
        return handleDatabaseError(error, res);
      }

      if (results.length > 0) {
        res.status(200).json({ message: 'That username is already in use', status: 0 });
      } else {
        db.query(addUserQuery, [username, fname, lname, hash], (addError) => {
          if (addError) {
            return handleDatabaseError(addError, res);
          }
          res.status(200).json({ message: 'New User Created', status: 1 });
        });
      }
    });
  });
}

function signOutUser(req, res) {
  console.log('Signout ran');
  const { id } = req.body;
  const query = 'UPDATE users SET isonline = 0 WHERE id = ?;';

  db.query(query, id, (error) => {
    if (error) {
      return handleDatabaseError(error, res);
    }
    res.status(200).json({ message: 'Signout Successful', status: 1 });
  });
}

function getConversationList(req, res){
  const { uid } = req.body;
  const query = 'SELECT rooms.id, users.firstname, users.lastname FROM rooms INNER JOIN users ON rooms.person_one = users.id OR rooms.person_two = users.id WHERE (rooms.person_one = 1 OR rooms.person_two = 1) AND users.id != 1;';
  db.query(query, (error, results) => {
    if(error){
      return handleDatabaseError(error, res);
    }
    // handleDatabaseResponse(error, results, res);
    res.status(200).json({ message: 'Conversation List Received', id: results[0].id, fname: results[0].firstname, lname: results[0].lastname,  status: 1 });
    console.log(results[0]);
    console.log(results[0].firstname);
  })
}


function getAllChats(req, res) {
  const query = 'SELECT * FROM chats';
  db.query(query, (error, results) => {
    handleDatabaseResponse(error, results, res);
  });
}

// Start the server
server.listen(PORT, () => {
  console.log(`Hello ${lUser}! Server is running on port ${PORT}`);
});
