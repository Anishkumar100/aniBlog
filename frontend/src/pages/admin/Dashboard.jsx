import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import { BlogTableItem, Footer } from "../../components/indexComponents"
import { useAppContext } from '../../context/AppProvider'
import toast from 'react-hot-toast'

/*
The dashboard contains 2 sections 
1)stats (total blogs, comments,drafts) 
2)latest blogs
*/

export const Dashboard = () => {

  const {navigate} = useAppContext()

  // we are defining initial datas for the dashboards 
  const [dashboardData, setDashboardData] = useState(
    {
      blogs: 0,
      comments: 0,
      drafts: 0,
      recentBlogs: []
    }
  )

  const {axios}  = useAppContext()


  {/*For time being what we did is we took dashboard data array from assets. and we are overriding it with useState. and in that array, we have the sliced version of blog_data, that we give as props to fill in the <tbody> using the prop BlogTableItem.jsx. And we are creating this component since,some of the pages will have a table with same structure */ }
  const fetchDashboard = async () => {

    try 
    {
      const {data} = await axios.get('api/admin/dashboard')

      data.success? setDashboardData(data.dashboardData): toast.error(data.message)
    } 
    catch (error) 
    {
      toast.error(error.message)
    }
    }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (

    <main>
      <div className='flex-1 min-h-full p-4 md:p-10 bg-blue-50/50'>

        <div className=' flex flex-wrap gap-4'>

          <div onClick={()=>navigate("/admin/listBlog")} className=' flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <img src={assets.dashboard_icon_1} alt="" />
            <div>
              <p>{dashboardData.blogs}</p>
              <p className=' text-gray-400 font-light'>Blogs</p>
            </div>
          </div>


          <div onClick={()=>navigate('/admin/comments')} className=' flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <img src={assets.dashboard_icon_2} alt="" />
            <div>
              <p>{dashboardData.comments}</p>
              <p className=' text-gray-400 font-light'>Comments</p>
            </div>
          </div>

          <div onClick={()=>navigate('admin/listBlog')} className=' flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <img src={assets.dashboard_icon_3} alt="" />
            <div>
              <p>{dashboardData.drafts}</p>
              <p className=' text-gray-400 font-light'>Drafts</p>
            </div>
          </div>

        </div>


        {/* Section 2 Latest Blog */}
        <div>
          <div className=' flex items-center gap-3 m-4 mt-10 text-gray-600'>
            <img src={assets.dashboard_icon_4} alt="" />
            <p>Latest Blogs</p>
          </div>
          <div className='max-h-[370px] overflow-y-auto w-full rounded-lg shadow bg-white'>
            <table className='w-full min-w-[600px] table-auto text-sm'>

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
                {dashboardData.recentBlogs.map((blog, index) => {
                  return (<BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />)
                })}
              </tbody>
            </table>

          </div>

        </div>

      </div>

   
    </main>
  )
}
