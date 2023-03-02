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
import { AddAdmin } from './components/user/Admin/addusers/AddAdmin'
import { ViewAdmin } from './components/user/Admin/viewusers/ViewAdmin'
import { AddSuperv } from './components/user/Admin/addusers/AddSuperv'
import { ViewSuperv } from './components/user/Admin/viewusers/ViewSuperv'
import { AddUndg } from './components/user/Admin/addusers/AddUndg'
import { ViewUndg } from './components/user/Admin/viewusers/ViewUndg'
import { AddCompany } from './components/user/Admin/addusers/AddCompany'
import { ViewCompany } from './components/user/Admin/viewusers/ViewCompany'
import { AddAlumini } from './components/user/Admin/addusers/AddAlumini'
import { ViewAlumini } from './components/user/Admin/viewusers/ViewAlumini'
import { Dialogbox } from './components/Dialogbox/Dialogbox'
import { Admin } from './components/shared/CreateUser/forms/Admin'
import Manageuser from './components/user/Admin/Manageuser'




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
          <Route exact path='/add-superv-details' element={<AddSuperv />} />
          <Route exact path='/view-superv-details' element={<ViewSuperv />} />
          <Route exact path='/add-undg-details' element={<AddUndg />} />
          <Route exact path='/view-undg-details' element={<ViewUndg />} />
          <Route exact path='/add-comp-details' element={<AddCompany />} />
          <Route exact path='/view-comp-details' element={<ViewCompany />} />
          <Route exact path='/add-alumini-details' element={<AddAlumini />} />
          <Route exact path='/view-alumini-details' element={<ViewAlumini />} />
          <Route exact path='/dialogbox' element={<Dialogbox title="Update Administrator"><Admin /></Dialogbox>} />

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
