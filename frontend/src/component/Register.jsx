import React, { useState } from 'react'
import signupImg from "../img/signup.svg"
import { Navbar } from './Navbar'
import axios from "../axiosConfig"
import { useNavigate} from "react-router-dom"

export const Register = () => {
    const history = useNavigate()
    const [voterid, setVoterid] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        history('/login')
      };
    const [formData , setFormData] = useState({
        name:"",
        email:"",
        mobileNo:"",
        aadhaarNo:"",
        password:""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handelSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post('/auth/signup',formData)

        if(res) {
            setVoterid(res.data.voterId)
            openModal();
        }

        // ------------------- http method --------------------
    }

  return (
    <>
    <section className={` w-full bg-slate-800 flex min-h-screen  text-white p-5 ${isModalOpen ? ' blur-sm' : ''}`}>
        <div className='w-[50%] bg-slate-800 flex items-center justify-center'>
            <img className=" size-[90%]  " src={signupImg} alt="" />
        </div>
        <div className='w-[50%] bg-slate-800 flex flex-col '>
            <Navbar />
            <div className='flex flex-col gap-10 items-center justify-center h-full'>
                <span className='text-6xl font-extrabold'>Sign Up</span>
                <form onSubmit={handelSubmit} className='flex flex-col gap-6 w-[50%]'>
                    <input className=' outline-none px-4 py-2 rounded-md  placeholder-white bg-slate-700 '  onChange={handleChange} value={formData.name} placeholder='Name' name='name'  type="text" />
                    <input  className=' outline-none px-4 py-2 rounded-md  placeholder-white bg-slate-700 ' onChange={handleChange} value={formData.email}  placeholder='Email' name='email' type="email" />
                    <input  className=' outline-none px-4 py-2 rounded-md  placeholder-white bg-slate-700 ' onChange={handleChange} value={formData.mobileNo}  placeholder='Mobile Number' name='mobileNo' type="text" />
                    <input  className=' outline-none px-4 py-2 rounded-md  placeholder-white bg-slate-700 ' onChange={handleChange} value={formData.aadhaarNo}  placeholder='Aadhaar Number' name='aadhaarNo' type="text" /> 
                    <input  className=' outline-none px-4 py-2 rounded-md  placeholder-white bg-slate-700 ' onChange={handleChange} value={formData.password}  placeholder='Password' name='password' type="password" />

                    <button className=' text-2xl font-bold bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md' type='submit'>
                        Sign Up
                    </button>
                    <span className='text-center text-xl'>Already have an Account ? <a className=' font-bold text-blue-500 hover:text-blue-700' href="/login">Sign In</a></span>
                </form>
            </div>
        </div>
            
        
            
    </section>
    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-400 rounded-md p-8 w-1/5 h-1/5 flex flex-col gap-4 items-center justify-center">
            <span className="text-xl font-bold px-4 py-2">Your Voter ID is : {voterid}</span>
            <button className=" bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-black px-4 py-2 rounded-md" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      </>
    
  )
}
