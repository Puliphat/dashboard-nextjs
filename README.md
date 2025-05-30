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
