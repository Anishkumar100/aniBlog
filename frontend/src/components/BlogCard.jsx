import React from 'react'
import { useNavigate } from 'react-router-dom'

export const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow 
                 hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer 
                 bg-white dark:bg-gray-800"
    >
      <img src={image} alt="" className="aspect-video" />

      <span
        className="ml-5 mt-4 px-3 py-1 inline-block 
                   bg-primary/20 text-primary text-xs rounded-full"
      >
        {category}
      </span>

      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900 dark:text-white">
          {title}
        </h5>

        <p
          className="mb-3 text-xs text-gray-600 dark:text-gray-300"
          dangerouslySetInnerHTML={{
            __html: `${description.slice(0, 100)}...`
          }}
        ></p>
      </div>
    </div>
  )
}
