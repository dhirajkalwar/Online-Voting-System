import { Navbar } from "./Navbar"
import img1 from "../img/Voting-bro.svg"
import { About } from "./About"
import { Steps } from "./Steps"
import { Footer } from "./Footer"

export const Home = () => {
  return (
    <>
    <div className=" w-full flex min-h-screen  text-white">
        <div className='w-[50%] bg-slate-800 flex items-center justify-center'>
            <img className=" size-[90%]  " src={img1} alt="" />
        </div>
        <div className='w-[50%] bg-slate-800'>
            <Navbar />
            <div className="flex flex-col items-start gap-6 justify-center h-[87%] px-7">
                <span className=" text-center font-bold text-6xl px-4 py-2">Be a part of decision</span>
                <span className=" text-blue-500 text-8xl px-4 py-2 font-extrabold ">Vote Today</span>
                <div className="flex gap-6 p-4">
                    <a className="bg-blue-500 hover:bg-blue-700 w-[5] px-10 py-4  rounded-md cursor-pointer text-xl" href="/register">Register</a>
                    <a className="bg-blue-500 hover:bg-blue-700 w-[5] px-10 py-4  rounded-md cursor-pointer text-xl" href="#about">Read More</a>
                </div>
            </div>
        </div>
    </div>
    <About />
    <Steps />
    <Footer />
    </>
)
}  