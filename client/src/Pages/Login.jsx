import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios';

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch()
  const [details, setDetails] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('')
  const changes = ({target})=> {
    setDetails({ ...details, [target.name]: target.value})
  }
  const submit = async(e) => {
     try {
      e.preventDefault()
      setLoading(true)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/sign-in`, details);
      if (data.ok) {
        toast.success(data.msg);
        dispatch(setUser(data.user));
        nav('/home');
      } 
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.msg)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='h-screen flex items-center justify-center bg-blue-700'>
      <div className='w-[80%] flex justify-center rounded-md flex-col items-center bg-white'>
        <h2 className='font-semibold text-2xl py-1 text-slate-600'>Welcome</h2>
        <div className='w-full p-1'>
            <form onSubmit={submit} className='w-full flex flex-col gap-2'>
              <input required name='email' value={details.email} onChange={changes} className='w-full p-1 border border-blue-600 bg-blue-50  text-blue-500 font-medium rounded outline-green-400' type="email" placeholder='Email' />
              <input required name='password' value={details.password} onChange={changes} maxLength={10} className='w-full p-1 border border-blue-600 bg-blue-50  text-blue-500 font-medium rounded outline-green-400' type="password" placeholder='Password' />
              <button className='bg-blue-600 flex items-center justify-center gap-1 p-2 font-semibold text-white rounded-md active:bg-green-400' type='submit'>
                Login
                {loading && <span className='h-5 w-5 border-[2px] rounded-full  border-t-green-600 animate-spin'></span>}
              </button>
            </form>
          </div>
          <div className='w-full'>
            <div className='flex p-2'>
              <p onClick={()=> nav('/forgot-password')} className='ml-auto text-blue-500 font-medium hover:underline cursor-pointer'>Forgot Password</p>
            </div>
            <div className='flex items-center p-2 justify-center'>
              <p className='text-slate-500 font-medium'>Don't have an account? <span onClick={()=> nav('/sign-up')} className='text-blue-500 hover:underline cursor-pointer'>Sign up</span></p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login