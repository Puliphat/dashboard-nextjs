'use client'

import React, { useState, useEffect } from 'react'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'       
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function EditPage({ params }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const resolvedParams = React.use(params); //  ดึง params ที่เป็น Promise
  const { id } = resolvedParams;


  const [postData, setPostData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //New data for edit post
  const [newTitle, setNewTitle] = useState('');
  const [newImg, setNewImg] = useState('');
  const [newContent, setNewContent] = useState('');


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const getPostById = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: 'GET',
          cache: 'no-store'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await res.json();
        setPostData(data);
        setLoading(false);

      } catch (error) {
        console.log('Error loading post', error);
        setError('Failed to load post');
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      getPostById();
    }
  }, [id, session]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTitle || !newImg || !newContent) {
      setError('Please complete all fields');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newImg, newContent }),
      });

      if (res.ok) {
        router.push('/welcome');
      } else {
        throw new Error('Failed to update post');
      }

    } catch (error) {
      setError('Failed to update post');
    }
  };

  
  if (status === 'loading' || loading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </Container>
    );
  }


  return (
    <div>
      <Container>
        <Navbar session={session} />
        <div className='flex-grow'>
          <div className='container mx-auto shadow-xl p-10 my-10 rounded-xl'>
            <Link href="/welcome" className='bg-gray-500 inline-block text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer'>Go Back</Link>
            <hr className='my-3' />
            <h3 className='text-xl font-bold'>Edit Post</h3>
            {error && (
              <div className='bg-red-400 w-fit text-sm text-white px-3 py-1 rounded-md mt-2'>
                {error}
              </div>
            )}
            <form className='mt-3 flex flex-col'
              onSubmit={handleSubmit}
             >
              <input  
                type="text" 
                className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg' 
                  placeholder={postData.post?.title} 
                  onChange={(e) => setNewTitle(e.target.value)} value={newTitle}
              />
              <input 
                type="text" 
                className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg' 
                  placeholder={postData.post?.img} 
                  onChange={(e) => setNewImg(e.target.value)} value={newImg}
              />
              <textarea 
                className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg' rows="8"
                  placeholder={postData.post?.content} 
                  onChange={(e) => setNewContent(e.target.value)} value={newContent}
              />
              <button 
                type='submit' 
                className='w-fit bg-green-500 text-white border rounded-lg py-2 px-3 my-2 text-lg cursor-pointer'
              >
                Update Post
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </Container>
    </div>
  )
}

export default EditPage;