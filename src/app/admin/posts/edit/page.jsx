import React from 'react'
import Container from '../../components/Container'
import AdminNav from '../../components/AdminNav'
import Footer from '../../components/Footer'
import Link from 'next/link'

function AdminEditPostPage() {
  return (
    <Container>
      <AdminNav />
      <div className='flex-grow'>
            <div className='container mx-auto shadow-xl p-10 my-10 rounded-xl'>
                    <Link href="/admin/posts" className='bg-gray-500 inline-block text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer' >Go Back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl font-bold'>Admin Edit Post Page</h3>
                    <form className='mt-3 flex flex-col' action="">
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' placeholder='Title..' />
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' placeholder='Img URL..' />
                        <textarea type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' placeholder='Content..' />
                        
                        <button type='submit' name='update' className='w-fit bg-green-500 text-white border rounded-lg py-2 px-3 my-2 text-lg cursor-pointer' >Update Post</button>
                    </form>
            </div>
      </div>

      <Footer />
    </Container>
  )
}

export default AdminEditPostPage 
