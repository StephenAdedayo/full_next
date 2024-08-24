'use client'

import Link from 'next/link'
import React,  { useEffect, useState } from 'react'


const Home = () => {
  
  
  
 const [blogs, setBlogs] = useState([])


    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs')
      if(!response.ok){
        throw new Error('failed to fetch')
      }

      const {data} = await response.json()
      setBlogs(data)
      } catch (error) {
        console.log('Error', error);
        
      }
    }


    useEffect(() => {
      fetchBlogs()
    }, [])

    

  return (
    <div>
      <div className='flex w-full justify-between px-40 items-center'>
        <h1 >Welcome To My Blog</h1>

        <Link href={`/blogs/create`}>
        <button className='rounded ring py-2 px-4'>Add New Blog</button>
        </Link>
        
      </div>


    <div className='w-full px-40 grid grid-cols-2 gap-20'>
   
   
   
   {blogs && blogs.map((blog, id) => (

      <div className='p-10 bg-gray-100' key={id}>
      <Link href={`/blogs/${blog._id}`}>
     <p>{blog.title}</p>
     </Link>
     <p>{blog.body}</p>
     <p>{blog.author}</p>
     </div>

    

 
))}
   
    </div>


    </div>
  )
}

export default Home
