'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.replace('/welcome');
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError('Invalid email or password');
        return;
      }
      
      router.replace('/welcome');
    } catch (error) {
      console.log(error);
    }
  }

  if (status === 'loading') {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <Navbar />
        <div className='flex-grow'>
          <div className='flex justify-center items-center'>
            <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
              <h3 className='text-center text-4xl font-semibold mb-5'>Login</h3>
              <hr className='border-gray-300 my-5'></hr>
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className='bg-red-500 w-fit text-sm text-white px-3 py-1 rounded-md mt-2'>
                    {error}
                  </div>
                )}

                <input 
                  type="text" 
                  onChange={(e) => setEmail(e.target.value)} 
                  className='w-full bg-gray-200 border-2 border-gray-300 rounded-md p-2 px-3 my-2 text-lg' 
                  placeholder='Enter your email..' 
                />
                <input 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  className='w-full bg-gray-200 border-2 border-gray-300 rounded-md p-2 px-3 my-2 text-lg' 
                  placeholder='Enter your password..' 
                />
                <button 
                  type='submit' 
                  className='bg-green-500 text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer'
                >
                  Sign In
                </button>   
                <hr className='my-3' />
                <p>Do not have account? Go to <Link href="/register" className='text-blue-500 hover:underline'>Register</Link> page</p>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </Container>
    </div>
  )
}

export default LoginPage;
