import express from 'express';
import router from './route.js';
import { connectDB } from './config/db.js';
import { Person } from './models/Person.js';

const app = express();
const port = 3000;

// connect to database
await connectDB();

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use('/public', express.static('public')); // for virtual path

// logger middleware
app.use((req, res, next) => {
  console.log('New request received at', new Date().toISOString());
  next();
});

app.use(express.json()); // Middleware to parse JSON bodies

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.get('/', (req, res) => {
  res.render('index', { userName: 'John Doe' });
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
  });
  next();
});

app.get('/welcome', (req, res) => {
  res.send(
    'Welcome to the Express.js application!, Check the terminal for middleware message.',
  );
});

// add person api
app.post('/add-person', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const newPerson = new Person({ name, age, email });
    await newPerson.save();
    res.json({ message: 'Person added successfully!', person: newPerson });
  } catch (error) {
    console.error('Error adding person:', error);
    res.json({ message: error.message || 'Failed to add person' });
  }
});

// update person
app.put('/update-person', async (req, res) => {
  try {
    // const { email, age } = req.body;
    // const person = await Person.findOne({ email, age });
    const { id, ...body } = req.body;
    const person = await Person.findByIdAndUpdate(id, body);
    // const person = await Person.findById(id);
    // person.email = body.email || person.email;
    // person.name = body.name || person.name;
    // person.age = body.age || person.age;
    // await person.save();
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person updated successfully!', person });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ message: 'Failed to update person' });
  }
});

app.delete('/delete-person/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndDelete(id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted successfully!' });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ message: 'Failed to delete person' });
  }
});

app.get('/get-person', async (req, res) => {
  try {
    const people = await Person.find();
    res.json({ message: 'People fetched successfully!', people });
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ message: 'Failed to fetch people' });
  }
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
