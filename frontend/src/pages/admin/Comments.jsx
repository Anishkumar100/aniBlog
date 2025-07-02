import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import { CommentTableItem,Footer } from '../../components/indexComponents'

export const Comments = () => {

  {/*Usual Steps no biggie. u know what is going on. And just replace the fetchOperation with actual fetch functions while performing backend */}
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Approved')

  const fetchComments = async () => {
    setComments(comments_data)
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <main>
    <div className=' h-screen flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>

      <div className=' flex justify-between items-center max-w-3xl'>
        <h1>Comments</h1>

        <div className=' flex gap-4'>
          <button onClick={() => setFilter("Approved")} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === `Approved` ? `text-primary` : `text-gray-700`}`}>Approved</button>

          <button onClick={() => setFilter("Not Approved")} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === `Not Approved` ? `text-red-700` : `text-gray-700`}`}>Not Approved</button>
        </div>

      </div>


      <div className=' relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>

        <table className=' w-full text-sm text-gray-500'>
          <thead className=' text-xs text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className=' px-6 py-3'>Blog Title & Comment</th>

              <th scope='col' className=' px-6 py-3 max-sm:hidden'>Date</th>

              <th scope='col' className=' px-6 py-3'>Action</th>
            </tr>

          </thead>

          <tbody>
            {comments.filter((comment) => {
              return(filter === "Approved" ? comment.isApproved === true : comment.isApproved === false)
            }).map((comment, index) => <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />
            )}
          </tbody>
        </table>

      </div>

    </div>


    </main>
  )
}
