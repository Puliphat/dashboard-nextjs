import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function GET(req, context) {
    const { id } = context.params;
    await connectMongoDB();
    const user = await User.findById({_id: id});
    return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(req, context) {
    const { id } = context.params;
    const { newName: name, newEmail: email, newPassword: password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.findByIdAndUpdate(id, {name, email, password: hashedPassword});
    return NextResponse.json({ message: "User updated" }, { status: 200 });
}

