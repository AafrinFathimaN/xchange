import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Skill from "@/models/skill";

export async function GET() {
  try {
    await connectToDatabase();
    const skills = await Skill.find();
    return NextResponse.json(skills);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { userId, skill } = await request.json();

    if (!userId || !skill) {
      return NextResponse.json(
        { message: "Missing required fields (userId or skill)" },
        { status: 400 }
      );
    }

    const newSkill = await Skill.create({ userId, skill });
    return NextResponse.json({ message: "Skill added", skill: newSkill });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
