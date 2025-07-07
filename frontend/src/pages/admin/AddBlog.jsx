import React, { useState, useRef, useEffect } from 'react'
import { assets, blogCategories } from "../../assets/assets"
import Quill from "quill"
import { Footer } from '../../components/indexComponents'
import { useAppContext } from '../../context/AppProvider'
import toast from 'react-hot-toast'
import { parse } from 'marked'

{/*In This page we will add our blogs. installed quill package for convenient conversion of text into tags */ }
export const AddBlog = () => {

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const { axios } = useAppContext()

  const [isAdding, setIsAdding] = useState(false)
  // this is like a loader. used when we add a blog and it takes time to get it uploaded it in the database

  const [image, setImage] = useState(false)

  const [title, setTitle] = useState("")

  const [subTitle, setSubTitle] = useState("")

  const [category, setCategory] = useState('Startup')

  const [isPublished, setIsPublished] = useState(false)

  const [loading, setLoading] = useState(false)
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      setIsAdding(true)
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category, isPublished
      }

      const formData = new FormData()

      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post(`/api/blog/add`, formData)

      data.success ? `${toast.success(data.message)} ${setImage(false)} ${setTitle('')} ${quillRef.current.root.innerHTML = ""} ${setCategory('Startup')}` : toast.error(data.message)
    }
    catch (error) {
      toast.error(error.message)
    }
    finally {
      setIsAdding(false)
    }
  }


  const generateContent = async () => {
    //gemini api fetch 
    if (!subTitle) return toast.error('Please Enter A Title!')
    try {
      setLoading(true)
      const { data } = await axios.post('/api/blog/generate', { prompt: subTitle })
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.response)
      }
      else {
        toast.error(`Couldnot connect with the AI. Sorry for the inconvinence`)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    //initiate quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])


  return (


    <main>
      <div className=' h-full'>

        <form onSubmit={onSubmitHandler} className=' flex-1 bg-blue-50 text-gray-600 h-screen overflow-scroll'>

          <div className=' bg-white w-full  max-w-3xl max-sm:h-[850px]  p-4 md:p-10 lg:m-10 shadow rounded'>

            <p>Upload Thumbnail</p>
            <label htmlFor='image'>
              <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className=' mt-2 h-16 rounded cursor-pointer' />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" name="" id="image" hidden required />
            </label>

            <p className=' mt-4 '>Blog Title</p>
            <input type="text" placeholder='Type Here' required className=' w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
              onChange={(e) => setTitle(e.target.value)} value={title} />

            <p className=' mt-4 '>Sub Title</p>
            <input type="text" placeholder='Type Here' required className=' w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
              onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />

            <p className=' mt-4'> Blog Description</p>

            <div className=' max-w-lg h-72 pv-16 pb-14 pt-2 relative'>
              <div ref={editorRef}>

              </div>
              {loading && (<div className='absolute inset-0 flex items-center justify-center z-10'>
                <div className='w-8 h-8 border-4 border-white bg-gray-400 border-t-transparent rounded-full animate-spin'></div>
              </div>)}
              <button disabled={loading} type="button" onClick={generateContent} className=' absolute bottom-1 right-2 ml-2 mb-4 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>{loading ? `Generating Your Content` : `Genrate with AI`}</button>
            </div>

            <p className='mt-4'>Blog Category</p>
            <select onChange={(e) => setCategory(e.target.value)} name="category" className=' mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
              <option disabled value="">Select Category</option>
              {blogCategories.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
              })}
            </select>

            <div className=' flex gap-2 mt-4'>
              <p>Publish Now</p>
              <input type="checkbox" checked={isPublished} className=' scale-125 cursor-pointer' onChange={(e) => setIsPublished(e.target.checked)} />
            </div>

            <button disabled={isAdding} type="submit" className=' mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
              {isAdding ? 'Adding...' : 'Add Blog'}
            </button>
          </div>

        </form>

      </div>

    </main>

  )
}

/*

🎯 Goal Recap
You want to use Quill (rich text editor) inside a React component and manage it using useRef().

Ok let me explain what we are doing here. first we initialize to useRefs()
1) editorRef
2) quillRef

Both have been initialized as null at beginning. we use useRef() instead of useState() to prevent re-renders. So, what we do is, we assign the editorRef to the <div> where we are going to store the quill editor. so, we kept ref={editorRef} in that specific div. Now, we are adding the quill editor to that current div using the useEffect().

We do it in a simpler way. first we are checking (!quillRef.current && editorRef.current). What it means is, we are checking that wether the current state of quillref is null (if its null the opposite must be true) and the current state of editorRef is div (we declared it so its true) since both the condition satisfies, we are overriding the null in the quillRef.current with the new Quill(editorRef.current,{theme:snow}) (we are creating a new quill, assigning it to the div tag and giving it a theme called as "snow")

Pls Learn useRef() when u have time


🔁 Summary in One Line Each
Thing	What It Does
useRef()	Stores mutable values across renders without re-rendering
editorRef	Points to the DOM <div> where Quill should be rendered
quillRef	Stores the Quill instance for accessing methods and content
useEffect	Initializes Quill only once on first render
quillRef.current.root.innerHTML	Gets blog content in HTML
quillRef.current.getContents()	Gets content in Quill’s Delta format
*/

//Learn UseRef 