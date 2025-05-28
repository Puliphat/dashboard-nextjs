import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

//ส่งข้อมูล post ไปยัง database
export async function POST(req) {
    const { title, img, content,userEmail } = await req.json();
    await connectMongoDB();
    await Post.create({ title, img, content,userEmail });
    return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
}

//ดึงข้อมูลจาก database
export async function GET(req) {
    //บันทัดนี้ดึง params จาก local storage เพื่อเช็คว่าตรงกับ email ใน database ไหม เพื่อแสดงแต่โพสที่ตรงกัน
    const userEmail = req.nextUrl.searchParams.get('email');
  
    await connectMongoDB();
    const posts = await Post.find({ userEmail : userEmail });
    return NextResponse.json({ posts });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
}


