const express = require('express');
const cors = require('cors');
const app = express();

// const PORT = process.env.PORT || 5000;

app.get('/api/users', cors(), (req, res) => {
  res.json({"users":[
    {
      'id': 1,
      'name': 'David',
      'username': 'skidoosh',
      'password': 'boop123'
    },
    {
      'id': 2,
      'name': 'Mark',
      'username': 'whore',
      'password': 'bloop123'
    }
  ]});
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