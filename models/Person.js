import mongoose from 'mongoose';

const personScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: Number,
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const Person = mongoose.model('People', personScheme);
