import express from "express"
import JWT from "jsonwebtoken"
import blogModel from "../models/Blog.js"
import commentModel from "../models/Comment.js"

const adminLogic = async (req, res) => {
    try {
        const { email, password } = req.body
        if (process.env.ADMIN_EMAIL !== email || process.env.ADMIN_PASSWORD !== password) {
            res.json(
                {
                    success: false,
                    message: `Password or email is incorrect`
                })
        }
        else {
            const token = JWT.sign({ email }, process.env.JWT_SECRET)
            res.json(
                {
                    success: true,
                    token
                }
            )
        }
    }
    catch (error) {
        res.json(
            {
                success: false,
                message: error.message
            })
    }
}


export default adminLogic

/*
Let me explain u what this line after else means:-

JWT - JSON web token (its like a card given to a user serves as an authentication. so, that if a user logged in, and enters the app again he/she doesnt need to login again.) Now, lets see how it works

if the email or password they entered is correct, they are given a token. But, before giving it u have to create it that's why we create the token. 

so we use,

const token = JWT.sign({email}, <JWT_SECRET>)

the sign() is used to create the token. and the "email" is the payload (the data we want to include in the token). and the JWT_SECRET is like a signature that is used as a verification to create the token. Its super safe, since only your server knows the SECRET_KEY. its in your .env file. And finally u send the JWT token to ur user by res.json({success:true,token}). This success is going to be used in the frontend to close the login page upon verification if u see the AllRoutes.jsx page closely.


Now, we created the adminController. but, we have to tell where this controller is going to be used by specifying a route.
*/



export const getAllAdminBlogs = async (req, res) => {
    try {
        const allBlogs = await blogModel.find().sort({ createdAt: -1 }) // sorting the extries of blogs in descending order showing latest entries
        res.json({ success: true, allBlogs })
    }
    catch (error) {
        res.json({ success: true, message: error.message })
    }
}


//now getting all comments which can be seen only by admin

export const getAllComments = async (req, res) => {
    try {
        const allComments = await commentModel.find().populate("blog").sort({ createdAt: -1 })
        // this populate is used to substitute the blog id with the actual blog. will be useful if u  want to get all the data at one place

        res.json({ success: true, allComments })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const getDashboard = async (req, res) => 
{
    //we are going to give "get" operation for all the details in the dashboard
    try 
    {
        //first getting latest blogs
        const latestBlogs = await blogModel.find().sort({createdAt:-1}).limit(5)

        const totalBlogs = await blogModel.countDocuments()

        const totalComments = await blogModel.countDocuments()

        const totalDrafts = await blogModel.countDocuments({isPublished:false}) // unpublished blogs

        //combining everything together (optional)

        const dashBoardData={
            latestBlogs, totalBlogs,totalComments,totalDrafts
        }

        res.json({success:true,dashBoardData})
    } 
    catch (error) 
    { 
        res.json({success:false,message:error.message})
    }
}


export const deleteCommentById =async(req,res)=>
{
    try 
    {
        const {id} = req.params // getting id of the entree in commentModel
        await commentModel.findByIdAndDelete(id)
        res.json({success:true,message:`Comment successfully deleted`})
    } 
    catch (error) 
    {
        res.json({success:false,message:error.message})
    }
}

export const approveCommentById = async(req,res)=>
{
    try 
    {
        const {id} = req.body  // getting id of the entree in commentModel

        await commentModel.findByIdAndUpdate(id,{isApproved:true},{new:true})
        /*
    Here, we are going to the particular entree of the commentModel and updating its default isApproved:false to true
        */
       res.json({success:true,message:`Comment Approved Successfully`})
    } 
    catch (error) 
    {
        res.json({success:false,message:error.message})
    }
}