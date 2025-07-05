import fs from "fs"
import blogModel from "../models/Blog.js"
import imagekit from "../configs/imageKit.js"
import commentModel from "../models/Comment.js"

export const addBlog = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)

        const imageFile = req.file // getting the image from temperory disk storage from multer

        // check if all entry fields are present we ket subTitle as optional

        if (!title || !description || !category || !imageFile) {
            res.json({ success: false, message: "Missing Required Fields" })
            // now if all the fields are available we have to store the details in the database. but before that we have to use image kit to convert the image uploaded as a link (store public,private and endpoint variables of imageKit)
        }

        else {
            const fileBuffer = fs.readFileSync(imageFile.path)
            /*
            Now we got all the inputs from the user. So, now we have to change the obtained file (thumbnail image) to buffer format. after this u have to upload this image's buffer format inside imagekit and get a url or link for the image.
            */


            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/blogs"
                //this folder is optional, just to save your files in the imageKit inside this blogs folder. Now we are not going to store this image straight away in mongoDB. since it is the exact thing u got from the user we have to optimize this image. And dont mug this code its in the docs of imageKit
            })

            const optimizedImageURL = await imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: `auto` }, //Auto Compression
                    { format: `webp` }, // Convert to modern format
                    { width: `1280` } // width resizing
                ]
            })

            const finalImage = optimizedImageURL

            await blogModel.create({ title, subTitle, description, category, image: finalImage, isPublished })
            /*
            Here, in creating the new blog u might have faced an error. Its a silly mistake. remember the schema u used to define the database structure (title:{},subTitle:{}) every schema used must be the same name that we are gonna be using for creating the blog. but, in terms of the image, u declared the name of the image as image in schema. But while u are creating it, u have used "finalImage", this caused an error. so, u are assigning finalImage as Image
            */

            res.json({
                success: true,
                message: "Blog Added Successfull"
            })

        }
    }
    catch (error) {
        console.log(error)  // <-- Add this line to see the real error in console

        res.json({
            success: false,
            message: `Blog aint added some internal Error occured`

        })
    }
}




/*
Ok, i know u might be confused here but dont be. U might wonder why are u destructuring data from req.body.blog ? Its simple, we will be passing the request's body like this:-

{
  blog:
  {
    title:"",
    ...,
    image:""
  }
 
  u will be recieving everything from the form from the frontend. Here, including the image. So, using multer u are storing the image in a temperory folder inside ur disk storage. now the multer makes the image file available as req.file
} 

*/


/*
final Explanation:-

First, we get the blog data from req.body.blog (which the frontend sends as JSON or stringified JSON). Then we get the uploaded image using req.file, which is handled by Multer. This Multer gives out the actual image file obtained from the request. to know about multer, look at middleware

We convert the image to a buffer using fs.readFileSync() so it can be uploaded to ImageKit.

We upload the image to ImageKit inside a /blogs folder, and then generate an optimized URL using imagekit.url() with quality, format, and size settings.

Finally, we save everything (including the optimized image URL) into MongoDB using the blog model.

Now after going through the auth,multer and finally decalring the route for creating adding a new blog, we will proceed to creating various other api's for creating the rest of the api's for blogs and comments
*/

export const getAllPublishedBlogs = async (req, res) => {
    /*This function is used to get the published blogs in the home page. Thus we are finding the isPublished:true blogs from the blogModel we built in mongodb with the schema u defined*/
    try {
        const publishedBlogs = await blogModel.find({ isPublished: true })
        res.json({ success: true, publishedBlogs })
    }
    catch (error) {
        res.json({ success: false, message: `Couldn't get published blogs` })
    }
}


export const getPublishedBlogById = async (req, res) => {
    /*Here we are getting the individual blog info where the user in the home page can get when he clicks on a particular blog. Since we are showing only the published blogs on the screen no need for checking for published blogs again and finding the blog by id is more sufficient */

    try {
        const { blogId } = req.params
        const requiredBlog = await blogModel.findById(blogId)
        if (!requiredBlog) //if id is null
        {
            res.json({ success: false, message: `The Blog with the requested id aint found` })
        }
        else {
            res.json({ success: true, requiredBlog })
        }
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}



export const deleteBlogById = async (req, res) => {
    // this must be done by admin
    try {
        const { blogId } = req.params
        const requiredBlogToDelete = await blogModel.findByIdAndDelete(blogId)

        //delete all commentModel entrees associated with this blog
        await Comment.deleteMany({blog: blogId})
        if(!requiredBlogToDelete)
        {
            res.json({ success: false, message: `Blog Not Found ` })
           
        }
        res.json({ success: true, message: `The Required Blog is deleted` })
    }
    catch (error)
    {
        res.json({ success: false, message: error.message })
    }
  
}


export const togglePublish= async(req,res)=>
{
    try 
    {
        const {id} = req.body
        const requiredBlog = await blogModel.findById(id)
        if (!requiredBlog)
        {
            res.json({success:false,message:`No Blog Found according to this id`})
        }
        const publishStatus= !requiredBlog.isPublished
        await blogModel.findByIdAndUpdate(id,{isPublished:publishStatus},{ new: true})
        res.json({success:true,message:`The Required Blog's status changed successfully`})
    } 
    catch (error) 
    {
        res.json({success:false,message:error.message})
    }
}


/*this function is used to add comment from the home page by normal users */

export const addCommentByUser = async(req,res)=>
{
    try 
    {
        //this blog is the individual, under which the user will comment. And most importantly u are storing something different from the blog model schema. so u will need a new model i have created a model for the comment
        const {blog,name,content} = req.body

        await commentModel.create({blog,name,content})
        res.json({success:true,message:`Comment added for review`})
    } 
    catch (error) 
    {
      res.json({success:false,message:error.message})  
    }
}


/*Previously we created comments, in a specific blog, in response we sent that particular blog,name,content. Here, we will get all those approved comments made for individual blogs */

export const getIndividualBlogComments =async (req,res)=>
{
    //get Request
    try 
    {
        const {blogId} = req.params
        const comments = await commentModel.find({blog:blogId,isApproved:true}).sort({createdAt:-1})
        /*In comment model each entry has a blog (individual),name,content. we are finding that particular entry by finding the individual blog with unique id and status approved. And this sort({createdAt:-1}) is just used to arrange the entries at descending order*/
        res.json({success:true,comments})
    }
    catch (error) 
    {
        res.json({success:false,message:error.message})
    }
}

//now we are creating admin Dashboard api in adminController and also if u notice closely in blogController we made api's for non admin access for comment related operations. and for admin access required operations have to use adminController (its up to u)