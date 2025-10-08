// src/app/api/credentials/route.ts

import { NextResponse } from 'next/server';
import { auth } from 'auth-config';
import dbConnect from '@/lib/dbConnect';
import CredentialModel from '@/models/Credential';
import bcrypt from 'bcryptjs';


// Add this new function to src/app/api/credentials/route.ts

export async function GET(request: Request) {
  await dbConnect();

  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const credentials = await CredentialModel.find({ userId: user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { success: true, data: credentials },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching credentials:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching credentials.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    // 1. Check for user session
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // 2. Get data from the request body
    const { website, username, password } = await request.json();

    if (!website || !username || !password) {
        return NextResponse.json(
            { success: false, message: 'Website, username, and password are required.' },
            { status: 400 }
        );
    }

    // 3. Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // 4. Create a new credential object
    const newCredential = new CredentialModel({
      userId: user.id,
      website,
      username,
      encryptedPassword,
    });

    // 5. Save it to the database
    await newCredential.save();

    return NextResponse.json(
      { success: true, message: 'Credential saved successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving credential:', error);
    return NextResponse.json(
      { success: false, message: 'Error saving credential.' },
      { status: 500 }
    );
  }
}

// Add this new function to src/app/api/credentials/route.ts

export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    const result = await CredentialModel.findOneAndDelete({
      _id: id,
      userId: user.id, // Ensure the user can only delete their own credentials
    });

    if (!result) {
      return NextResponse.json(
        { success: false, message: 'Credential not found or you do not have permission to delete it.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Credential deleted successfully.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting credential:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting credential.' },
      { status: 500 }
    );
  }
}

// Add this new function to src/app/api/credentials/route.ts

export async function PUT(request: Request) {
  await dbConnect();

  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id, website, username, password } = await request.json();

    // Find the credential ensuring it belongs to the logged-in user
    const credentialToUpdate = await CredentialModel.findOne({
      _id: id,
      userId: user.id,
    });

    if (!credentialToUpdate) {
      return NextResponse.json(
        { success: false, message: 'Credential not found or permission denied.' },
        { status: 404 }
      );
    }

    // Update the fields
    credentialToUpdate.website = website;
    credentialToUpdate.username = username;

    // Only hash and update the password if a new one was provided
    if (password) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      credentialToUpdate.encryptedPassword = encryptedPassword;
    }

    await credentialToUpdate.save();

    return NextResponse.json(
      { success: true, message: 'Credential updated successfully.', data: credentialToUpdate },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating credential:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating credential.' },
      { status: 500 }
    );
  }
}