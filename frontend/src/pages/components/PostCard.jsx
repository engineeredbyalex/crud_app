import React, { useEffect, useState } from "react"
import axios from "axios"
import { base_url } from "../../utils/config"
import { BlueButton } from "./Button"
import { Link } from 'react-router-dom';


const PostCard = ({ children }) => {
   const [posts, setPosts] = useState([]);
    
    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/post/all`);
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
  
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col gap-10">
               {posts.map((post) => (
              post.visibility ? (
                <div key={post._id} className='bg-slate-100 flex flex-col items-center w-[20rem] h-auto px-3 py-5 rounded-md hover:scale-[1.03] transition-all ease-in-out'>
                  <h3>{post.title}</h3>
                  {post.image && <img className='mb-5 lg:w-[15rem] lg:h-[15rem] rounded-md' src={post.image} alt={post.title} />}
                  <BlueButton>
                    {post.link.startsWith('http') ? (
                      <a href={post.link} target='_blank' rel='noopener noreferrer'>
                        View Project
                      </a>
                    ) : (
                      <Link to={post.link}>
                        View Project
                      </Link>
                    )}
                  </BlueButton>
                </div>
              ) : null
            ))}
    </div>
  )
}

export default PostCard