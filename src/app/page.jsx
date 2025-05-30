"use client"

import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <Container>
      <Navbar session={session} />
      <div className="flex-grow text-center p-10 mt-20">
        <h3 className="text-5xl font-bold">NextJS Dashboard</h3>
        <p className="text-gray-500 mt-3">This is a full-stack web application dashboard built with Next.js.</p>
        <div className="flex justify-center my-10">
          <Image src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="rounded-md" alt="cat" width={500} height={500} />
        </div>
      </div>
      <Footer />
    </Container>
  );
}
