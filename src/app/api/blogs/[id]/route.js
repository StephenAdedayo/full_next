import BlogModel from "@/models/BlogModel";
import connectToDatabase from "@/config/db";

const connect = async () => {
    await connectToDatabase()
}


export const GET = async (req, {params}) => {
    const {id} = params
    await connect()


    try {
        const blog = await BlogModel.findById(id)
        if(!blog) return new Response(JSON.stringify({message:'blog not found'}), {status: 404})
        return new Response(JSON.stringify(blog), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message:'error occured while fetching blog'}), {status:400})
    }
}


export const PUT = async (req, {params}) => {
    const {id} = params
    const body = await req.json()

    await connect()

    try {
        const updateBlog = await BlogModel.findByIdAndUpdate(id, body, {
            new:true,
            runValidators:true
        })
        if(!updateBlog) return new Response(JSON.stringify({message:'blog could not be updated'}), {status:404})
        return new Response(JSON.stringify(updateBlog), {status: 200})
    } catch (error) {
        return new Repsonse(JSON.stringify({message:'error occured while fetching blog'}), {status:400})
    }
}


export const DELETE = async (req, {params}) => {
  const {id} = params

  await connect()

  try {
    const blog = await BlogModel.findByIdAndDelete(id)
    if(!blog) return new Response(JSON.stringify({message:'blog could not be deleted'}), {status:404})
    return new Response(JSON.stringify({}), {status:200})
  } catch (error) {
    return new Response(JSON.stringify({message:'error occured while deleting blog'}), {status:400})
  }
}
