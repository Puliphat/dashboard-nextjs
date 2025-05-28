import React from 'react'
import Container from '../components/Container'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import Link from 'next/link'


function UsersPage() {
  return (
    <div>
      <Container>
        <AdminNav />
        <div className='flex-grow'>
            <div className='container mx-auto'>
                <div className='flex mt-10'>
                    <SideBar />
                    <div className='p-10'>
                        <h3 className='text-3xl mb-3'>Manage Users</h3>
                        <hr className='border-gray-300 my-5'></hr>
                        <p className='mb-3 text-gray-600 text-lg'>A list of users retrieved from the MongoDB database</p>

                        <div className='shadow-lg overflow-x-auto'>
                            <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                <thead>
                                    <tr className='bg-gray-400'>
                                        <th className='p-5'>ID</th>
                                        <th className='p-5'>Username</th>
                                        <th className='p-5'>Email</th>
                                        <th className='p-5'>Password</th>
                                        <th className='p-5'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td  className='p-5'>11</td>
                                        <td className='p-5'>John Doe</td>
                                        <td className='p-5'>john@gmail.com</td>
                                        <td className='p-5'>1234567890</td>
                                        <td className='p-5 flex gap-3'>
                                            <Link href='/admin/users/edit' className='bg-gray-500 text-white border px-3 py-2 rounded-md my-2 text-lg'>Edit</Link>
                                            <Link href='/admin/users/delete' className='bg-red-500 text-white border px-3 py-2 rounded-md my-2 text-lg'>Delete</Link>
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

export default UsersPage
