import React from 'react'
import { NavBar,Header, BlogList, NewsLetter,Footer } from '../components/indexComponents'

export const Home = () => {
  return (
    <>
      <NavBar />
      <Header/>
      <BlogList/>
      <NewsLetter/>
      <Footer/>
    </>
  )
}
