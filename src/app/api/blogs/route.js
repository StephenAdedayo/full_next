import connectToDatabase from "@/config/db";
import BlogModel from "@/models/BlogModel";


// connect to db
const connect = async () => {
    await connectToDatabase()   
}

// handle post request

export const POST = async (req) => {
    await connect()
    try {
        const body = await req.json()
        const blog = await BlogModel.create(body)
        return new Response(JSON.stringify({success: true, data: blog}), {
            
            status: 201,
            headers:{'Content-Type': 'application/json'}

         
        })
    } catch (error) {
        return new Response(JSON.stringify({success:false}),
    
    {

    status:400,
    headers:{'Content-Type': 'application/json'}


    })
    }
}


// handle GET request


export const GET = async (req) => {
  await connect()

  try {
    const blogs = await BlogModel.find({})
    return new Response(JSON.stringify({success:true, data:blogs}), {
        status:200,
        headers:{'Content-Type' : 'application/json'}
    })
  } catch (error) {
    return new Response(JSON.stringify({success:false}), {
        status:400,
        headers:{'Content-Type' : 'application/json'}
    })
  }
}