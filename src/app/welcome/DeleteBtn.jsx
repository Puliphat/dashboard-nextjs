'use client'

import React from 'react'

function DeleteBtn({ id }) {

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure to delete this post?');

    if (confirmed) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?id=${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            window.location.reload();
        }
    }
}


  return (
         <a onClick={handleDelete} className='bg-red-500 text-white border rounded-md py-2 px-3 my-2 text-lg cursor-pointer'>
            Delete
        </a>
  )
}

export default DeleteBtn
