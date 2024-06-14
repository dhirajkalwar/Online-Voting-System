import React from 'react'
import votingImg from "../img/Voting-amico.svg"

export const About = () => {
  return (
    <section id='about' className='w-full flex flex-row-reverse min-h-screen bg-slate-800  text-white'>
        <div className='w-[50%] bg-slate-800 flex items-center justify-center'>
            <img className=" size-[80%]   "  src={votingImg} alt="" />
        </div>
        <div className='w-[50%] bg-slate-800'>
            <div className="flex flex-col items-start gap-6 justify-center h-[87%] px-7">
                <span className=' text-6xl font-extrabold w-full text-center '>About Us</span>
                <p className=' text-justify text-2xl px-10 py-6 leading-10'> An online voting system that will replace the old ballot system or paper system Over the time we have utilized the required technology in every sector to improve efficiency and save the extra resources. But the voting system is still very expensive and requires a bigger workforce. The system is slower and still not completely tamper proof. We bring the system that is safe, reliable and solve the modern issues like higher reachability of the booth, crowd free voting, inexpensive, faster results and others.</p>
            </div>
        </div>
    </section>
  )
}
