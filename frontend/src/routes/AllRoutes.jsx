import React from 'react'
import { Route, Routes } from "react-router-dom"
import { Home, BlogDetail, Layout, Dashboard, AddBlog, Comments, ListBlog , Login} from "../pages/indexPages"
import {Toaster} from "react-hot-toast"

export const AllRoutes = () => {
  return (
    <Toaster>
    <Routes>
      <Route path="/" element={<Home />} />

      {/*In this route we are displaying individual blog details */}
      <Route path="/blog/:id" element={<BlogDetail />} />

      {/*Admin's Access */}

{/*This Layout is common for all admin pages so we are wrapping everything with it (NOT NECESSARY). And the "index" shows that the Dashboard is the 1st page the admin sees. And only if the condition given is true we will see the layout page with NavBar,SideBar and Admin dashboard initially */}
      <Route path="/admin" element={true ? <Layout />: <Login/>}> 
        <Route index element={<Dashboard />} />
        <Route path="addBlog" element={<AddBlog />} />
        <Route path="comments" element={<Comments />} />
        <Route path="listBlog" element={<ListBlog />} />
      </Route>



    </Routes>
    </Toaster>
  )
}
