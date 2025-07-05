import mongoose from "mongoose";


const blogSchema = mongoose.Schema({
    title:
    {
        required: true,
        type: String
    },
    subTitle:
    {
        type: String
        // we are not keeping it as required. just for flexibility for users
    },
    description:
    {
        required: true,
        type: String,
    },
    category:
    {
        required: true,
        type: String
    },
    image:
    {
        required: true,
        type:String
    },
    isPublished:
    {
        required: true,
        type: Boolean
    }

},{timestamps:true})


/* 
Here we are going to create the schema and the model for storing the blog details u want to create. As the name suggest in model folder we have to create models and schema.

In the schema u have given timestamps:true, which mean it will provide the time automatically. when the blog is created. Now lets create the model
*/


const blogModel = mongoose.model('blog',blogSchema)

export default blogModel

/*
Now u have created the model also, here we gave a model name of our choice, when we run the backend code on postman with the connected database, atlas will create this model with the schema u specified. Now have to write the core logic to add blog, so u will create it in the controller folder
*/