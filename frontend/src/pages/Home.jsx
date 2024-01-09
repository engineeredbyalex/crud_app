import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import axios from 'axios';
import { base_url } from '../utils/config';
import { BlueButton } from './components/Button';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/post/all`);
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      <div className='w-[80%] mx-auto py-10'>
        <h2 className='text-2xl font-bold mb-5'>All Posts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='lg:grid grid-cols-3 flex flex-col gap-10'>
            {posts.map((post) => (
              post.visibility ? (
                <li key={post._id} className='bg-white  rounded-md block px-5 py-3 shadow-md'>
                  <h3>{post.title}</h3>
                  {post.image && <img className='mb-5' src={post.image} alt={post.title} />}
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
                </li>
              ) : null
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
