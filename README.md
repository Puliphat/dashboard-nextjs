# 📊 Dashboard Web App

เว็บแอป Dashboard ที่ให้ผู้ใช้สามารถสร้างและจัดการโพสต์ของตนเองได้ พร้อมระบบแยกระหว่าง User และ Admin

---

## 🧩 Features

### 🧑‍💻 ฝั่งผู้ใช้ (User)
- ✅ ลงทะเบียนและล็อกอินด้วย Email & Password (ผ่าน NextAuth)
- 🖼 เพิ่มโพสต์: หัวข้อ + รูปภาพ + คำอธิบาย
- ✏️ แก้ไข / 🗑 ลบโพสต์ของตนเอง

### 🛠 ฝั่งแอดมิน (Admin)
- 📈 แสดงสถิติ: จำนวนผู้ใช้ และจำนวนโพสต์ทั้งหมด
- 👥 ดูรายชื่อผู้ใช้ทั้งหมด
- 🧹 ลบและแก้ไขผู้ใช้ได้
- 🔧 แก้ไข / 🗑 ลบโพสต์ของผู้ใช้ได้ทั้งหมด

---

## 🛠 Tech Stack

- **Frontend**: Next.js 
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: MongoDB (เชื่อมผ่าน Mongoose)
- **UI**: TailwindCSS

---

## ⚙️ วิธีติดตั้งและรันในเครื่อง (Local)

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/Puliphat/dashboard-nextjs
cd your-repo
npm install
npm run dev


## 🧾 การตั้งค่าฐานข้อมูล MongoDB

แอปนี้ใช้ MongoDB ผ่าน Mongoose โดย:

หากคุณยังไม่เคยใช้ MongoDB มาก่อน แนะนำให้:

1. สมัครใช้งานฟรีที่ [mongodb.com](https://www.mongodb.com/)
2. สร้าง Cluster, ตั้งค่าผู้ใช้ และ IP Access
3. คัดลอก Connection URI มาใส่ใน `.env` ของโปรเจกต์นี้:

- **ไม่จำเป็นต้องสร้างฐานข้อมูลหรือ collection เองใน MongoDB Atlas**
- เมื่อรันแอปและมีการบันทึกข้อมูลครั้งแรก (เช่น การลงทะเบียน user)  
  → MongoDB จะ **สร้างฐานข้อมูลและ collection ให้อัตโนมัติ**

### วิธีตั้งค่า `.env`

สร้างไฟล์ชื่อ `.env` ที่ root ของโปรเจกต์ แล้วใส่:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.e.mongodb.net/<your-db-name>
NEXTAUTH_SECRET=nextauth
NEXTAUTH_URL=http://localhost:3000

==============================================================================================================

📊 Dashboard Web App
A Dashboard web application that allows users to create and manage their own posts, with a role-based system separating User and Admin functionalities.

🧩 Features
🧑‍💻 User Side
✅ Register and log in using Email & Password (via NextAuth)

🖼 Add posts: title + image + description

✏️ Edit / 🗑 Delete their own posts

🛠 Admin Side
📈 View statistics: total number of users and posts

👥 View all registered users

🧹 Edit and delete any user

🔧 Edit / 🗑 Delete any user's post

🛠 Tech Stack
Frontend: Next.js

Authentication: NextAuth.js

Database: MongoDB (connected via Mongoose)

UI: TailwindCSS

⚙️ How to Install and Run Locally
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
🧾 MongoDB Database Setup
This app uses MongoDB via Mongoose.

If you're new to MongoDB, follow these steps:

Sign up for a free account at mongodb.com

Create a Cluster, set up a user, and configure IP access

Copy your connection URI and add it to the .env file in the project root

No need to manually create a database or collections in MongoDB Atlas

Once the app runs and data is saved (e.g., during user registration),
→ MongoDB will automatically create the database and collections

How to Set Up the .env File
Create a file named .env at the root of your project and add the following:

env
Copy
Edit
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.e.mongodb.net/<your-db-name>
NEXTAUTH_SECRET=nextauth
NEXTAUTH_URL=http://localhost:3000