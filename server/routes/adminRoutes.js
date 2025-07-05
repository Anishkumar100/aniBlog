import express from "express"
import adminLogic, { approveCommentById, deleteCommentById, getAllAdminBlogs, getAllComments, getDashboard } from "../controllers/adminController.js"
import auth from "../middleware/auth.js"

const adminRouter = express.Router()
// here we create a router.

adminRouter.post('/login',adminLogic)
// we declare the path where this operation will happen.

/*
Note it, that in the adminLogic function which serves as the controller, no apth is specified. just the logic. But here, the path is specified and in place of logic, we place the built in logic here. so, what we understood from this?

routes = path + controller (logic)

We do this, instead of the original way where we in place of routes, keep bith the path and the logic together (that works in small projects) but in big projects we have to split and use it, to reduce complexity.

But if u notice, till now in user authentication we havent used the database. why?

Its simple, its because, we have a single user login. we declared a single user's email and password in the .env file. so we wont have multiple users, so we wont need the database to store multiple users.

And finally as u guessed, we have to keep this adminRouter in the server.js

Now, with that we have successfully completed the login logic now we will move on to the addBlog part. where we will define the schema and the model for the db inside the models folder
*/

// now the rest of adminControllers

adminRouter.get("/blogs",auth,getAllAdminBlogs) 
adminRouter.get("/comments",auth, getAllComments)
adminRouter.delete("/delete-comment/:id",deleteCommentById)
adminRouter.put("/approve-comment",auth,approveCommentById)
adminRouter.get('/dashboard',auth,getDashboard)

export default adminRouter
