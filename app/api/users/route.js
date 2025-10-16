import { NextResponse } from "next/server"

// 🧠 Temporary in-memory array (resets when server restarts)
let users = []

// 🔹 Handle GET request — return all users
export async function GET() {
  console.log("GET /api/users called. Current users:", users)
  return NextResponse.json(users)
}

// 🔹 Handle POST request — add a new user
export async function POST(request) {
  try {
    const { id, name, email } = await request.json()

    if (!id || !email) {
      return NextResponse.json(
        { message: "Missing required fields (id or email)" },
        { status: 400 }
      )
    }

    const existing = users.find(u => u.id === id)
    if (existing) {
      console.log("User already exists:", existing)
      return NextResponse.json({ message: "User already exists", users })
    }

    const newUser = { id, name, email }
    users.push(newUser)
    console.log("User added:", newUser)

    return NextResponse.json({
      message: "User added successfully!",
      users,
    })
  } catch (err) {
    console.error("Error in POST /api/users:", err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
