'use client'

import React, { useEffect, useState } from 'react'
import Container from '../../../components/Container'
import AdminNav from '../../../components/AdminNav'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function AdminEditPostPage({ params }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { id } = React.use(params);

  useEffect(() => {
    if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
      router.replace('/login');
      return;
    }
  }, [status, router, session]);

  const [OldPostData, setOldPostData] = useState({
    title: "",
    img: "",
    content: ""
  });

  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");

  const [error, setError] = useState("");

  const getPostById = async (id) => {
    try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts/${id}`, {
        method: 'GET',
        cache: 'no-store'
       });

       if(!res.ok) {
        throw new Error('Failed to fetch old post data');
       }

       const data = await res.json();
       setOldPostData(data.post);

    } catch (error) {
      console.log(error);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !newTitle || !newImg || !newContent) {
      setError("Please complete all fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({newTitle, newImg, newContent})
      });

      if(!res.ok) {
        throw new Error('Failed to update post');
      }

      router.refresh();
      router.push(`/admin/posts`);

    } catch (error) {
      console.log(error);
    } 
  }


  useEffect(() => {
    if (OldPostData) {
      setNewTitle(OldPostData.title);
      setNewImg(OldPostData.img);
      setNewContent(OldPostData.content);
    }
  }, [OldPostData]);


  useEffect(() => {
    getPostById(id);
  }, []);


  return (
    <Container>
      <AdminNav session={session} />
      <div className='flex-grow'>
            <div className='container mx-auto shadow-xl p-10 my-10 rounded-xl'>
                    <Link href="/admin/posts" className='bg-gray-500 inline-block text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer' >Go Back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl font-bold'>Admin Edit Post Page</h3>
                    {error && (
                      <div className='bg-red-500 w-fit text-sm text-white px-3 py-1 rounded-md mt-2'>
                        {error}
                      </div>
                    )}
                    <form className='mt-3 flex flex-col' onSubmit={handleSubmit}>
                        <input type="text" className='w-[300px] h-auto bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' 
                        value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <input type="text" className='w-[300px] h-auto bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' 
                        value={newImg} onChange={(e) => setNewImg(e.target.value)} />
                        <textarea type="text" className='w-[300px] h-auto bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' 
                        value={newContent} onChange={(e) => setNewContent(e.target.value)} />
                        
                        <button type='submit' name='update' className='w-fit bg-green-500 text-white border rounded-lg py-2 px-3 my-2 text-lg cursor-pointer' >Update Post</button>
                    </form>
            </div>
      </div>

      <Footer />
    </Container>
  )
}

export default AdminEditPostPage 
