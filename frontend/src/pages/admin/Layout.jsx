import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import { SideBar } from '../../components/indexComponents'
import { useAppContext } from '../../context/AppProvider'
/*In this layout page, we will create the navBar (for admin) and the SideBar that will shared for admin pages */

export const Layout = () => {

  const { axios,navigate, setToken } = useAppContext()



  const logout = () => {
    const confirm = window.confirm(`Do You Want To Logout?`)
    if(!confirm)
    {
      return
    }
    localStorage.removeItem('token')
    axios.default.headers.common['Authourization'] = null
    setToken(""); // 👈 This updates context and causes re-render
    navigate("/")
  }
  return (
    <>
      {/*Admin Navbar */}
      <div className=' flex items-center justify-between py-2 h-[70] w-full px-4 sm:px-12 border-b border-gray-200'>
        <img src={assets.logo_light} alt="" className=' w-32 sm:w-40 cursor-pointer' onClick={() => navigate("/")} /> {/*Going back to home page */}

        <div className='flex  sm:flex-row items-center gap-2 sm:gap-4'>
          <button
            onClick={() => navigate("/")}
            className='text-sm min-w-[0p8x] px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition duration-200'
          >
            Home
          </button>

          <button
            onClick={logout}
            className='text-sm min-w-[80px] px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition duration-200'
          >
            Logout
          </button>
        </div>

      </div>


      {/*SideBar */}
      <div className=' flex h-[calc(100vh-70px)]'>
        <div className=' h-screen'>
          <SideBar />

        </div>
        <Outlet />
        {/*
        Read this for understanding the outlet:-
        
        In your admin dashboard setup, the <Layout /> component contains a navbar at the top and a sidebar on the left, which you want to display on all admin pages like Dashboard, Add Blog, Blog List, and Comments. Instead of repeating the same navbar and sidebar in every admin page, you define them once inside the Layout component. The <Outlet /> is placed right next to the sidebar, and it acts as a placeholder where the actual content of each admin page will be displayed. So, when a user navigates to /admin/add, the Add Blog page will appear inside the <Outlet />, while the navbar and sidebar remain unchanged. This way, <Outlet /> helps maintain a consistent layout while only swapping the page content based on the route. 
        
        simply layout = admin NavBar + SideBar + (particular nester route which user selects obtained by outlet)
        */}
      </div>
    </>
  )
}

