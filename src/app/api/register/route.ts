// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(request: Request) {
  // 1. Connect to the database
  await dbConnect();

  try {
    // 2. Get the email and password from the request body
    const { email, password } = await request.json();

    // 3. Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists.' },
        { status: 400 } // Bad Request
      );
    }

    // 4. Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // 5. Create a new user in the database
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // 6. Send a success response
    return NextResponse.json(
      { message: 'User registered successfully.' },
      { status: 201 } // Created
    );

  } catch (error) {
    // 7. Handle any other errors
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration.' },
      { status: 500 } // Internal Server Error
    );
  }
}