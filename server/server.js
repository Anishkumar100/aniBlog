import express from "express"
import 'dotenv/config'
import cors from "cors"
import connectDB from "./configs/db.js"
import adminRouter from "./routes/adminRoutes.js"
import blogRouter from "./routes/blogRoutes.js"


// creating an instance
const app = express()

//MiddleWares
app.use(cors())
app.use(express.json()) // all requests will be in json


// db connection from db.js inside configs folder

await connectDB()

app.get("/",(req,res)=>
{
    res.send(`My Blog APP AniBLOG`)
})

app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)
/*
Dont get confused with the api mentioned here. What happened here is, we are mentioning the server to use adminRouter (route which has the adminlogic and the route (/login) ) whenever someone types /api/admin. so, the final route will be /api/admin/login 

or this "http://localhost:3000/api/admin/login" tried it in postman got success:true
*/

const PORT = process.env.PORT || 3000


app.listen(PORT,()=>
{
    console.log(`The Server is running on PORT ${PORT}`)
})


export default app;