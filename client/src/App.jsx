// import './App.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { RootLayout } from './components/Layout/RootLayout'
import { StudentCvUpdate } from './Pages/Undergraduate/StudentCvUpdate'
import { StudentSettings } from './Pages/Undergraduate/StudentSettings'
import { StudentDashboard } from './Pages/Undergraduate/StudentDashboard'
import { StudentCompany } from './Pages/Undergraduate/StudentCompany'
import { Manageuser } from './Pages/Admin/Manageuser'
import Dialogbox from './components/Dialogbox/Dialogbox'

import { AddAdmin } from './components/user/Admin/addUsers/AddAdmin'
import { AddUndergraduate } from './components/user/Admin/addUsers/AddUndergraduate'
import { AddCompanySupervisor } from './components/user/Admin/addUsers/AddCompanySupervisor'
import { AddAlumini } from './components/user/Admin/addUsers/AddAlumini'
import { ViewAdmin } from './components/user/Admin/viewUsers/ViewAdmin'
import { ViewSupervisor } from './components/user/Admin/viewUsers/ViewSupervisor'
import { ViewUndergraduate } from './components/user/Admin/viewUsers/ViewUndergraduate'
import { ViewCompanySupervisor } from './components/user/Admin/viewUsers/ViewCompanySupervisor'
import { ViewAlumini } from './components/user/Admin/viewUsers/ViewAlumini'
import { UpdateNRemoveAdmin } from './components/user/Admin/updateNremoveUsers/UpdateNRemoveAdmin'
import { RemoveMultipleAdmin } from './components/user/Admin/RemoveMultipleUsers/RemoveMultipleAdmin'
import { UpdateNRemoveAlumni } from './components/user/Admin/updateNremoveUsers/UpdateNRemoveAlumni'
import { UpdateNRemoveCompanySupervisor } from './components/user/Admin/updateNremoveUsers/UpdateNRemoveCompanySupervisor'
import { ManageCompany } from './Pages/Admin/ManageCompany'
import { UpdateNRemoveUndergraduate } from './components/user/Admin/updateNremoveUsers/UpdateNRemoveUndergraduate'
import Notice from './components/shared/Notice/Notice'
import { AdminDashboard } from './Pages/Admin/AdminDashboard'
import { AddCompany } from './components/user/Admin/addCompany/AddCompany'
// Importing Pages
import Login from './Pages/Shared/Login/Login';
import Test from './components/Testing/Test';

