import {RouterProvider} from 'react-router-dom'
import AuthState from './Context/Auth/AuthState';
import { Fragment } from 'react'
import ForgotPassword from './Pages/Shared/ForgotPassword/ForgotPassword'
import Sidebar from './components/Sidebar/Sidebar'


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>

      {/*add main pages here use path variable */}

      <Route path='/' element={<Layout />}>
        <Route path='manageuser' element={<Manageuser />}></Route>
        <Route path='addadmin' element={<AddAdmin />} />
        <Route path='add-superv-details' element={<AddSuperv />} />
        <Route path='add-undg-details' element={<AddUndg />} />
        <Route path='add-companySupervisor-details' element={<AddCompanySupervisor />} />
        <Route path='add-alumini-details' element={<AddAlumini />} />

        <Route path='view-admin-details' element={<ViewAdmin />} />
        <Route path='view-superv-details' element={<ViewSuperv />} />
        <Route path='view-undg-details' element={<ViewUndg />} />
        <Route path='view-comp-details' element={<ViewCompany />} />
        <Route path='view-alumini-details' element={<ViewAlumini />} />

        <Route path='updateNremove-admin-details' element={<UpdateNRemoveAdmin />} />
        <Route path='remove-multiple-admin' element={<RemoveMultipleAdmin />} />  {/*  Not used still in site */}
        <Route path='updateNremove-alumni-details' element={<UpdateNRemoveAlumni />} />
        <Route path='updateNremove-company-details' element={<UpdateNRemoveCompany />} />
        <Route path='updateNremove-undergraduate-details' element={<UpdateNRemoveUndergraduate />} />

        {/* student routes */}
        <Route path='student-dashboard' element={<StudentDashboard />} />
        <Route path='student-cvupdate' element={<StudentCvUpdate />}></Route>
        <Route path='student-company' element={<StudentCompany />} />
        <Route path='student-settings' element={<StudentSettings />} />
        <Route path='notice' element={<Notice />}></Route>
        <Route path='sidebar' element={<Sidebar />}></Route>
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
}

export default App;
