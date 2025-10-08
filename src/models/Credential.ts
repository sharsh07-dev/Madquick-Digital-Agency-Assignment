// src/models/Credential.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ICredential extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  website: string;
  username: string;
  encryptedPassword: string; // We'll store the encrypted password here
  createdAt?: Date;
  updatedAt?: Date;
}

const CredentialSchema: Schema<ICredential> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This creates a reference to the User model
      required: true,
    },
    website: {
      type: String,
      required: [true, 'Website is required.'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
    },
    encryptedPassword: {
      type: String,
      required: [true, 'Password is required.'],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const CredentialModel =
  (mongoose.models.Credential as mongoose.Model<ICredential>) ||
  mongoose.model<ICredential>('Credential', CredentialSchema);

export default CredentialModel;