import AuthState from './Context/Auth/AuthState';
import { Fragment } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import ForgotPassword from './Pages/Shared/ForgotPassword/ForgotPassword'
import { ProgrammingLanguages } from "./components/user/Undergraduate/studentCV/ProgrammingLanguages";
import { EnglishProficiency } from "./components/user/Undergraduate/studentCV/EnglishProficiency";
import { AlumniSettings } from './Pages/Alumni/AlumniSettings'
import { AdminSettings } from './Pages/Admin/AdminSettings'
import { SupervisorSettings } from './Pages/Supervisor/SupervisorSettings'
import { DepartmentSettings } from './Pages/Department/DepartmentSettings'
import { DepartmentStudentProfile } from './Pages/Department/DepartmentStudentProfile'
import { NoticeBoard } from './components/Notice/NoticeBoard'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>

      {/*add main pages here use path variable */}

      <Route path="/" element={<Layout />}>
        <Route path="manageuser" element={<Manageuser />}></Route>
        <Route path="addadmin" element={<AddAdmin />} />
        <Route path="add-undergraduate-details" element={<AddUndergraduate />} />
        <Route path="add-companySupervisor-details" element={<AddCompanySupervisor />} />
        <Route path="add-alumini-details" element={<AddAlumini />} />
        <Route path="view-admin-details" element={<ViewAdmin />} />
        <Route path="view-superv-details" element={<ViewSupervisor />} />
        <Route path="view-undg-details" element={<ViewUndergraduate />} />
        <Route path="view-comp-details" element={<ViewCompanySupervisor />} />
        <Route path="view-alumini-details" element={<ViewAlumini />} />
        <Route path="updateNremove-admin-details" element={<UpdateNRemoveAdmin />} />
        <Route path="remove-multiple-admin" element={<RemoveMultipleAdmin />} />
        <Route path="updateNremove-alumni-details" element={<UpdateNRemoveAlumni />} />
        <Route path="updateNremove-undergraduate-details" element={<UpdateNRemoveUndergraduate />} />
        <Route path="updateNremove-companySupervisor-details" element={<UpdateNRemoveCompanySupervisor />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="manage-company" element={<ManageCompany />} />
        <Route path="add-company" element={<AddCompany />} />

        {/* student routes */}
        <Route path="student-dashboard" element={<StudentDashboard />} />
        <Route path="student-cvupdate" element={<StudentCvUpdate />}></Route>
        <Route path="student-company" element={<StudentCompany />} />
        <Route path="student-settings" element={<StudentSettings />} />
        <Route path="notice" element={<Notice />}></Route>
        <Route path="sidebar" element={<Sidebar />}></Route>

        <Route path="alumni-settings" element={<AlumniSettings />} />
        <Route path="admin-settings" element={<AdminSettings />} />
        <Route path="supervisor-settings" element={<SupervisorSettings />} />
        <Route path="department-settings" element={<DepartmentSettings />} />
        <Route path="department-studentprofile" element={<DepartmentStudentProfile />} />
      
      </Route>

      {/*login page*/}

      <Route path='/'>
        <Route path='login' element={<Login />}></Route>
        <Route path='forgot-password' element={<ForgotPassword />}></Route>
      </Route>

      {/*test your components here*/}

      <Route path='/'>
        <Route path='testcvupdate' element={<StudentCvUpdate />}></Route>
        <Route path='dialogbox' element={<Dialogbox title="Title here" btn_name="default name">keep Children's here while calling</Dialogbox>}></Route>
        <Route path='testnotice' element={<Notice />}></Route>
        <Route path='test' element={<Test />}></Route>
        <Route path='testsidebar' element={<Sidebar />}></Route>
        <Route path='noticeboard' element={<NoticeBoard />}></Route>
      </Route>

    </Route>
  ))

  return (
    <AuthState>
      <Fragment>
        <RouterProvider router={router} />
      </Fragment>
    </AuthState>
  )
  //   return (
  //     <ThemeProvider theme={theme}>
  //       <Router>
  //         <Routes>
  //           <Route exact path='/' element={<Login />} />
  //           <Route exact path='/navbar' element={<Navbar />} />
  //           <Route exact path='/sidebar' element={<Sidebar />} />
  //           <Route exact path='/create-user' element={<CreateUser />} />
  //           <Route exact path='/basiccard' element={<BasicCard />} />
  //           <Route exact path='/user-profile' element={<UserProfile />} />
  //           <Route exact path='/stddash' element={<StdDashboard />} />
  //           {/* <Route exact path='/stdcompany' element={<StdCompnay />} /> */}
  //           <Route exact path='/layout' element={<Layout />} />
  //           <Route exact path='/cvupdate' element={<CvUpdate />} />
  //           <Route exact path='/manageuser' element={<Manageuser />} />  
  //           <Route exact path='/dialogbox' element={<Dialogbox title="Update Administrator"><Admin /></Dialogbox>} />
  //           <Route exact path='/' element={<Login/>}/>
  //           <Route exact path='/navbar' element={<Navbar/>}/> 
  //           <Route exact path='/sidebar' element={<Sidebar/>}/>
  //           <Route exact path='/create-user' element={<CreateUser/>}/> 
  //           <Route exact path='/basiccard' element={<BasicCard/>}/> 
  //           <Route exact path='/user-profile' element={<UserProfile />} />
  //           <Route exact path='/stddash' element={<StudentDashboard />} />
  //           <Route exact path='/stdcompany' element={<StudentCompnay />} />
  //           <Route exact path='/layout' element={<Layout />} />

  //           <Route exact path='/adminform' element={<Admin />} />
  //           <Route exact path='/aluminiform' element={<Alumini />} />
  //           <Route exact path='/companyform' element={<Company />} />
  //           <Route exact path='/supervisorform' element={<Supervisor />} />
  //           <Route exact path='/undergraduateform' element={<Undergraduate />} />
  //         <Route exact path='/notice' element={<Notice />} />

  //         </Routes>
  //       </Router>
  //     </ThemeProvider>
  //   )
}

export default App
