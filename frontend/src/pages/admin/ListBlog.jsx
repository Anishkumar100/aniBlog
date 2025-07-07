import React, { useEffect, useState } from 'react'
import { blog_data, dashboard_data } from '../../assets/assets'
import { BlogTableItem, Footer } from '../../components/indexComponents'
import { useAppContext } from '../../context/AppProvider'
import toast from 'react-hot-toast'

export const ListBlog = () => {

  const [blogs, setBlogs] = useState([])

  const { axios } = useAppContext()

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs')
      console.log(data)

      data.success ? `${setBlogs(data.blogs)}` : toast.error(data.message)
    }
    catch (error) {
      toast.error(error.message)
    }
    //now we got all the blogs so, lets move on to publish,unpublish and delete options in blogTableItem
  }

  {/*Here we are creating a table instead of slicing the actual blog list to provide a recent blog version we are providing everything */ }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <>
      <main>
        <div className=' flex-1 h-screen pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 '>

          <h1>All Blogs</h1>
          <br />
          <div >
            <div className='max-h-[500px] overflow-y-auto w-full max-sm:w-[300px] rounded-lg shadow bg-white'>
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
                  {blogs.map((blog, index) => {
                    return (<BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />)
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
