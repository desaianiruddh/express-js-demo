import express from 'express';
import router from './route.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello There!');
});
app.use('/user', router);

// Route with parameters and regex validation for id (must be a 4-digit number)
app.get('/users/:name/:id', (req, res) => {
  const { name, id } = req.params;
  res.send(`User Name: ${name}, User ID: ${id}`);
});

// express.json() is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
app.post('/users', express.json(), (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: `User ${name} with email ${email} created successfully!`,
  });
});

app.put('/users/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({
    message: `User with id ${id} updated to name ${name} and email ${email}!`,
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `User with id ${id} deleted successfully!`,
  });
});

// Catch-all route for undefined paths
app.use((req, res) => {
  res
    .status(404)
    .json({ message: 'Invalid URL. Please check the path and try again.' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
