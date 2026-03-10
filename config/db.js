import mongoose from 'mongoose';

export const connectDB = async () => {
  const MONGODB_URI =
    'mongodb+srv://expressdemo:expressdemo123@cluster0.buuhcz2.mongodb.net/expressdemo';

  await mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
};
