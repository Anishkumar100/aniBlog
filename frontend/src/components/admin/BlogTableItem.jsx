import React from 'react'
import { assets } from '../../assets/assets'

export const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt,isPublished } = blog
    const blogDate = new Date(createdAt)

    return (
        <tr className='border-y border-gray-300'>
            <th className=' px-2 py-4 max-sm:hidden'>{index}</th>
            <td className=' px-2 py-4 text-lg'>{title}</td>
            <td className=' px-2 py-4 max-sm:hidden'>{blogDate.toDateString()}</td>
            <td className=' px-2 py-4 max-sm:hidden'>
                <p className={isPublished ? 'text-green-600' : 'text-orange-700'}>
                    {isPublished ? 'Published' : 'Unpublished'}
                </p>

            </td>
            <td className=' px-2 py-4 flex text-xs gap-3'>
                <button>{blog.isPublished ? 'Unpublish' : "Publish"}</button>
                <img className=' w-16 mr-1 px-2 hover:scale-110 transition-all cursor-pointer' src={assets.cross_icon} alt="" />
            </td>

        </tr>
    )
}
