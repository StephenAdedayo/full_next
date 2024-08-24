'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {useState, useEffect} from 'react'
// import { useEffect } from 'react/cjs/react.production.min'

const SingleBlog = ({params}) => {
    
    const {id} = params
    // const [id, setId] = useState(null);
    const [blog, setBlog] = useState([]);
    const router = useRouter()
  
    // useEffect(() => {
    //   // `router.query` should provide the `id` directly in App Router
    //   if (router.query.id) {
    //     setId(router.query.id);
    //   }
    // }, [router.query]);
    const fetchBlog = async () => {
        
        try {
          const res = await fetch(`/api/blogs/${id}`);
          if (!res.ok) {
            throw new Error('error')
           } 
           const data = await res.json();
           console.log(data);
           
           setBlog(data);

        //    else {
        //     console.error('Error fetching blog:', await res.json());
        //   }
        } catch (error) {
          console.error('Error fetching blog:', error);
        }
      
    };

  
    useEffect(() => {
     
      fetchBlog();
    }, [id]);
  
    if (!blog) return <div>Loading...</div>;

    // const {title, body, author} = blog

   const deleteBlog = async () => {
    try {
        const response = await fetch(`/api/blogs/${id}`, {
            method:'DELETE'
        })
        if(!response.ok){
            throw new Error('failed to fetch')
        }

        router.push('/')
    } catch (error) {
        console.log(error);
        
    }
   }


  return (
    <div>
      <p>{blog.title}</p>
      <p>{blog.body}</p>
      <p>{blog.author}</p>
      {/* <button onClick={() => router.push(`/update/${blog._id}`)}>Click me</button> */}
      <Link href={`/blogs/update/${blog._id}`}>
      Click
      
      </Link> <br />
      <button onClick={() => deleteBlog()}>Delete</button>
    </div>
  )
}

export default SingleBlog
