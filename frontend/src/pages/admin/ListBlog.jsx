import React, { useEffect,useState } from 'react'
import { blog_data, dashboard_data } from '../../assets/assets'
import { BlogTableItem,Footer } from '../../components/indexComponents'

export const ListBlog = () => {

  const [blogs,setBlogs] = useState([])

  const fetchBlogs= async ()=>
  {
    setBlogs(blog_data)
  }

  {/*Here we are creating a table instead of slicing the actual blog list to provide a recent blog version we are providing everything */}

  useEffect(()=>
  {
    fetchBlogs()
  },[])

  return (
    <>
    <main>
   <div className=' flex-1 h-screen pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 '>

    <h1>All Blogs</h1>
<br/>
    <div >
        <div className='max-h-[500px] overflow-y-auto w-full rounded-lg shadow bg-white'>
            <table className='w-full min-w-[500px] table-auto text-sm'>
            <thead className=' text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th scope="col" className=' px-2 py-4 xl:px-6 max-sm:hidden'>#</th>
                <th scope="col" className=' px-2 py-4 '>Blog Title</th>
                <th scope="col" className=' px-2 py-4 max-sm:hidden'>Date</th>
                <th scope="col" className=' px-2 py-4 max-sm:hidden'>Status</th>
                <th scope="col" className=' px-2 py-4'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog,index)=>
              {
                return(<BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1}/>)
              })}
            </tbody>
          </table>
         
        </div>

    </div>
  
   </div>


   </main>

 
   </>
  
  )
}
