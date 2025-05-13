import { useState } from 'react'
import Cadastro from './components/cadastro'
import Login from './components/login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Cadastro/>
    <Login/>
    </>
  )
}

export default App