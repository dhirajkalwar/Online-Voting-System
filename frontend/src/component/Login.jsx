import React from 'react'
import loginImg from "../img/login.svg"
import { Navbar } from './Navbar'
import { useState } from 'react'
import axios from "../axiosConfig"
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const history = useNavigate()
    const [formData , setFormData] = useState({
        voterId:"",
        password:""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handelSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post('/auth/signin',formData,{withCredentials:true})

        if(res) {
            history('/election')
        }
        // ------------------- http method --------------------
    }

  return (
    <>
        <section className=' w-full bg-slate-800 flex min-h-screen  text-white p-5'>
        <div className='w-[50%] bg-slate-800 flex items-center justify-center'>
            <img className=" size-[90%]  " src={loginImg} alt="" />
        </div>
        <div className='w-[50%] bg-slate-800 flex flex-col '>
            <Navbar />
            <div className='flex flex-col gap-10 items-center justify-center h-full'>
                <span className='text-6xl font-extrabold'>Sign In</span>
                <form onSubmit={handelSubmit} className='flex flex-col gap-6 w-[50%]'>
                    <input className=' outline-none px-4 py-2 rounded-md  placeholder-white bg-slate-700 ' placeholder='Voter Id' onChange={handleChange} value={formData.voterId} name='voterId'  type="text" />
                    
                    <input  className=' outline-none px-4 py-2 rounded-md  placeholder-white bg-slate-700 ' placeholder='Password' onChange={handleChange} value={formData.password} name='password' type="password" />

                    <button className=' text-2xl font-bold bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md' type='submit'>
                        Sign In
                    </button>
                    <span className='text-center text-xl'>Don&apos;t have an Account ? <a className=' font-bold text-blue-500 hover:text-blue-700' href="/register">Sign Up</a></span>
                </form>
            </div>
        </div>
            

            
    </section>
    </>
  )
}
