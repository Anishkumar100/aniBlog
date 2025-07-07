import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppProvider'
import toast from 'react-hot-toast'

export const CommentTableItem = ({comment,fetchComments}) => {
 
    const {blog,createdAt,_id} = comment

    const BlogDate = new Date(createdAt)

    const {axios} = useAppContext()

    const approveComment= async()=>
    {
        try 
        {
            const {data} =await axios.put('api/admin/approve-comment',{id:_id})
            if(data.success)
            {
                toast.success(data.message)
                await fetchComments()
            }
            else
            {
                toast.error(data.error)
            }
        } 
        catch (error) 
        {
         toast.error(error.message)   
        }
    }
 
    const deleteComment = async()=>
    {
        try
        {
            const confirm = window.confirm('Are you sure you want to delete this comment?')
            if(!confirm)
            {
                return
            }
            else
            {
                const {data} = await axios.delete(`/api/admin/delete-comment/${_id}`)
                toast.success(data.message)
                fetchComments()
            }
        } 
        catch (error) 
        {
          toast.error(error.message)  
        }
    }
    return (
    <tr className=' order-y border-gray-300 border-b'>
        <td className=' px-6 py-4'>
            <b className=' font-medium text-gray-600'>Blog</b> : {blog ? blog.title : 'Deleted Blog'}
            <br/>
            <br/>
            <b className=' font-medium text-gray-600'>Name</b> : {comment.name}
            <br/>
            <b className=' font-medium text-gray-600'>Comment</b> : {comment.content}
        </td>
        <td className=' px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleDateString()}
        </td>
        <td className=' px-6 py-4'>
            <div className=' inline-flex items-center gap-4'>
                {!comment.isApproved? <img src={assets.tick_icon} onClick={approveComment} className=' w-5 hover:scale-110 transition-all cursor-pointer'/>
                : 
                <p className=' text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>}

                <img onClick={deleteComment} src={assets.bin_icon} alt="" className=' w-5 hover:scale-100 transition-all cursor-pointer'/>
            </div>

        </td>
    </tr>
  )
}
