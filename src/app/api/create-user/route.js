// This is for creating a User in our CUSTOM Users table, not Supabase's
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the incoming JSON request
    const { id, email, firstName, lastName } = await request.json();
    // Check if all required fields are present
    if (!id || !email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields: id, email, firstName, lastName' },
        { status: 400 }
      );
    }
    const name = `${firstName} ${lastName}`;
    // Create the new user in the database
    await prisma.user.create({
      data: {
        id,       
        email,
        name,
      },
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);

    // Handle unique constraint violation for email
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      );
    }
    // Handle invalid UUID format 
    if (error.code === 'P2003' && error.meta?.field_name === 'id') {
      return NextResponse.json(
        { error: 'Invalid user ID format' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
