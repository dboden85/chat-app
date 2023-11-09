const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const PORT = 5000;

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

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://chat.david-boden.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);

    const { mess, uid, uname } = data;

    const query = 'INSERT INTO chats (name, userid, message) VALUES(?, ?, ?);';

    db.query(query, [uname, uid, mess], (error, results) => {
      if (error) {
        console.log("something went wrong while adding a new message to the chats database");
      }
    });
  });

});



// Routes

// Get all users
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (error, results) => {
    handleDatabaseResponse(error, results, res);
  });
});

// User login
app.post('/api/login', (req, res) => {
  console.log('Login Ran');
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
          db.query(setStatus, results[0].id, (aError, aResults) => {
            if (aError) {
              return handleDatabaseError(aError);
            }

            if (aResults) {
              res.status(200).json({ message: 'Login successful', name: results[0].firstname, id: results[0].id, status: 1 });
            }

          })

        } else {
          res.status(401).json({ message: 'Login failed', status: 0 });
        }
      });
    } else {
      res.status(401).json({ message: 'Login failed', status: 0 });
    }
  });
});

// User signup
app.post('/api/signup', (req, res) => {
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
        db.query(addUserQuery, [username, fname, lname, hash], (addError, aResults) => {
          if (addError) {
            return handleDatabaseError(addError, res);
          }

          if (aResults) {
            res.status(200).json({ message: 'New User Created', status: 1 });
          } else {
            res.status(401).json({ message: 'User not added', status: 0 });
          }
        });
      }
    });
  });
});

//User Signout
app.post('/api/signout', (req, res) => {
  console.log('signout ran');
  const { id } = req.body;
  const query = 'UPDATE users SET isonline = 0 WHERE id = ?;';

  db.query(query, id, (error, results) => {
    if (error) {
      return handleDatabaseError(error, res)
    }

    if (results) {
      res.status(200).json({ message: 'Signout Successful', status: 1 });
    } else {
      res.status(200).json({ message: 'Help', status: 0 });
    }


  })
})

// Get all chats
app.get('/api/chats', (req, res) => {
  const query = 'SELECT * FROM chats';
  db.query(query, (error, results) => {
    handleDatabaseResponse(error, results, res);
  });
});

// Create a new chat message
// app.post('/api/chats', (req, res) => {
//   const { mess, uid, uname } = req.body;
//   const query = 'INSERT INTO chats (name, userid, message) VALUES(?, ?, ?);';

//   db.query(query, [uname, uid, mess], (error, results) => {
//     handleDatabaseResponse(error, results, res);
//   });
// });

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

// Start the server

const lUser = process.env.USER;
server.listen(PORT, () => {
  console.log(`Hello ${lUser}! Server is running on port ${PORT}`);
});
