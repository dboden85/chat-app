const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Create a MySQL database connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'dboden',
  password: 'davbod12',
  database: 'mdchatdb',
  // port: '5000',
});

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json());
app.use(cors());

//queries for users
// const users = [{
//   'id': 1,
//   'name': 'David',
//   'username': 'dboden',
//   'password': 'awesome'
// },
// {
//   'id': 2,
//   'name': 'Mark',
//   'username': 'mnoesen',
//   'password': 'iheartdudes'
// }]

// app.get('/api/users', (req, res) => {
//   res.json(users);
// });

app.get('/api/users', (req, res) => {
  // Execute a SQL query to fetch data from the database
  const query = 'SELECT * FROM users';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.json(results);
    }
  });
});

// app.post('/api/users', (req, res) => {
//   const { username, pass } = req.body;
//   const user = users.find((user) => user.username === username && user.password === pass);

//   if (user) {
//     res.status(200).json({ message: 'Login successful', name: user.name, id: user.id, status: 1 });
//   } else {
//     res.status(401).json({ message: 'Login failed', status: 0 });
//   }
// });

app.post('/api/login', (req, res) => {
  const { username, pass } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?;';
  

  db.query(query, [username, pass], (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).send('Error during authentication');
    } else {
      if (results.length === 1) {
        res.status(200).json({ message: 'Login successful', name: results[0].name, id: results[0].id, status: 1 });
      } else {
        res.status(401).json({ message: 'Login failed', status: 0 });
      }
    }
  });
});

app.post('/api/signup', (req, res) =>{
  const {fname, lname, username, pass} = req.body;
  const query = 'SELECT * FROM users WHERE username = ?;';
  const addUserQuery = 'INSERT INTO users(name, username, password) VALUES(? ?, ?, ?);';

  db.query(query, [username], (error, results) =>{
    if(error){
      console.error('Error executing query: ' + error);
      res.status(500).send('Error during query');
    }else{
      if(results.length > 0){
        res.status(200).json({message: 'That username is already in use', status: 0});
      }else{
        db.query(addUserQuery, [fname, lname, username, pass], (error, aResults) =>{
          if(error){
            console.error('Error while trying to add new user' + error);
            res.status(500).send('Error adding new user');
          }else{
            if(aResults){
              res.status(200).json({message: 'New User Created', status: 1})
            }else{
              res.status(401).json({message: 'User not added', status: 0})
            }
          }
        })
      }
    }
  })
})

//queries for conversations

// let chats = [
//   {
//     id: 1,
//     name: 'David',
//     userid: 1,
//     message: 'Hi Mark!',
//     isUser: null
//   },
//   {
//     id: 2,
//     name: 'Mark',
//     userid: 2,
//     message: 'Hi Dave!',
//     isUser: null
//   }
// ]


app.get('/api/chats', (req, res)=>{
  // Execute a SQL query to fetch data from the database
  const query = 'SELECT * FROM chats';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/chats', (req, res) =>{
  const{ mess, uid, uname } = req.body
  const query = 'INSERT INTO chats (name, userid, message) VALUES(?, ?, ?);';

  db.query(query, [uname, uid, mess], (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).send('Error with sending text');
    } else {
      if (results.length === 1) {
        res.status(200).json({ message: 'Message sent successfully'});
      } else {
        res.status(401).json({ message: 'Message failed'});
      }
    }
  });



  // const messObj = {
  //   id: chats.length + 1,
  //   name: uname,
  //   userid: uid,
  //   message: mess,
  //   isUser: null
  // }

  // chats.push(messObj)
  // res.status(200).json({ chats });
});

// app.get('/api/users', (req, res) => {mys
//   const apiDetails = 'http://192.168.0.121:5000/api/users';
//   // res.set('Access-Control-Allow-Origin', 'http://192.168.0.121:5173/');
//   res.send({
//     description: 'server is running, go to apiDetails to see api',
//     apiDetails,
//   });
// });

app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});