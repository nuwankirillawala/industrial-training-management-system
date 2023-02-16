import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login/Login'
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar'
import CreateUser from './components/shared/CreateUser/CreateUser'
import { BasicCard } from './components/card/basicCard/BasicCard'
import theme from './components/shared/theme'
import { ThemeProvider } from '@mui/material/styles'


function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme = {theme}>
      <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/navbar' element={<Navbar/>}/> 
        <Route exact path='/sidebar' element={<Sidebar/>}/>
        <Route exact path='/create-user' element={<CreateUser/>}/> 
        <Route exact path='/basiccard' element={<BasicCard/>}/> 
      </Routes>
      </Router>
    </ThemeProvider>
    
  )
}

export default App
