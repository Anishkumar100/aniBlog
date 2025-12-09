import jwt from "jsonwebtoken"

const auth = async (req,res,next)=>
{
    const token = req.headers.authorization
    try 
    {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    }
    catch (error) 
    {
        res.json({
            success:false,
            message:`Get out of my blog app stupid hacker!!!`
        })
    }
}
export default auth


/*
Let me tell u how auth works. Simple, when u login as an user(Admin) the server which has the JWT_SECRET, will give u a token. This will stored in ur header, when u try to other operations, this token(Authorisation) in the feader will be verified even for simple fetch() requests starting from get to post. 

So, lets say that u (admin) logged in tries to access the db again. with the changes in the frontend, the server will check ur header for the token (which was given to u during login) . If the token matches with the JWT_SECRET in ur .env you will be allowed in. And if not, u have to sign in again.

And, instead of you using regular login methods, if an hacker who can break firewalls tries to hack ur website and goes inside ur admin dashboard, he wont have ur JWT_SECRET (which only ur server knows), and when he tries to do an operation like post,get,put,delete the request's header will be looked for the token by ur server using the JWT.verify(). If its not verfied the error message will be sent as a response, if not the next() which is used to tell the server to execute the next function will be called.

blogRouter.post('/add',upload.single('image'),auth,addBlog)

As, u see the next() is addBlog the core addBlog controller logic

*/