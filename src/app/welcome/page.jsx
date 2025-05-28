'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

function page() {

   const { data: session } = useSession();
   console.log(session)

  return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl p-10 my-10 rounded-xl'>
                    <div className='flex justify-between'>
                    <div>
                        <h3 className='text-3xl'>Profile</h3>
                        <p>Welcome, {session?.user?.name}</p>
                        <p>Email: {session?.user?.email}</p>
                    </div>
                    <div>
                        <Link href="/create" className='bg-green-500 text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer' >Create Post</Link>
                    </div>
                    </div>

                    {/* user posts */}
                    <div>
                        <div className='shadow-xl p-10 my-10 rounded-xl'>
                            <h3 className='text-2xl'>Posts Title</h3>
                            <Image className='my-3 rounded-md object-cover' src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            width={300}
                            height={300}
                            alt="post image"   />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            </p>
                            <div className='mt-5'>
                               <Link href="/edit" className='bg-gray-500 text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer' >Edit</Link>
                               <Link href="/delete" className='bg-red-500 text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer' >Delete</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
  )
}

export default page
