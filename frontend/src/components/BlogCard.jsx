import React from 'react'
import { useNavigate } from 'react-router-dom'

export const BlogCard = ({blog}) => {

    /*
    The Actual data destructured is initially from the assets. later we will change it by linking it with db
    */
    const {title,description,category,image,_id} = blog

    const navigate= useNavigate()

  return (
    <>
{/*When We click the card it navigates to a link with its id. */}

    <div onClick={()=>navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
        <img src={image} alt="" className='aspect-video'/>
        <span className=' ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
        <div className='p-5'>
            <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
            <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html":`${description.slice(0,100)}...`}}></p>
        </div>
        {/*You know how dangerouslySetInnerHtml Works. It just converts the html tags like h2 in between texts and gives functionality. like making the text bold */}
    </div>
    </>
  )
}
