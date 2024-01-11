import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PostCard from './components/PostCard';

function Home() {



  return (
    <div className='overflow-x-hidden  min-h-screen'>
      <Header />
      <div className='w-[80%] mx-auto py-10 '>
        <h2 className=' mb-5 text-[#2B304D] font-bold uppercase leading-8 lg:leading-none'>These are my projects</h2>
         <PostCard/>
      </div>
    </div>
  );
}

export default Home;
