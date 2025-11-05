import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { id, name, email } = await request.json();

    if (!id || !email) {
      return NextResponse.json(
        { message: "Missing required fields (id or email)" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ id });
    if (existing) {
      return NextResponse.json({ message: "User already exists", user: existing });
    }

    const newUser = await User.create({ id, name, email });
    return NextResponse.json({ message: "User added successfully", user: newUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
