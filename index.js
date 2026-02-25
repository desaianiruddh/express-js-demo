import express from 'express';
import router from './route.js';

const app = express();
const port = 3000;

// logger middleware
app.use((req, res, next) => {
  console.log('New request received at', new Date().toISOString());
  next();
});

app.use(express.json()); // Middleware to parse JSON bodies

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
// removed body-parser as express has inbuilt json parser now as middleware
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: `User ${name} with email ${email} created successfully!`,
  });
});

app.put('/users/:id', (req, res) => {
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

// Middleware for only /welcome route
app.use('/welcome', (req, res, next) => {
  console.log('Welcome to the Express.js application (Middleware)!');
  res.on('finish', () => {
    // This will run after the response is sent
    console.log('End');
  })
  next();
});

app.get('/welcome', (req, res) => {
  res.send(
    'Welcome to the Express.js application!, Check the terminal for middleware message.',
  );
});

// Route to trigger an error for testing error handling middleware
app.get('/error', (req, res) => {
  throw new Error('This is a test error!');
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
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
