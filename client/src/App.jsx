import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
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
import Manageuser from './components/user/Admin/Manageuser'
import { RootLayout } from './components/Layout/RootLayout'


function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <ThemeProvider theme={theme}>
  //     <Router>
  //       <Routes>
  //         <Route exact path='/' element={<Login />} />
  //         <Route exact path='/navbar' element={<Navbar />} />
  //         <Route exact path='/sidebar' element={<Sidebar />} />
  //         <Route exact path='/create-user' element={<CreateUser />} />
  //         <Route exact path='/basiccard' element={<BasicCard />} />
  //         <Route exact path='/user-profile' element={<UserProfile />} />
  //         <Route exact path='/stddash' element={<StdDashboard />} />
  //         {/* <Route exact path='/stdcompany' element={<StdCompnay />} /> */}
  //         <Route exact path='/layout' element={<Layout />} />
  //         <Route exact path='/cvupdate' element={<CvUpdate />} />
  //         <Route exact path='/manageuser' element={<Manageuser />} />

  //       </Routes>
  //     </Router>
  //   </ThemeProvider>
  // )

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element= { <RootLayout/> }>
      <Route path='/' element= { <Layout/> }>
        <Route path='cvupdate' element= { <CvUpdate/> }></Route>
        <Route path='manageuser' element={ <Manageuser/> }></Route>
      </Route>
      <Route path='/'>
        <Route path='login' element={ <Login/> }></Route>
      </Route>

    </Route>
  ))

    return (
      <>
        <RouterProvider router={router}/>
      </>
    )
}

export default App
