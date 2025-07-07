import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppProvider'
import { useRef } from 'react'

export const Header = () => {

  const darkMode = JSON.parse(localStorage.getItem('darkMode')) || false

  const { setInput, input } = useAppContext()

  const inputRef = useRef() // just like useState but no-rerender

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput("")
    inputRef.current.value = ""
  }
  return (
    <div className="bg-white border-t border-t-gray-600 text-gray-800 dark:bg-gray-900 dark:text-white z-1">
      <div className='mx-8 sm:mx-16 xl:mx-24 relative'>

    

        <div className='text-center pt-20 pb-8'>
          <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 dark:bg-primary/20 rounded-full text-sm text-primary'>
            <p>New: AI feature integrated</p>
            <img src={assets.star_icon} className='w-2.5' alt="" />
          </div>

      

          <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700 dark:text-white'>
            My Own <span className='text-primary'>Blogging</span> <br />Platform.
          </h1>

          <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-sm text-gray-500 dark:text-gray-300'>
            This is my own space to think out loud, to share my thoughts without limitations. Lead my users to success, enlighten them, make them laugh more importantly show them my world
          </p>

          <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white dark:bg-gray-800 rounded overflow-hidden'>
            <input
              className='w-full pl-4 outline-none bg-transparent text-gray-800 dark:text-white'
              type="text"
              ref={inputRef}
              placeholder='search for blogs'
              required
            />
            <button className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer' type="submit">
              Search
            </button>
          </form>
        </div>

        <div className=' text-center'>
          {input && <button onClick={onClear} className=' border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>}

        </div>
        <img
          src={assets.gradientBackground}
          alt=""
          className='absolute -bottom-1 -z-10 '
        />
        {/* For dark mode change the src and the opacity */}
      </div>
    </div>
  )
}
