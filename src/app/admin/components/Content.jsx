import React from 'react'
import {FaUser, FaRegNewspaper } from 'react-icons/fa6'

function Content({ TotalUsers, TotalPosts }) {
  return (
    <div className='px-10 rounded-lg'>
        <div className='flex'>
            <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
                <h3 className='flex items-center'><FaUser className='mr-2' /> Total Users</h3>
                <p className='text-5xl mt-10'>{TotalUsers?.length}</p>
            </div>
            <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
                <h3 className='flex items-center'><FaRegNewspaper className='mr-2' /> Total Posts</h3>
                <p className='text-5xl mt-10'>{TotalPosts?.length}</p>
            </div>
        </div>
        <p>welcome to the admin dashboard! Here, you can view an overview of the platform — including the total number of users, posts created, and recent activity. This information helps you manage the system effectively.</p>
    </div>
  )
}

export default Content
