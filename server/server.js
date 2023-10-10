const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

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