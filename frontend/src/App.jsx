import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './component/Home'
import { BrowserRouter as Router , Routes , Route} from "react-router-dom"
import { Register } from './component/Register'
import { Login } from './component/Login'
import { Profile } from './component/Profile'
import { Election } from './component/Election'
import { Voting } from './component/Voting'
import { Result } from './component/Result'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}  />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Profile  />} />
        <Route path='/election' element={<Election />} />
        <Route path='/election/vote/:id' element={<Voting />} />
        <Route path='/result' element={<Result />} />

      </Routes>
    </Router>
    </>
  )
}

export default App
