'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

function WelcomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [postData, setPostsData] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
      return;
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      const getPosts = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/posts?email=${session.user.email}`, {
            cache: 'no-store'
          });
          
          if (!res.ok) {
            throw new Error('Failed to fetch posts');
          }

          const data = await res.json();
          setPostsData(data.posts);
        } catch (error) {
          console.log('Error loading posts', error);
        }
      };

      getPosts();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </Container>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <Container>
      <Navbar session={session} />
      <div className='flex-grow'>
        <div className='container mx-auto shadow-xl p-10 my-10 rounded-xl'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-3xl font-semibold mb-2'>Profile</h3>
              <p>Welcome, {session.user.name}</p>
              <p className='mb-2'>Email: {session.user.email}</p>
            </div>
            <div>
              <Link href="/create" className='bg-green-500 text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer'>Create Post</Link>
            </div>
          </div>

          {/* user posts data*/}
          <div>
            {postData && postData.length > 0 ? (
              postData.map((post) => (
                <div key={post._id} className='shadow-xl p-10 my-10 rounded-xl'>
                  <h3 className='text-2xl'>{post.title}</h3>
                  <Image className='my-3 rounded-md object-cover' 
                    src={post.img} 
                    width={300}
                    height={300}
                    alt={post.title}   
                  />
                  <p>{post.content}</p>
                  <div className='mt-5'>
                    <Link href={`/edit/${post._id}`} className='bg-gray-500 text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer'>Edit</Link>
                    <DeleteBtn id={post._id} />
                  </div>
                </div>
              ))
            ) : (
              <p className='bg-gray-500 text-white border rounded-md p-3 my-3 text-lg'> 
                Let's get started — add a post!  
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  )
}

export default WelcomePage;
