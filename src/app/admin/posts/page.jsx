'use client'

import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

function PostsPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
          router.replace('/login');
          return;
        }
      }, [status, router, session]);    

    const [PostsData, setPostsData] = useState([]);

    const getPostsData = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts`, {
                cache: 'no-store'
            });

            if(!res.ok) {
                throw new Error("Failed to loading posts data");
            }

            const data = await res.json();
            setPostsData(data.totalPosts);

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostsData();
    }, []);


  return (
    <div>
      <Container>
        <AdminNav session={session} />
        <div className='flex-grow'>
            <div className='container mx-auto'>
                <div className='flex mt-10'>
                    <SideBar />
                    <div className='p-10'>
                        <h3 className='text-3xl mb-3'>Manage Posts</h3>
                        <hr className='border-gray-300 my-5'></hr>
                        <p className='mb-3 text-gray-600 text-lg'>A list of posts retrieved from the MongoDB database</p>

                        <div className='shadow-lg overflow-x-auto'>
                            <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                <thead>
                                    <tr className='bg-gray-400'>
                                        <th className='p-5'>Post ID</th>
                                        <th className='p-5'>Post Title</th>
                                        <th className='p-5'>Post Image</th>
                                        <th className='p-5'>Post Content</th>
                                        <th className='p-5'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PostsData?.map(post => (
                                      <tr key={post._id}>
                                      <td  className='p-5'>{post._id}</td>
                                      <td className='p-5'>{post.title}</td>
                                      <td className='p-5'>
                                          <img
                                          className='my-3 rounded-md'
                                          src={post.img}
                                          alt={post.title}
                                          width={80}
                                          height={80}
                                          />
                                      </td>
                                        <td className='p-5'>{post.content}</td>
                                        <td className='p-5 flex gap-3'>
                                          <Link href={`/admin/posts/edit/${post._id}`} className='bg-gray-500 text-white border px-3 py-2 rounded-md my-2 text-lg'>Edit</Link>
                                          <DeleteBtn id={post._id} />                                          
                                      </td>
                                  </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
      </Container>
    </div>
  )
}

export default PostsPage
