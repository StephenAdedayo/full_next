'use client'

import axios from 'axios';
import {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { useRouter } from 'next/navigation';


const Create = () => {
  

    // const notify = () => toast.success('Blog Created Successfully')
    // const errore = () => toast.error('Blog could not be created')
       
    const notify = () => {
    toast('blog created successfully', {
        toastId: 'blog created',
        style:{
            background:'green',
            color: 'white'
        }
    })
    }

    const errore = () => {
        toast.error('blog could not be created ', {
            toastId: 'blog created',
            style:{
                background:'red',
                color: 'white'
            }
        })
        }

    


    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor ] = useState('')
    const [error, setError] = useState('')
     
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        if(!title || !body || !author){
            setError('Please Enter your Details')
            
        } else{
            setError('')
        }

        try {
            const blogs = {title, body, author}

            const response = await fetch('/api/blogs', 
                {
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify(blogs)
            })
            notify()
            router.push('/')
            if(!response.ok){
            throw new Error('error loading')

            // router.push('/')
            } 


        } catch (error) {
            console.log(error);
            
        }
        
    }

    


  return (
    <div className='h-screen grid place-content-center'>


      <form onSubmit={handleSubmit} action="" className='w-[500px] p-10  border-gray-500 shadow-lg rounded-lg'>
      <h1 className='text-center mb-4 text-3xl font-[500]'>Create a New Blog</h1>
      {error && <p className='text-red-500 mb-2'>{error}</p>}

     <div className=''>
     <label htmlFor="">Title:</label> <br />
     <input value={title} onChange={(e) => setTitle(e.target.value)} className='w-full outline-none border p-3 rounded-lg bg-gray-100' type="text" placeholder='please enter a blog title'/>
       
     </div> <br />

     <div className=''>
     <label htmlFor="">Body:</label> <br />
     
     <textarea value={body} onChange={(e) => setBody(e.target.value)} className='w-full outline-none border p-3 rounded-lg  bg-gray-100' placeholder='please enter blog content' name="" id="" rows={5}></textarea>
       
     </div> <br />

     <div className=''>
     <label htmlFor="">Author:</label> <br />
     <input value={author} onChange={(e) => setAuthor(e.target.value)} className='w-full outline-none border p-3 rounded-lg  bg-gray-100' type="text" placeholder="please enter Author's name"/>
       
     </div> <br />


     <button type='submit' className='bg-indigo-800 text-white px-6 py-3 mx-auto block rounded-lg'>Add Blog</button>

      </form>
      <ToastContainer />
    </div>
  )
}

export default Create
