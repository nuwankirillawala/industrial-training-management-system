import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Login } from './components/Login/Login'
import { Layout } from './components/Layout/Layout'
import { RootLayout } from './components/Layout/RootLayout'
import { StudentCvUpdate } from './Pages/Undergraduate/StudentCvUpdate'
import { Manageuser } from './Pages/Admin/Manageuser'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element= { <RootLayout/> }>

      {/*add main pages hete use path variable */}

      <Route path='/' element= { <Layout/> }>
        <Route path='cvupdate' element= { <StudentCvUpdate/> }></Route>
        <Route path='manageuser' element={ <Manageuser/> }></Route>
      </Route>

      {/*login page*/}

      <Route path='/'>
        <Route path='login' element={ <Login/> }></Route>
      </Route>
      
      {/*test your components here*/}

      <Route path='/'>
        <Route path='testcvupdate' element={ <StudentCvUpdate/> }></Route>
      </Route>

    </Route>
  ))

    return (
      <>
        <RouterProvider router={router}/>
      </>
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
//           <Route exact path='/addadmin' element={<AddAdmin />} />
//           <Route exact path='/view-admin-details' element={<ViewAdmin />} />
//           <Route exact path='/add-superv-details' element={<AddSuperv />} />
//           <Route exact path='/view-superv-details' element={<ViewSuperv />} />
//           <Route exact path='/add-undg-details' element={<AddUndg />} />
//           <Route exact path='/view-undg-details' element={<ViewUndg />} />
//           <Route exact path='/add-comp-details' element={<AddCompany />} />
//           <Route exact path='/view-comp-details' element={<ViewCompany />} />
//           <Route exact path='/add-alumini-details' element={<AddAlumini />} />
//           <Route exact path='/view-alumini-details' element={<ViewAlumini />} />
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
