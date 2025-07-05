import mongoose from "mongoose";

const connectDB = async ()=>
{
    try 
    {
        const connect=await mongoose.connect(`${process.env.MONGODB_URL}`)

        console.log(`Mongo DB Connection Established (Cluster Used is Cluster0)`)

    } 
    catch (error) 
    {
        console.log(error.message)
    }
}

export default connectDB

// we are exporting the connectDB to the server.js