import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from '@/Home/Home'
import Button from '@/components/ui/button'
import Authentication from '@/Screens/Authentication/Authentication'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       {/* <div className="p-4">
      <Button>Click Me</Button>
      <Button variant="default" className="ml-2 hover:cursor-pointer">Outline</Button>
    </div> */}
    <Authentication />
    </>
  )
}

export default App
