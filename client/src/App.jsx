import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './components/user/Login'
import Navbar from './components/card/basicCard/Navbar';
import Sidebar from './components/card/basicCard/Sidebar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/navbar' element={<Navbar/>}/> 
        <Route exact path='/sidebar' element={<Sidebar/>}/> 
      </Routes>
    </Router>
  )
}

export default App
