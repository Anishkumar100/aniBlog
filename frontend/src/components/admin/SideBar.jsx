import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

export const SideBar = () => {
    const inactiveClass=`flex items-center gap-3 py-3.5 px-3 md:px-9  md:min-w-64 cursor-pointer`

    const activeChange= `bg-primary/10 border-r-4 border-primary`
  return (
    <div>
    <div className=' flex flex-col border-r border-gray-200 min-h-full  '>
        <NavLink end={true} to="/admin" className={({isActive})=> `${isActive ? `${inactiveClass} ${activeChange}`:inactiveClass}`}>
            <img src={assets.home_icon} alt="" className='min-w-4 w-5'/>

            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>


        <NavLink end={true} to="/admin/addBlog" className={({isActive})=> `${isActive? `${inactiveClass} ${activeChange}` : inactiveClass}`}>
            <img src={assets.add_icon} alt="" className='min-w-4 w-5'/>

            <p className='hidden md:inline-block'>Add Blogs</p>
        </NavLink>

        <NavLink end={true} to="/admin/listBlog" className={({isActive})=> `${isActive? `${inactiveClass} ${activeChange}` : inactiveClass}`}>
            <img src={assets.list_icon} alt="" className='min-w-4 w-5'/>

            <p className='hidden md:inline-block'>Blog Lists</p>
        </NavLink>

        <NavLink end={true} to="/admin/comments" className={({isActive})=> `${isActive? `${inactiveClass} ${activeChange}` : inactiveClass}`}>
            <img src={assets.comment_icon} alt="" className='min-w-4 w-5'/>

            <p className='hidden md:inline-block'>Comments</p>
        </NavLink>
    </div>
    </div>
  )
}
