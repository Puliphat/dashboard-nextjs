'use client'

import React, { useEffect, useState } from 'react'
import Container from './components/Container'
import AdminNav from './components/AdminNav'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import Content from './components/Content'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
      router.replace('/login');
      return;
    }
  }, [status, router, session]);
 
  const [TotalUsers, setTotalUsers] = useState([]);
  const [TotalPosts, setTotalPosts] = useState([]);

  const getTotalUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`, {
        cache: 'no-store'
      })

      if(!res.ok) {
        throw new Error('Failed to fetch total users');
      }

      const data = await res.json();
      setTotalUsers(data.totalUsers);

    } catch (error) {
      console.log('Error fetching total users', error);
    }
  }

  const getTotalPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts`, {
        cache: 'no-store'
      })

      if(!res.ok) {
        throw new Error('Failed to fetch total posts');
      }

      const data = await res.json();
      setTotalPosts(data.totalPosts);

    } catch (error) {
      console.log('Error fetching total posts', error);
    }
  }
  
  useEffect(() => {
    getTotalUsers();
    getTotalPosts();
  }, []);
  


  return (
        <Container>
            <AdminNav session={session} />
            <div className='flex-grow'>
              <div className='container mx-auto'>
                 <div className='flex justify-between mt-10'>
                    <SideBar />
                    <Content TotalUsers={TotalUsers} TotalPosts={TotalPosts} />
                 </div>
              </div>
            </div>
            <Footer />
        </Container>
  )
}

export default AdminPage
