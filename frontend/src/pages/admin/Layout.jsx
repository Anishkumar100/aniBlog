import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import { SideBar } from '../../components/indexComponents'
/*In this layout page, we will create the navBar (for admin) and the SideBar that will shared for admin pages */

export const Layout = () => {

  const navigate =useNavigate()

  const logout=()=>
  {
    navigate("/")
  }
  return (
    <>
    {/*Admin Navbar */}
    <div className=' flex items-center justify-between py-2 h-[70] px-4 sm:px-12 border-b border-gray-200'>
      <img src={assets.logo_light} alt="" className=' w-32 sm:w-40 cursor-pointer' onClick={()=>navigate("/")}/> {/*Going back to home page */}

      <button onClick={logout} className=' text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button> {/*Logging out to home page */}
    </div>


    {/*SideBar */}
    <div className=' flex h-[calc(100vh-70px)]'>
      <div className=' h-screen'>
        <SideBar/>
       
      </div>
      <Outlet/>
       {/*
        Read this for understanding the outlet:-
        
        In your admin dashboard setup, the <Layout /> component contains a navbar at the top and a sidebar on the left, which you want to display on all admin pages like Dashboard, Add Blog, Blog List, and Comments. Instead of repeating the same navbar and sidebar in every admin page, you define them once inside the Layout component. The <Outlet /> is placed right next to the sidebar, and it acts as a placeholder where the actual content of each admin page will be displayed. So, when a user navigates to /admin/add, the Add Blog page will appear inside the <Outlet />, while the navbar and sidebar remain unchanged. This way, <Outlet /> helps maintain a consistent layout while only swapping the page content based on the route. 
        
        simply layout = admin NavBar + SideBar + (particular nester route which user selects obtained by outlet)
        */}
    </div>
    </>
  )
}

