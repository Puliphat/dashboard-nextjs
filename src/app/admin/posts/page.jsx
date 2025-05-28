import React from 'react'
import Container from '../components/Container'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import Link from 'next/link'
import Image from 'next/image'


function PostsPage() {
  return (
    <div>
      <Container>
        <AdminNav />
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
                                    <tr>
                                        <td  className='p-5'>11</td>
                                        <td className='p-5'>this is a post title</td>
                                        <td className='p-5'>
                                            <Image
                                            className='my-3 rounded-md'
                                            src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="post image"
                                            width={80}
                                            height={80}
                                            />
                                        </td>
                                        <td className='p-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, cumque.</td>
                                        <td className='p-5 flex gap-3'>
                                            <Link href='/admin/posts/edit' className='bg-gray-500 text-white border px-3 py-2 rounded-md my-2 text-lg'>Edit</Link>
                                            <Link href='/admin/posts/delete' className='bg-red-500 text-white border px-3 py-2 rounded-md my-2 text-lg'>Delete</Link>
                                        </td>
                                    </tr>
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
