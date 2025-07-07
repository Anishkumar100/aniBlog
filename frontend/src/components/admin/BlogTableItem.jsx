import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from "../../context/AppProvider"
import toast from 'react-hot-toast'

export const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt, isPublished } = blog
    const blogDate = new Date(createdAt)

    const { axios } = useAppContext()

    const deleteBlog = async () => {
        const confirm = window.confirm(`Are you sure you want to delete this blog?`)

        if (!confirm) {
            return // if admin gave no then return back
        }
        else {
            try {
                const { data } = await axios.delete(`/api/blog/delete/${blog._id}`)

                if (data.success) {
                    toast.success(data.message)
                    await fetchBlogs()
                }
                else {
                    toast.error(data.message)
                }

                //fetchBlogs() function is called again since we have to refresh the whole page. (just for show)
            }
            catch (error) {
                toast.error(error.message)
            }
        }

    }

    const togglePublish = async () => {
        // to toggle publish and unpublish blogs

        try {
            const { data } =await axios.put(`/api/blog/toggle-publish`, { id: blog._id })

            if (data.success) {
                toast.success(data.message)
                await fetchBlogs()
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <tr className='border-y border-gray-300'>
            <th className=' px-2 py-4 max-sm:hidden'>{index}</th>
            <td className=' px-2 py-4 text-lg'>{title}</td>
            <td className=' px-2 py-4 max-sm:hidden'>{blogDate.toDateString()}</td>
            <td className=' px-2 py-4 max-sm:hidden'>
                <p className={blog.isPublished ? 'text-green-600' : 'text-orange-700'}>
                    {blog.isPublished ? 'Published' : 'Unpublished'}
                </p>

            </td>
            <td className=' px-2 py-4 flex text-xs gap-3'>
                <button onClick={togglePublish}>{blog.isPublished ? 'Unpublish' : "Publish"}</button>
                <img onClick={deleteBlog} className=' w-16 mr-1 px-2 hover:scale-110 transition-all cursor-pointer' src={assets.cross_icon} alt="" />
            </td>

        </tr>
    )
}
