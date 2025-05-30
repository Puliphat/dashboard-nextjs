'use client'

import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import Link from 'next/link'        
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

function UsersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
   
    useEffect(() => {
        if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
          router.replace('/login');
          return;
        }
      }, [status, router, session]);

    const [UsersData, setUsersData] = useState([]);

    const getUsersData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`,{
                cache: 'no-store'
            })

            if(!res.ok) {
                throw new Error('Failed to loading users data');
            }

            const data = await res.json();
            setUsersData(data.totalUsers);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsersData();
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
                                        <th className='p-5'>Role</th>
                                        <th className='p-5'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {UsersData.map((user) => (
                                         <tr key={user._id}>
                                         <td className='p-5'>{user._id}</td>
                                         <td className='p-5'>{user.name}</td>
                                         <td className='p-5'>{user.email}</td>
                                         <td className='p-5'>{user.role}</td>
                                         <td className='p-5 flex gap-3'>
                                             <Link href={`/admin/users/edit/${user._id}`} className='bg-gray-500 text-white border px-3 py-2 rounded-md my-2 text-lg'>Edit</Link>
                                             <DeleteBtn id={user._id} />
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

export default UsersPage
