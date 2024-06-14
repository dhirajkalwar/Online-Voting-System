import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import avatar from "../img/man.svg"
import axios from "../axiosConfig"
import Cookies from "js-cookie"

export const Profile = () => {
    const [data, SetData] = useState({})
  useEffect(()=> {
      call();
  },[])

  const call = async () => {
    const res = await axios.get('/user/profile',{
        headers:{
          'Authorization' : `Bearer ${Cookies.get('token')}`
        }
    })
    if(res) {
      SetData(res.data)
    }
  }

  return (
    <section className='w-full flex min-h-screen  text-white bg-slate-800 justify-center'>
        
        <div className='w-[50%] bg-slate-800 flex flex-col gap-10 items-center justify-center'>
            <img className=" size-[40%]  " src={avatar} alt="" />
            <button className='text-xl font-bold px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700'>Change profile picture</button>
        </div>
        <div className='w-[50%] bg-slate-800 flex flex-col '>
            <Navbar isDashboard={true} />
            <div className='flex flex-col flex-wrap gap-2 items-start justify-start h-full'>
                <span className='text-lg text-blue-700 px-4 pt-4 '>Name :</span>
                <span className='text-xl font-bold px-4 '>{data.name}</span>
                <span className='text-lg text-blue-700 px-4 pt-4 '>Mobile number :</span>
                <span className='text-xl font-bold px-4 '>{data.mobileNo}</span>
                <span className='text-lg text-blue-700 px-4 pt-4 '>Age :</span>
                <span className='text-xl font-bold px-4 '>{data.age}</span>
                <span className='text-lg text-blue-700 px-4 pt-4 '>Email :</span>
                <span className='text-xl font-bold px-4 '>{data.email}</span>
                <span className='text-lg text-blue-700 px-4 pt-4 '>Aadhaar number :</span>
                <span className='text-xl font-bold px-4 '>{data.email}</span>
                <span className='text-lg text-blue-700 px-4 pt-4 '>Voter Id :</span>
                <span className='text-xl font-bold px-4 '>{data.voterId}</span>
                <span className='text-lg text-blue-700 px-4 pt-4 '>Verified :</span>
                <span className='text-xl font-bold px-4 '>True</span>
            </div>
        </div>

    </section>
  )
}
