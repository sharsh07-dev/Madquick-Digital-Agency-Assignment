// src/models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    select: false, // This will prevent the password from being sent back in queries by default
  },
});

// This prevents Mongoose from redefining the model every time in development (hot-reloading)
export default mongoose.models.User || mongoose.model('User', UserSchema);