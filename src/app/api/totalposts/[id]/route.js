import { connectMongoDB } from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import Post from "../../../../../models/post";

export async function GET(req, context) {
    const { id } = context.params;
    await connectMongoDB();
    const post = await Post.findById(id);
    return NextResponse.json({ post }, { status: 200 });
}


export async function PUT(req, context) {
    const { id } = context.params;
    const { newTitle: title, newImg: img, newContent: content } = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { title, img, content });
    return NextResponse.json({ message: "Post updated successfully" }, { status: 200 });
}


