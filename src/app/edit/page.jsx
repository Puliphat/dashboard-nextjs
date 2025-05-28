import React from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'       
import Link from 'next/link'

function EditPage() {
  return (
    <div>
      <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl p-10 my-10 rounded-xl'>
                    <Link href="/welcome" className='bg-gray-500 inline-block text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer' >Go Back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl font-bold'>Edit Post</h3>
                    <form className='mt-3 flex flex-col' action="">
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' placeholder='Title..' value="title before update"/>
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' placeholder='Image URL..' value="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                        <textarea name="" id="" cols="30" rows="10" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' placeholder='Enter your post content..' >
                            Content before update
                        </textarea>
                        <button type='submit' name='update' className='w-fit bg-green-500 text-white border rounded-lg py-2 px-3 my-2 text-lg cursor-pointer' >Update Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </Container>
    </div>
  )
}

export default EditPage
