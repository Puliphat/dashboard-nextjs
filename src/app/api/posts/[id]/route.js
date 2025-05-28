import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

//ดึงค่า post เก่ามาแสดงผลที่ id เท่ากับค่า id ที่ส่งมา
export async function GET(req, { params }) {
    const { id } = await params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 });
}


export async function PUT(req, { params }) {
    const { id } = await params;
    const { newTitle: title, newImg: img, newContent: content } = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { title, img, content });
    return NextResponse.json({ message: 'Post updated' }, { status: 200 });
}
