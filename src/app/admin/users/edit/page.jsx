import React from 'react'
import Container from '../../components/Container'
import AdminNav from '../../components/AdminNav'
import Footer from '../../components/Footer'
import Link from 'next/link'

function EditUserPage() {
  return (
    <Container>
      <AdminNav />
      <div className='flex-grow'>
            <div className='container mx-auto shadow-xl p-10 my-10 rounded-xl'>
                    <Link href="/admin/users" className='bg-gray-500 inline-block text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer' >Go Back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl font-bold'>Admin Edit User Page</h3>
                    <form className='mt-3 flex flex-col' action="">
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' placeholder='Username..' />
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' placeholder='Email..' />
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' placeholder='Password..' />
                        
                        <button type='submit' name='update' className='w-fit bg-green-500 text-white border rounded-lg py-2 px-3 my-2 text-lg cursor-pointer' >Update User</button>
                    </form>
            </div>
      </div>

      <Footer />
    </Container>
  )
}

export default EditUserPage
