import multer from "multer"

const upload = multer({ storage: multer.diskStorage({}) })

export default upload


/*
What is going on here?

In the addBlog controller, we are handling the process of adding a new blog post which includes both textual data (like title, description, etc.) and an image (thumbnail). Since Express.js cannot handle file uploads by default, we use a middleware called multer, which is specially designed to handle multipart/form-data — the format used when files are uploaded via HTML forms or FormData. In our backend route, we use upload.single("image") to tell multer to look for a file in the incoming request that has the field name "image". Once the file is received, multer processes it and makes it available as req.file. Meanwhile, the blog data is sent by the frontend inside a key called blog, which is a stringified JSON object, and we extract it using JSON.parse(req.body.blog).

Once we have both the blog details and the image, we validate the input — checking whether title, description, category, and image are present. If any of these are missing, we send a failure response. If everything is present, we proceed to handle the image. The image received through req.file is temporarily stored on the server’s disk (thanks to multer's diskStorage), and we read it using Node's built-in fs module via fs.readFileSync(imageFile.path). This reads the image into a buffer format, which is necessary for uploading to a third-party image hosting service like ImageKit.

We then upload this buffer to ImageKit using the imagekit.upload() method, which stores the image inside a specified folder (in this case, "/blogs") on ImageKit’s cloud. This upload gives us a filePath, which refers to the location of the image in ImageKit. However, rather than using this raw link directly, we optimize the image by generating a URL through imagekit.url(), applying transformations such as auto quality compression, converting the format to modern webp, and resizing the width to 1280px. The resulting URL is now a lightweight, optimized, and CDN-served link that we assign to a variable called finalImage.

This finalImage is then used as the thumbnail reference in the blog object that we save to MongoDB using our blog.create() method. We include all the other blog data like title, subtitle, description, category, and isPublished status along with the optimized image URL. After the blog is successfully saved in the database, we send a JSON response back to the client confirming the successful creation of the blog.

To clarify a common doubt: the upload.single("image") middleware only deals with receiving the original file from the user. It does not and should not refer to finalImage. finalImage is a new value that your backend creates after processing and optimizing the image via ImageKit. So upload.single("image") is about input from the user, while finalImage is about the output you store. Both serve different roles — one for receiving data and the other for saving processed information. This flow ensures that your backend receives rich blog content and also efficiently handles and optimizes user-uploaded media.


*/