import { NextResponse } from "next/server"

let skills = [] // temporary in-memory storage

// GET all skills
export async function GET() {
  return NextResponse.json(skills)
}

// POST a new skill
export async function POST(request) {
  const { userId, skill } = await request.json()

  skills.push({ userId, skill })
  return NextResponse.json({ message: "Skill added", skills })
}
