import React, { useEffect, useState } from 'react'
import Img1 from '../img/bjp.png'
import Img3 from "../img/congress.png"
import Img4 from "../img/aap.png"
import Img2 from "../img/sp.png"
import axios from "../axiosConfig"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'

export const Voting = () => {
    const [modalIsOpen, setIsOpen] = React.useState(true);
    const history = useNavigate()
    const [data, setData] = useState([]);

    useEffect(() => {
        call()

    },[])

    const call = async () => {
        const res = await axios.get('/user/voterDetail',{
                headers:{
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
        })

        if(res) {
            setData(res.data)
        }
    }

    const closeModal = () => {
        
        history('/dashboard')
      };
    const str = [
        "Stay in the frame of your camera alone and with sufficient lighting for the entire duration.", 
        "Have Security Keys with you as you would require it to proceed.",
        "You are allowed to make only one vote per election. ",
        "You are allowed to choose only one candidate per election.",
        "Candidates information are available on the page.",
        "Make sure that you are selecting your wanted candidate by confirming the name and symbol on the screen.",
        "After selecting the candidates make sure to submit the vote.",
        "Result will be announced after 5 days of election being completed.", 
        "You can verify your vote after the election results are announced."
    ]

    const proceed = () => {
        setIsOpen(false)
    }

    const arr = [Img1, Img2, Img3, Img4]

    

    const Modal = () => {
        const [isClicked, setIsClicked] = useState(false)
        const clicked = () => {
            setIsClicked(true)
        }
        return (
            <>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-[40%] h-[80%] rounded-md relative text-black px-4 py-2 flex flex-col gap-4">
                <span className='text-xl font-bold'>This election is being conducted by the election commission of India. </span>
                <div className=' border rounded-md px-4 py-2 border-black flex flex-col gap-4'>
                <p className=' text-lg text-justify'>You, as being a member of the constituency under the constituencies of Uttar Pradesh State Election, are allowed to vote. Please take the following steps in order to cast a valid vote. You are requested to cast vote on your own decision and not by being presserurized or terroized by someone. If someone threatens you for making a voting decsion please contact the given helpline numbers .</p>
                <span className=' text-xl font-bold px-2 py-2 '>Steps :</span>
                <ul className=' list-disc px-4 py-2 text-justify'>
                    {str.map((data,index) => (
                        <li key={index} className='text-lg '>{data}</li>
                    ))}
                </ul>
                </div>
                <span className=' px-3 flex items-center justify-start'><input onClick={clicked} className=' size-5 px-4 py-2' type="radio" /><span className=' px-4 py-2 text-xl font-bold'>I Understand and will follow above steps</span> </span>
                <div className='flex gap-4 justify-end text-white pt-16 px-4'>
                <a href="/election"><button className=' bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md cursor-pointer'>Cancel</button></a>
                <button disabled={!isClicked} onClick={proceed} className={isClicked ? "bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md cursor-pointer" : " bg-gray-700 cursor-not-allowed px-4 py-2 rounded-md"}>Proceed</button>
                </div>

            </div>
            </div>
            </>
        )
    }

    const Page = () => {
        const [isClicked, setIsClicked] = useState(false)
        const [id , setId] = useState("")
        const [isVoted, setIsVoted] = useState(false)
        const clicked = (id) => {
            setIsClicked(true)
            setId(id)
        }

        const handelSubmit = async () => {
            console.log(id);
            const res = await axios.get(`/user/vote/${id}`,{
                headers:{
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
        })

        if(res) {
            setIsVoted(true)
            console.log("active");
        }

            
        }
        return (
            <>
                <div className='flex flex-col gap-10 justify-center items-center px-4 py-2'>
                    <span className='text-6xl text-blue-500 font-extrabold px-4 py-2'>Voting Panel</span>
                    
                    {data.map((data, index) => (
                        <div key={index} className=' w-[70%] flex gap-4 border border-black rounded-md px-8 py-4 bg-white text-black  items-center justify-center'>
                            <div className='flex gap-4 w-[30%]'>
                                <input onClick={() => clicked(data['id'])} name='radio-group' className=' size-8' type="radio" />
                                <span className='text-xl font-bold '>{data['candidateName']}</span>
                            </div>
                        
                            <span className='text-xl font-bold w-[30%] flex justify-center '><span>{data['partyName']}</span></span>
                            <div className='w-[40%] flex justify-center'>
                                <img  className=" size-[20%] px-4 py-2 " src={arr[index]} alt="" />
                            </div>
                        
                        </div>
                    ))}
                    <button disabled={!isClicked} onClick={handelSubmit} className={isClicked ? "bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md w-[10%] text-xl" : " bg-gray-700 cursor-not-allowed px-4 py-2 rounded-md w-[10%] text-xl"}>Submit</button>
                </div>

                {isVoted && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-gray-400 rounded-md p-8 w-1/5 h-1/5 flex flex-col gap-4 items-center justify-center">
                        <span className="text-xl font-bold px-4 py-2">Your Vote Submit Successfully</span>
                        <button className=" bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-black px-4 py-2 rounded-md" onClick={closeModal}>
                          Ok
                        </button>
                      </div>
                    </div>
                )}
            </>
        )
    }

  return (
    <section className=' flex flex-col gap-4 bg-slate-800 min-h-screen text-white'>
        {modalIsOpen ? <Modal />: <Page /> }
        
        
    </section>
  )
}
