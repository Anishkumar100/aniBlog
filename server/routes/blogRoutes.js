import express from 'express'
import { addBlog, addCommentByUser, deleteBlogById, generateContent, getAllPublishedBlogs, getIndividualBlogComments, getPublishedBlogById, togglePublish } from "../controllers/blogContoller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const blogRouter =  express.Router()

blogRouter.post('/add',upload.single('image'),auth,addBlog)
blogRouter.get('/all',getAllPublishedBlogs)
blogRouter.get('/:blogId',getPublishedBlogById)
blogRouter.delete('/delete/:blogId',auth,deleteBlogById) // when checking this in postman make sure u give auth and token in headers and always know that its bad practise to give body in delete requests
blogRouter.put('/toggle-publish',auth,togglePublish)

blogRouter.post("/add-comment",addCommentByUser)
blogRouter.get("/comments/:blogId",getIndividualBlogComments)

blogRouter.post('/generate',auth,generateContent)
export default blogRouter

/*
Now we use multer in the middleware to parse the image uploaded from the frontend (form). so, this upload.single('image') is the middleware where the uploaded image from the form is taken by multer and stores it in disk storage and in the blogController, we are getting the stored file(image) as req.file.
*/