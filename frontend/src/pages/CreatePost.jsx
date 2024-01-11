import React, { useContext, useState } from 'react';
import Header from './components/Header';
import axios from 'axios';
import { base_url } from '../utils/config';
import storeContext from '../context/storeContext';
import toast from "react-hot-toast"
import { BlueButton, GoldButton } from './components/Button';

function CreatePost() {
  const { store } = useContext(storeContext);
  const [image, setImage] = useState('');
  const [state, setState] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    visibility: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
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

    const visibility = toggle ? 'true' : 'false';

    const formData = new FormData();
    formData.append('title', state.title);
    formData.append('description', state.description);
    formData.append('image', state.image);
    formData.append('link', state.link);
    formData.append('visibility', visibility);

    try {
      const { data } = await axios.post(`${base_url}/api/post/create`, formData, {
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

  return (
 <div className='overflow-x-hidden'>
      <Header />
      <div>
       <div className= "w-[80%] p-4 bg-white mx-auto mt-10 rounded-md shadow-md ">
          <h2 className='text-xl font-bold mb-5 uppercase'>Create post</h2>
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
              ></input>
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
              ></textarea>
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
                required
                type='file'
                id='image'
                className='px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo:500 overflow-hidden'
              ></input>
            </div>
            <div className='mb-5 flex items-center  gap-10 '>
              {!toggle ? (
                <div className='bg-gray-200 w-[6rem] h-[3rem] rounded-full flex items-center justify-start '>
                  <div
                    onClick={() => {
                      setToggle(!toggle);
                      setState({
                        ...state,
                        visibility: 'true',
                      });
                    }}
                    className='h-[2.5rem] w-[2.5rem] bg-[#2B304D] rounded-full ml-1.5 cursor-pointer '
                  ></div>
                </div>
              ) : (
                <div className='bg-gray-200 w-[6rem] h-[3rem] rounded-full flex items-center justify-end'>
                  <div
                    onClick={() => {
                      setToggle(!toggle);
                      setState({
                        ...state,
                        visibility: 'false',
                      });
                    }}
                    className='h-[2.5rem] w-[2.5rem] bg-[#2B304D]  rounded-full mr-1.5 cursor-pointer '
                    >
                  </div>
                </div>
              )}
              {toggle ? (<h4 className='font-bold'>True</h4>) :(<h4 className='font-bold'>False</h4>)}
            </div>
            <div className='w-full flex items-center justify-center'>
               <GoldButton disabled={isLoading}>
              {isLoading ? 'Creating project...' : 'Create project'}
            </GoldButton>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
