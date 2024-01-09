import React, { useContext, useState } from 'react'
import axios from 'axios'
import { base_url } from '../utils/config'
import toast from "react-hot-toast"
import storeContext from "../context/storeContext"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import { Button } from './components/Button'
import { BlueButton } from './components/Button'


function Login() {
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const {dispatch} = useContext(storeContext)
  const [state, setState] = useState({
    email: '',
    password:'',
  })

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      const { data } = await axios.post(`${base_url}/api/auth/user/login`, state)
      localStorage.setItem('crud_token', data.token)
      toast.success(data.message)
      dispatch({ type: 'login_success', payload: { token: data.token } })
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
      <div className='w-[370px] text-black h-[560px]'>
        <div className='bg-white  w-full shadow-md px-7 py-10 rounded-md '>
          <div className='text-center'>
          <h3 className='uppercase font-semibold'>Portfolio App</h3>
          </div>
          <p className='  text-center  mb-4'>Testing Details : <br/> admin@admin.com <br/> admin123</p>
          <form onSubmit={submit}>
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
            <div className='w-full flex items-center justify-center'>
              <BlueButton disabled={loader} ><p>{ loader ? 'Loading...' : 'Login'}</p></BlueButton>
            </div>
          </form>
          {/* <p className='text-md  text-center font-normal mt-2 mb-4'>If you dont't have an account, please create one for free.</p>
          <Link className='flex w-full items-center justify-center' to={'/register'}>
            <Button><p>Register</p></Button>
          </Link> */}
      </div>
      </div>
    </div>
  )
}

export default Login