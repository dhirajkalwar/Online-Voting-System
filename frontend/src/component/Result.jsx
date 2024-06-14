import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import axios from "../axiosConfig"
import Cookies from "js-cookie"

export const Result = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        call()
    },[])

    const call = async () => {
        const res = await axios.get('/user/result',{
            headers:{
                'Authorization' : `Bearer ${Cookies.get('token')}`
            }
        })

        if(res) {
            setData(res.data)
            console.log(res.data);
        }
    }
  return (
    <>
        <section className='w-full flex flex-col min-h-screen  text-white bg-slate-800 gap-6 item-start justify-start'>
        <Navbar isDashboard={true} />
        <div className='flex w-full items-center justify-center'>
            <div className='flex flex-col gap-6 px-20 w-[60%] items-center'>
                <span className='text-2xl font-bold px-4 py-2'>Election Result</span>
                {data.map((items,index) => (
                    <>
                        <div  className=' w-[70%] flex gap-4 border border-black rounded-md px-8 py-4 bg-white text-black  items-center justify-around'>
                            <span className=' text-xl font-bold'>{index + 1}</span>

                            <div className='flex gap-4 w-[30%] items-center justify-center'>
                                <span className='text-xl font-bold '>{items['candidateName']}</span>
                            </div>
                        
                            <span className='text-xl font-bold w-[30%] flex justify-center '><span>{items['partyName']}</span></span>
                            <span className='text-xl font-bold w-[30%] flex justify-center '><span>{items['voteCount']} Votes</span></span>

                            
                        
                </div>
                    </>
                ))}
                
            </div>
        </div>
    </section>
    </>
  )
}
