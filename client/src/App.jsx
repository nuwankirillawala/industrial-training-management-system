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
import UserProfile from './components/shared/UserProfile/UserProfile'
import { StdDashboard } from './components/user/Undergraduate/Pages/StdDashboard'
import { Layout } from './components/Layout/Layout'
// import { StdCompnay } from './components/user/Undergraduate/Pages/StdCompnay'
import { CvUpdate } from './components/user/Undergraduate/Pages/CvUpdate'
import Manageuser from './Pages/Admin/Manageuser'
import { AddAdmin } from './Pages/Admin/AddAdmin'
import { ViewAdmin } from './Pages/Admin/ViewAdmin'
import {Admin} from './components/shared/CreateUser/forms/Admin'
import {Company} from './components/shared/CreateUser/forms/Company'
import {Alumini} from './components/shared/CreateUser/forms/Alumini'
import {Supervisor} from './components/shared/CreateUser/forms/Supervisor'
import {Undergraduate} from './components/shared/CreateUser/forms/Undergraduate'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/navbar' element={<Navbar />} />
          <Route exact path='/sidebar' element={<Sidebar />} />
          <Route exact path='/create-user' element={<CreateUser />} />
          <Route exact path='/basiccard' element={<BasicCard />} />
          <Route exact path='/user-profile' element={<UserProfile />} />
          <Route exact path='/stddash' element={<StdDashboard />} />
          {/* <Route exact path='/stdcompany' element={<StdCompnay />} /> */}
          <Route exact path='/layout' element={<Layout />} />
          <Route exact path='/cvupdate' element={<CvUpdate />} />
          <Route exact path='/manageuser' element={<Manageuser />} />
          <Route exact path='/addadmin' element={<AddAdmin />} />
          <Route exact path='/view-admin-details' element={<ViewAdmin />} />

          <Route exact path='/adminform' element={<Admin />} />
          <Route exact path='/aluminiform' element={<Alumini />} />
          <Route exact path='/companyform' element={<Company />} />
          <Route exact path='/supervisorform' element={<Supervisor />} />
          <Route exact path='/undergraduateform' element={<Undergraduate />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
