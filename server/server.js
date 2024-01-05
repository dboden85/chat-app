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

  socket.on("join_room", (data) => {
    socket.join(data.room);
  });

  socket.on("send_message", (data) => {

    // io.to(data.room).emit("receive_message", data.newMessage);

    socket.broadcast.to(data.room).emit('receive_message', data.newMessage);

    // const { message, userid, name } = data;
    const name = data.newMessage.name;
    const userid = data.newMessage.userid;
    const message = data.newMessage.message;
    const room = data.room;

    const query = 'INSERT INTO chats (name, userid, message, roomid) VALUES(?, ?, ?, ?);';

    db.query(query, [name, userid, message, room], (error) => {
      if (error) {
        console.log("Error adding a new message to the chats database:", error);
      }
    });
  });
});

// Routes
app.get('/api/users', getAllUsers);
app.post('/api/login', loginUser);
app.post('/api/signup', signUpUser);
app.post('/api/signout', signOutUser);
app.post('/api/chats', getAllChats);
app.post('/api/convo-list', getConversationList);
app.post('/api/friendslist', getFriendsList);
app.post('/api/startconvo', startConvo);

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
  const { id } = req.body;
  const query = 'UPDATE users SET isonline = 0 WHERE id = ?;';

  db.query(query, id, (error) => {
    if (error) {
      return handleDatabaseError(error, res);
    }
    res.status(200).json({ message: 'Signout Successful', status: 1 });
  });
}

function getFriendsList(req, res) {
  const { userid } = req.body;
  const query = 'SELECT id, firstname, lastname FROM users where id != ?;';

  db.query(query, [userid], (error, results) => {
    if (error) {
      return handleDatabaseError(error, res);
    }

    res.status(200).json({ message: 'Friendlist retrieved successfully', friends: results });

  })
}

function startConvo(req, res) {
  const { userid, friendid } = req.body;
  const qCheck = 'SELECT * FROM rooms WHERE (person_one = ? AND person_two = ?) OR (person_one = ? AND person_two = ?);';
  const query = 'INSERT INTO rooms(person_one, person_two) VALUES(?, ?);';
  const getPrimaryID = 'SELECT id FROM rooms WHERE id = LAST_INSERT_ID();';

  db.query(qCheck, [userid, friendid, friendid, userid], (error, results) => {
    if (error) {
      return handleDatabaseError(error, res);
    }

    if (results.length > 0) {

      res.status(200).json({ message: 'Conversation Exists', convoid: results[0].id, status: 2 });

    } else {

      db.query(query, [userid, friendid], (aerror, aresults) => {

        if (aerror) {

          return handleDatabaseError(aerror, res);

        }

        db.query(getPrimaryID, (berror, bResults) => {
          if (berror) {

            return handleDatabaseError(berror, res);

          }

          res.status(200).json({ message: 'Conversation started successfully', convoid: bResults[0].id, status: 1 });

        })

      })

    }

  })

}

function getConversationList(req, res) {
  const { uid } = req.body;
  const query = `SELECT rooms.id, users.firstname, users.lastname FROM rooms INNER JOIN users ON rooms.person_one = users.id OR rooms.person_two = users.id WHERE (rooms.person_one = ${uid} OR rooms.person_two = ${uid}) AND users.id != ${uid};`;
  db.query(query, (error, results) => {
    if (error) {
      return handleDatabaseError(error, res);
    }
    // handleDatabaseResponse(error, results, res);
    res.status(200).json({ message: 'Conversation List Received', results: results, status: 1 });
  })
}


function getAllChats(req, res) {
  const { room } = req.body;
  const query = 'SELECT * FROM chats WHERE roomid = ?;';
  db.query(query, [room], (error, results) => {
    handleDatabaseResponse(error, results, res);
  });
}

// Start the server
server.listen(PORT, () => {
  console.log(`Hello ${lUser}! Server is running on port ${PORT}`);
});
