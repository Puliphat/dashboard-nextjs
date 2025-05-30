import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

// POST /api/userExists
export async function POST(req) {
  try {
    await connectMongoDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("_id");

    return NextResponse.json({ exists: !!user });

  } catch (error) {
    console.error("Error in /api/userExists:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}