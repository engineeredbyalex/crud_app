import React, { useState, useEffect, useContext } from 'react'
import { base_url } from '../utils/config'
import axios from 'axios'
import storeContext from '../context/storeContext'
import Header from './components/Header'
import { Link } from 'react-router-dom'
import { BlueButton, GreenButton, RedButton } from './components/Button'
import toast from 'react-hot-toast'

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const stateData = useContext(storeContext);

  const get_my_post = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${base_url}/api/post/all`, {
        headers: {
          Authorization: `Bearer ${stateData.store.token}`

        },
      });
      setLoader(false);
      setPosts(data.posts);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  useEffect(() => {
    get_my_post();
  }, []);
  const delete_post = async (postId) => {
    try {
       const { data } = await axios.delete(`${base_url}/api/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${stateData.store.token}`
        },
       });
      toast.success(data.message)
      get_my_post()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='overflow-hidden'>
      <Header />
     <div className='w-[80%] mx-auto py-10'>
        <h2 className=''>Posts</h2>
         <div className='lg:grid grid-cols-3 flex flex-col gap-10'>
          {posts.map((post, index) => <div key={post._id}  className='bg-white  rounded-md block px-5 py-3 shadow-md'>
            <img className='mb-5' src={post.image} alt={post.title} />
            <h3 className='text-2xl mt-5 mb-5 font-bold'>{post.title}</h3>
              <BlueButton>
            <a href='/'>
                View Project
            </a>
              </BlueButton>
            <div className='flex flex-col items-center mt-1 gap-3 '>
              <GreenButton>
                <Link to={`/post/edit/${post._id}`}>Edit</Link>
              </GreenButton>
              <RedButton>
                <Link onClick={() => delete_post(post._id)}>Delete</Link>
              </RedButton>
          </div>
  </div>)}
        </div>
      </div>
    </div>
  );
}

export default AllPosts;