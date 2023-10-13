const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(bodyParser.json());
app.use(cors());

//queries for users
const users = [{
  'id': 1,
  'name': 'David',
  'username': 'dboden',
  'password': 'awesome'
},
{
  'id': 2,
  'name': 'Mark',
  'username': 'mnoesen',
  'password': 'iheartdudes'
}]

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { username, pass } = req.body;
  const user = users.find((user) => user.username === username && user.password === pass);

  if (user) {
    res.status(200).json({ message: 'Login successful', name: user.name, id: user.id, status: 1 });
  } else {
    res.status(401).json({ message: 'Login failed', status: 0 });
  }
});

//queries for conversations

const chats = [
  {
    id: 1,
    name: 'David',
    userid: 1,
    message: 'Hi Mark!',
    isUser: null
  },
  {
    id: 2,
    name: 'Mark',
    userid: 2,
    message: 'Hi Dave!',
    isUser: null
  }
]
app.get('/api/chats', (req, res)=>{
  res.json(chats);
});

// app.get('/api/users', (req, res) => {
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