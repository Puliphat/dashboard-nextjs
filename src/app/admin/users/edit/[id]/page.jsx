'use client'

import React, { useEffect, useState } from 'react'
import Container from '../../../../components/Container'
import AdminNav from '../../../components/AdminNav'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function AdminEditUserPage({ params }) {

  const { id } = React.use(params);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
      router.replace('/login');
      return;
    }
  }, [status, router, session]);

  const [userOldData, setUserOldData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState(""); 

  // get old user data
  const getUserById = async (id) => {
    try{
       const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`,{
            method: "GET",
            cache: "no-store"
       });
        if(!res.ok) {
          throw new Error("Failed to fetch user data");
        }

       const data = await res.json();
       setUserOldData(data.user);

    } catch(error) {
      console.log(error);
    }
  }

  // update new user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !newName || !newEmail || !newPassword) {
      setError("Please complete all fields");
      return;
    }

    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({newName, newEmail, newPassword})
      });

      if(!res.ok) {
        throw new Error("Failed to update user");
      }
      router.refresh();
      router.push(`/admin/users`);

    } catch(error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if (userOldData) {
      setNewName(userOldData.name);
      setNewEmail(userOldData.email);
      setNewPassword(userOldData.password);
    }
  }, [userOldData]);

  useEffect(() => {
    getUserById(id);
  }, []);


  return (
    <Container>
      <AdminNav session={session} />
      <div className='flex-grow'>
            <div className='container mx-auto shadow-xl p-10 my-10 rounded-xl'>
                    <Link href="/admin/users" className='bg-gray-500 inline-block text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer' >Go Back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl font-bold'>Admin Edit User Page</h3>
                 {error && (
                  <div className='bg-red-500 w-fit text-sm text-white px-3 py-1 rounded-md mt-2'>
                    {error}
                  </div>
                )}
                    <form className='mt-3 flex flex-col' onSubmit={handleSubmit}>
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg ' 
                         value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg '
                         value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        <input type="text" className='w-[300px] bg-gray-200 border rounded-md py-2 px-3 my-2 text-lg '
                         value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        
                        <button type='submit' name='update' className='w-fit bg-green-500 text-white border rounded-lg py-2 px-3 my-2 text-lg cursor-pointer' >Update User</button>
                    </form>
            </div>
      </div>

      <Footer />
    </Container>
  )
}

export default AdminEditUserPage
