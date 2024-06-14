import React from 'react'
import registerGif from "../img/register.gif"
import loginGif from "../img/login.gif"
import submitGif from "../img/tick.gif"


export const Steps = () => {
  return (
    <section id='steps' className='w-full flex flex-col h-auto bg-slate-800  text-white gap-10'>
        <span className=' py-8 px-6 text-4xl font-extrabold text-center'>Procedure To Vote</span>
        <div className='flex items-start justify-center p-5'>
            <div className='flex flex-col gap-4 items-center justify-center w-[30%]'>
                <img className=' size-[200px]' src={registerGif} alt="" />
                <span className=' text-2xl font-bold px-4 py-2 text-wrap text-center'>Register yourself by filling the required information</span>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center w-[30%]'>
                <img className=' size-[200px]' src={loginGif} alt="" />
            <   span className=' text-2xl font-bold px-4 py-2 text-wrap text-center'>Sign In as user</span>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center w-[30%]'>
                <img className=' size-[200px]' src={submitGif} alt="" />
                <span className=' text-2xl font-bold px-4 py-2 text-wrap text-center'>Vote your Candidate and Submit</span>
            </div>
        </div>
    </section>
  )
}
