import express from 'express';
import {
  getUsernameController,
  searchUsernameController,
} from './controller.js';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello There!');
});

// static route
app.get('/about', (req, res) => {
  res.send('this is about page');
});

// dynamic route
// 1. parameter route
app.get('/about/:username', getUsernameController);
// 2. query route
app.get('/user', searchUsernameController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
