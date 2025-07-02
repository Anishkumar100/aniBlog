import React from 'react'
import { assets, footer_data } from '../assets/assets'

export const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3 dark:bg-gray-900 dark:text-white'>

      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-t border-gray-500/30 dark:border-gray-600 text-gray-500 dark:text-gray-300'>

        <div>
          {/*Even here u have to change logo when in darkmode */}
          <img
            src={JSON.parse(localStorage.getItem("darkMode")) === true ? assets.logo_dark : assets.logo_light}
            alt="logo"
            className='w-32 sm:w-44'
          />
          <p className='max-w-[410px] mt-6'>
            AniBlOG is your go-to space for creative insights, trending topics, and thoughtful reads. Explore fresh perspectives, engage with ideas, and stay inspired through every scroll on AniBlOG.
          </p>
        </div>

        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
          {footer_data.map((section, index) => {
            return (
              <div key={index}>
                <h3 className='font-semibold text-base text-gray-900 dark:text-white mb-2'>
                  {section.title}
                </h3>
                <ul className='text-sm space-y-1'>
                  {section.links.map((link, i) => {
                    return (
                      <li key={i}>
                        <a href="#" className='hover:underline transition'>
                          {link}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

      </div>

      <p className='py-4 text-center text-sm md:text-base text-gray-500/80 dark:text-gray-400'>
        Copyright © 2025 AniBlog<br />
        Anish Kumar - All Rights Reserved
      </p>

    </div>
  )
}
