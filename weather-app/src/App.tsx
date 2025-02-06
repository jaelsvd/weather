import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/main.scss'
import './App.css'
import Weather from './pages/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Weather />
    </>
  )
}

export default App
