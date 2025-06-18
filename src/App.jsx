import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Authentication from '@/Screens/Authentication/Authentication'
import { Toaster } from 'sonner'
import { Route, Routes } from 'react-router-dom'
import Home from '@/Screens/Home/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster richColors position='top-right' />
    <Routes>
      <Route path='/' element={<Authentication />} />
      <Route path='/home' element={<Home />} />
    </Routes>
    {/* <Authentication /> */}
    </>
  )
}

export default App
