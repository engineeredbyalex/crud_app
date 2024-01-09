import React, { useContext, useState } from 'react'
import axios from 'axios'
import { base_url } from '../utils/config'
import toast from "react-hot-toast"
import storeContext from "../context/storeContext"
import { useNavigate } from "react-router-dom"


function Register() {
 const navigate = useNavigate()
  const {dispatch} = useContext(storeContext)
  const [state, setState] = useState({
    name:'',
    email: '',
    password:'',
  })

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
 const [loader, setLoader] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      const { data } = await axios.post(`${base_url}/api/auth/user/register`, state)
      localStorage.setItem('crud_token', data.token)
      toast.success(data.message)
      dispatch({ type: 'registration_successful', payload: { token: data.token } })
      navigate('/user/posts')
    }
    catch (error) {
           setLoader(true)
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className='w-[370px] text-slate-600 h-[560px]'>
        <div className='bg-white  w-full shadow-md px-7 py-10 rounded-md'>
          <h2 className='text-center text-2xl font-semibold uppercase'>Portfolio App</h2>
          <p className='text-lg uppercase text-center font-thin mt-2 mb-4'>Please Register</p>
          <form onSubmit={submit}>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='name'>Name</label>
              <input onChange={inputHandler} value={state.name} required type='text' name='name' id='name' placeholder='Name'
                className='px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo:500 overflow-hidden'></input>
            </div>
              <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='name'>Email</label>
              <input onChange={inputHandler} value={state.email} required type='email' name='email' id='email' placeholder='Email'
                className='px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo:500 overflow-hidden'></input>
            </div>
              <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor='name'>Password</label>
              <input onChange={inputHandler} value={state.password} required type='password' name='password' id='password' placeholder='Password'
                className='px-3 py-[6px] outline-none border border-slate-200 bg-transparent rounded-md focus:border-indigo:500 overflow-hidden'></input>
            </div>
            <button className='bg-indigo-500 w-full hover:bg-indigo-600 text-white rounded-md px-3 py-3 text-md'>Register</button>
          </form>
      </div>
      </div>
    </div>
  )
}

export default Register