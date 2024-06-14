import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import axios from "../axiosConfig"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'



export const Election = () => {
    const history = useNavigate()
    const [data, setData] = useState(undefined);
    const [latestEvent, setLatestEvent] = useState(undefined);
    const [state, setState] = useState(false)
    const [active, setActive] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        call()
    },[])

    

    const call = async () => {

        try {
            const res = await axios.get('/user/election',{
                headers:{
                    'Authorization':`Bearer ${Cookies.get('token')}`
                }
            })
    
            if(res) {
                
                setLatestEvent(res.data[0])
                setData(res.data.slice(1));
                setState(true)
    
                const eventDate = new Date(res.data[0]['date']);
                const currentUTCDate = new Date();
                const fivePMLocalUTC = new Date(currentUTCDate);
                fivePMLocalUTC.setUTCHours(17, 0, 0, 0);
    
                if(currentUTCDate >= eventDate && currentUTCDate < fivePMLocalUTC) {
                    setActive(true)
                    console.log('Active');
                }
                
            }
        } catch (error) {
            console.log(error);
            history('/login')
        }
        
    }

    const vote = async (id) => {
        const res = await axios.get('/user/isVoted',{
            headers: {
                'Authorization' :  `Bearer ${Cookies.get('token')}`
            }
        })

        if(res.data) {
            history(`/election/vote/${latestEvent['id']}`)
        }
        else{
            setIsModalOpen(true)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
  return (
    <>
        {state ? <>
            <section className='w-full flex flex-col min-h-screen  text-white bg-slate-800 gap-6 item-start justify-start'>
        <Navbar isDashboard={true} />
        <div className='flex w-full items-center justify-center'>
            <div className='flex flex-col gap-6 px-20 w-[60%]'>
                <span className='text-2xl font-bold px-4 py-2'>Upcoming Election : </span>
                <div className='px-5 py-4 bg-white rounded-md text-black flex w-full items-center justify-between'>
                    <span className='text-2xl font-bold'>{latestEvent['state']} Election</span>
                    <span onClick={() => vote(latestEvent['id'])} className='text-2xl font-bold'>{latestEvent['date'].split('T')[0]}<button disabled={false} className={!active ? 'bg-gray-500 cursor-not-allowed rounded-md px-4 py-2 ml-[20px] text-white ': 'bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2 ml-[20px] text-white' }>Vote</button></span>
                </div>
                <span className='text-2xl font-bold px-4 py-2'>Other Election :</span>
                {data.map((item,index) => (
                    <>
                        <div key={index} className='px-5 py-4 bg-white rounded-md text-black flex w-full items-center justify-between'>
                            <span className='text-2xl font-bold'>{item['state']}  Election</span>
                            <span className='text-2xl font-bold'>{item['date'].split('T')[0]}</span>
                        </div>
                    </>
                ))}
            </div>
        </div>
    </section>
        </> : <>
        <section className='w-full flex flex-col min-h-screen  text-white bg-slate-800 gap-6 item-start justify-start'></section>
        </>}

        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-400 rounded-md p-8 w-1/5 h-1/5 flex flex-col gap-4 items-center justify-center">
            <span className="text-xl font-bold px-4 py-2">Already Voted </span>
            <button className=" bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-black px-4 py-2 rounded-md" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

    </>
    
    
    
 )
}
