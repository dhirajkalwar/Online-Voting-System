
export const Navbar = ({isDashboard}) => {
  return (
    <div className="">
        <ul className="flex p-10 gap-6 text-2xl items-center justify-center">
            <a href="/"><li className=" px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer">Home</li></a>
            
            
            {isDashboard ? 
            <>
              <a href="/election"><li className=" px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer">Election</li></a> 
              <a href="/dashboard"><li className=" px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer">Profile</li></a>
              <a href="/result"><li className=" px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer">Result</li></a> 
              <a href="/logout"><li className=" px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer">Logout</li></a> 

            </>
              :
            <>
              <a href="/#about"><li className=" px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer">About</li></a>
              <a href="/#steps"><li className=" px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer">How to Vote ?</li></a>
              <a href="/login"><li className=" px-4 py-2 hover:bg-blue-700 rounded-md cursor-pointer">Login</li></a>

            </>


            }


        </ul>

    </div>
  )
}  

