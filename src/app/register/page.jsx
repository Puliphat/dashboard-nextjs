"use client"

import { useState, useEffect } from 'react'
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.replace('/welcome');
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password != confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!name || !email || !password || !confirmPassword) {
      setError('Please complete all fields')
      return
    }

    try {
      const resUserExists = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userExists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })

      const { user } = await resUserExists.json()

      if (user) {
        setError("User already exists.")
        return
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      })

      if(res.ok) {
        const form = e.target
        setError("")
        setSuccess("User registered successfully")
        form.reset()
      } else {
        setError("User registration failed")
      }
    } catch(error) {
      console.log("Error during registration", error)
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
              <h3 className='text-center text-4xl font-semibold mb-5'>Register</h3>
              <hr className='border-gray-300 my-5'></hr>
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className='bg-red-400 w-fit text-sm text-white px-3 py-1 rounded-md mt-2'>
                    {error}
                  </div>
                )}

                {success && (
                  <div className='bg-green-400 w-fit text-sm text-white px-3 py-1 rounded-md mt-2'>
                    {success}
                  </div>
                )}

                <input 
                  type="text" 
                  onChange={(e) => setName(e.target.value)} 
                  className='w-full bg-gray-200 border-2 border-gray-300 rounded-md p-2 px-3 my-2 text-lg' 
                  placeholder='Name..' 
                />
                <input 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)} 
                  className='w-full bg-gray-200 border-2 border-gray-300 rounded-md p-2 px-3 my-2 text-lg' 
                  placeholder='Email address..' 
                />
                <input 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  className='w-full bg-gray-200 border-2 border-gray-300 rounded-md p-2 px-3 my-2 text-lg' 
                  placeholder='Password..' 
                />
                <input 
                  type="password" 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className='w-full bg-gray-200 border-2 border-gray-300 rounded-md p-2 px-3 my-2 text-lg' 
                  placeholder='Confirm password..' 
                />
                <button 
                  type='submit' 
                  className='bg-green-500 text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer'
                >
                  Sign Up
                </button>   
                <hr className='my-3' />
                <p>Already have account? Go to <Link href="/login" className='text-blue-500 hover:underline'>Login</Link> page</p>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </Container>
    </div>
  )
}

export default RegisterPage;
