import React from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { useState } from 'react'
import { motion } from "motion/react"
import { BlogCard } from "./BlogCard"
import { useAppContext } from '../context/AppProvider'


//we are using motion npm for animation (copy paste)

export const BlogList = () => {

    const [menu, setMenu] = useState('All')

    const { blogs, input } = useAppContext()

    const filteredBlogs = () => {
        if (input === "") {
            return blogs
        }
        else {
            return blogs.filter((blog) => {
                return (blog.title.toLowerCase().includes(input.toLowerCase() || blog.category.toLowerCase().includes(input.toLowerCase()))) //returning an array of blogs respective to title or category (more relevance) the input is obtained from the search bar
            })
        }
    }

    return (
        <div className='dark:bg-gray-900 dark:text-white'>
            {/*Section 1:-category of blogs */}
            {/*Ad Features */}
            <div className=' flex justify-center gap-4 sm:gap-8 py-10 relative'>
                <script
                    async="async"
                    data-cfasync="false"
                    src="//pl28177411.effectivegatecpm.com/08dc434734ea14f1c91b61d2e3c990d6/invoke.js"
                ></script>
                <div id="container-08dc434734ea14f1c91b61d2e3c990d6"></div>

                {blogCategories.map((item) => {
                    return (
                        <div key={item} className="relative">
                            <button
                                onClick={() => setMenu(item)}
                                className={`relative cursor-pointer text-gray-500 dark:text-gray-300
                ${menu === item ? 'text-white px-4 pt-0.5' : ''}`}
                            >
                                <span className=' relative z-10'>{item}</span>

                                {menu === item && (
                                    <motion.div
                                        layoutId="underline"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="absolute inset-0 h-7 z-0 rounded-full
                   bg-primary dark:bg-primary dark:text-white"
                                    />
                                )}
                            </button>
                        </div>



                    )
                })}

                {/*This div u have a simple ui trick. dont crack ur head. Its an another element (used just for the background).This element is apparently behind the item.*/}

                {/*And about the useState, u are declaring the default menu item selected as "ALL". the selected item must have a specific styling other than the other items. so, u are comparing the item which is chosen and replaced with menu and each and every item. if it matches give a particular styling. and if not u give default " ". That's it!!!*/}

                {/*Exported blogCategories from assets.js */}
            </div >

            {/*Section 2:- Actual Blog Items (used another component for blog cards) */}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 pb-24 mx-8 sm:mx-16 xl:mx-40  border-b-0 ' >
                {filteredBlogs().filter((blog) => menu === "All" ? blog : menu === blog.category).map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div >

            {/*
        Explanation of section 2:-
        Its very simple u are filtering the array elements based on choice of users. first we are taking the blog_data from assets and in it, we are comparing if the menu is "All", if it is "All" return all the array elements. and if it is something else, we are comparing it with all the array elements and finding the chosen category and returning only the particular elements of the array. now, we are mapping those chosen elements, with a component for displaying the elements as cards with a prop being the element itself.  */}


            <script
                async="async"
                data-cfasync="false"
                src="//pl28177411.effectivegatecpm.com/08dc434734ea14f1c91b61d2e3c990d6/invoke.js"
            ></script>
            <div id="container-08dc434734ea14f1c91b61d2e3c990d6"></div>
        </div >
    )
}
