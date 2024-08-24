'use client'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'
// import { useEffect } from 'react/cjs/react.production.min'


const UpdatePage = ({params}) => {
    const router = useRouter()
    const {id} = params
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor ] = useState('')
    


    const handleUpdate = async () => {
try {
    const response = await fetch(`/api/blogs/${id}`)
    if(!response.ok){
        throw new Error(`error occured, status:${response.status}`)
    }

    const data = await response.json()
    setTitle(data.title)
    setBody(data.body)
    setAuthor(data.author)

    // router.push('/')

} catch (error) {
    console.log(error);
    
}
    }

    useEffect(() => {
       handleUpdate()
    }, [])

    const handleUpdated = async (e) => {
      e.preventDefault()

     try {
        const blog = {
            title,
            body,
            author
        }
        const response = await fetch(`/api/blogs/${id}`, {
            method:'PUT',
            headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify(blog)
          })
          if(!response.ok){
            throw new Error('failed to fetch blog')
          }
          router.push('/')
        
     } catch (error) {
          console.log(error);
          
     }


    }



 


  return (
    <div className='h-screen grid place-content-center'>


      <form onSubmit={handleUpdated} action="" className='w-[500px] p-10  border-gray-500 shadow-lg rounded-lg'>
      <h1 className='text-center mb-4 text-3xl font-[500]'>Create a New Blog</h1>
      {/* {error && <p className='text-red-500 mb-2'>{error}</p>} */}

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
      {/* <ToastContainer /> */}
    </div>
  )
}

export default UpdatePage
