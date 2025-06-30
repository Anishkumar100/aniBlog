import React from 'react'
import {Route,Routes} from "react-router-dom"
import {Home,BlogDetail} from "../pages/indexPages"

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>

        {/*In this route we are displaying individual blog details */}
        <Route path="/blog/:id" element={<BlogDetail/>}/>


        
    </Routes>
  )
}
