import React, { useContext, useEffect, useState } from 'react';
import Header from './components/Header';
import axios from 'axios';
import { base_url } from '../utils/config';
import storeContext from '../context/storeContext';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import {GoldButton } from './components/Button';

function EditPost() {
  const [post, setPost] = useState({});
  const { store } = useContext(storeContext);
  const { postId } = useParams();
  const [image, setImage] = useState('');
  const [state, setState] = useState({
    title: '',
    description: '',
    image: '',
    visibility: '',
    link: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(state.visibility === 'public');
  const [isVisible, setIsVisible] = useState(true);

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    if (e.target.files.length > 0) {
      setState({
        ...state,
        image: e.target.files[0],
      });
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', state.title);
    formData.append('description', state.description);
    formData.append('old_image', post.image);

    if (state.image instanceof File) {
      formData.append('new_image', state.image);
    }

    formData.append('visibility', state.visibility);
    formData.append('link', state.link);

    try {
      const { data } = await axios.patch(`${base_url}/api/post/update/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const get_post = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setState({
        title: data.post?.title,
        description: data.post?.description,
        image: data.post?.image,
        link: data.post?.link,
        visibility: data.post?.visibility,
      });
      setPost(data.post);
      setImage(data.post.image);

      // Set the initial state of toggle based on post.visibility
      setToggle(data.post?.visibility);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postId) {
      get_post();
    }
  }, [postId]);

  return (
    <div className='overflow-x-hidden'>
      <Header />
      <div>
        <div className= "w-[80%] p-4 bg-white mx-auto mt-10 rounded-md shadow-md ">
          <h2 className='text-xl font-bold mb-5 uppercase'>Edit post</h2>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label>Title</label>
              <input
                onChange={inputHandler}
                value={state.title}
                required
                type='text'
                name='title'
                id='title'
                placeholder='Title'
                className='px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo:500 overflow-hidden'
              />
            </div>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label>Description</label>
              <textarea
                rows={2}
                onChange={inputHandler}
                value={state.description}
                required
                type='text'
                name='description'
                id='description'
                placeholder='Description'
                className='px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo:500 overflow-hidden'
              />
              <label>Link</label>
              <p className=''>It needs to contain http / https to redirect</p>
              <input
                rows={2}
                onChange={inputHandler}
                value={state.link}
                required
                type='text'
                name='link'
                id='link'
                placeholder='Link to the project'
                className='px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo:500 overflow-hidden'
              ></input>
            </div>
            {image && (
              <div className='mb-3 h-full w-full'>
                <img src={image} alt='' />
              </div>
            )}
            <div className='flex flex-col w-full gap-1 mb-5'>
              <label>Image</label>
              <input
                onChange={imageHandler}
                type='file'
                id='image'
                className='px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo:500 overflow-hidden'
              />
            </div>
            <div className='mb-5'>
              <label>Visibility</label>
              {state.visibility ? (
                <div className='bg-slate-200 w-[3.5rem] h-[2rem] rounded-full flex items-center justify-end'>
                  <div
                    onClick={() => {
                      setToggle(!toggle);
                      setState({ ...state, visibility: false });
                    }}
                    className='h-[1.5rem] w-[1.5rem] bg-[#2B304D] rounded-full mr-1.5 cursor-pointer '
                  ></div>
                </div>
              ) : (
                <div className='bg-slate-200 w-[3.5rem] h-[2rem] rounded-full flex items-center justify-start'>
                  <div
                    onClick={() => {
                      setToggle(!toggle);
                      setState({ ...state, visibility: true });
                    }}
                    className='h-[1.5rem] w-[1.5rem] bg-[#2B304D] rounded-full ml-1.5 cursor-pointer '
                  ></div>
                </div>
              )}
            </div>
            <div className='w-full flex items-center justify-center'>
              <GoldButton disabled={isLoading}>{isLoading ? 'Editing post...' : 'Edit Post'}</GoldButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
