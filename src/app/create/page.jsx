'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function CreatePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
      return;
    }
  }, [status, router]);
  
  useEffect(() => {
    if ( status === 'authenticated' && session?.user?.role == 'admin') {
      router.replace('/admin');
      return;
    }
  }, [session, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !img || !content) {
      setError('Please complete all fields to create a post');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, img, content, userEmail }),
      });

      if (res.ok) {
        router.push('/welcome');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.log(error);
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </Container>
    );
  }



  return (
    <Container>
      <Navbar session={session} />
      <div className='flex-grow'>
        <div className='container mx-auto shadow-xl p-10 my-10 rounded-xl'>
          <Link href="/welcome" className='bg-gray-500 inline-block text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer'>Go Back</Link>
          <hr className='my-3' />
          <h3 className='text-xl font-bold'>Create Post</h3>
          {error && (
            <div className='bg-red-400 w-fit text-sm text-white px-3 py-1 rounded-md mt-2'>
              {error}
            </div>
          )}
          <form className='mt-3 flex flex-col' onSubmit={handleSubmit}>
            <input 
              type="text" 
              onChange={(e) => setTitle(e.target.value)} 
              className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg' 
              placeholder='Post title..' 
            />
            <input 
              type="text" 
              onChange={(e) => setImg(e.target.value)} 
              className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg' 
              placeholder='Post image url..' 
            />
            <textarea 
              onChange={(e) => setContent(e.target.value)} 
              className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg' 
              placeholder='Enter your post content..' 
              rows="10"
            />
            <button 
              type='submit' 
              disabled={loading}
              className={`w-fit bg-green-500 text-white border rounded-lg py-2 px-3 my-2 text-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </Container>
  )
}

export default CreatePage;
