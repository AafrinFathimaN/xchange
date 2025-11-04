import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    const state = conn?.connection?.readyState;
    return NextResponse.json({ ok: true, dbConnected: state === 1, state });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
