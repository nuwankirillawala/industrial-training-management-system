// import './App.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { RootLayout } from "./components/Layout/RootLayout";
import { StudentCvUpdate } from "./Pages/Undergraduate/StudentCvUpdate";
import { StudentSettings } from "./Pages/Undergraduate/StudentSettings";
import { StudentDashboard } from "./Pages/Undergraduate/StudentDashboard";
import { StudentCompany } from "./Pages/Undergraduate/StudentCompany";
import { Manageuser } from "./Pages/Admin/Manageuser";
import Dialogbox from "./components/Dialogbox/Dialogbox";

import { AddAdmin } from "./components/user/Admin/addUsers/AddAdmin";
import { AddSuperv } from "./components/user/Admin/addUsers/AddSuperv";
import { AddUndg } from "./components/user/Admin/addUsers/AddUndg";
import { AddCompanySupervisor } from "./components/user/Admin/addUsers/AddCompanySupervisor";
import { AddAlumini } from "./components/user/Admin/addUsers/AddAlumini";
import { ViewAdmin } from "./components/user/Admin/viewUsers/ViewAdmin";
import { ViewSuperv } from "./components/user/Admin/viewUsers/ViewSuperv";
import { ViewUndg } from "./components/user/Admin/viewUsers/ViewUndg";
import { ViewCompany } from "./components/user/Admin/viewUsers/ViewCompany";
import { ViewAlumini } from "./components/user/Admin/viewUsers/ViewAlumini";
import { UpdateNRemoveAdmin } from "./components/user/Admin/updateNremoveUsers/UpdateNRemoveAdmin";
import { RemoveMultipleAdmin } from "./components/user/Admin/RemoveMultipleUsers/RemoveMultipleAdmin";
import { UpdateNRemoveAlumni } from "./components/user/Admin/updateNremoveUsers/UpdateNRemoveAlumni";
import { UpdateNRemoveCompany } from "./components/user/Admin/updateNremoveUsers/UpdateNRemoveCompany";
import { UpdateNRemoveUndergraduate } from "./components/user/Admin/updateNremoveUsers/UpdateNRemoveUndergraduate";
import Notice from "./components/shared/Notice/Notice";

// Importing Pages
import Login from "./Pages/Shared/Login/Login";
import Test from "./components/Testing/Test";

import AuthState from "./Context/Auth/AuthState";
import { Fragment } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { EnglishProficiency } from "./components/user/Undergraduate/studentCV/EnglishProficiency";
import { ProgrammingLanguages } from "./components/user/Undergraduate/studentCV/ProgrammingLanguages";
import { DepartmentShowStudentProfile } from "./components/user/Department/DepartmentShowStudentProfile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/*add main pages here use path variable */}

        <Route path="/" element={<Layout />}>
          <Route path="manageuser" element={<Manageuser />}></Route>
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="add-superv-details" element={<AddSuperv />} />
          <Route path="add-undg-details" element={<AddUndg />} />
          <Route
            path="add-companySupervisor-details"
            element={<AddCompanySupervisor />}
          />
          <Route path="add-alumini-details" element={<AddAlumini />} />
          <Route path="view-admin-details" element={<ViewAdmin />} />
          <Route path="view-superv-details" element={<ViewSuperv />} />
          <Route path="view-undg-details" element={<ViewUndg />} />
          <Route path="view-comp-details" element={<ViewCompany />} />
          <Route path="view-alumini-details" element={<ViewAlumini />} />
          <Route
            path="updateNremove-admin-details"
            element={<UpdateNRemoveAdmin />}
          />
          <Route
            path="remove-multiple-admin"
            element={<RemoveMultipleAdmin />}
          />{" "}
          {/*  Not used still in site */}
          <Route
            path="updateNremove-alumni-details"
            element={<UpdateNRemoveAlumni />}
          />
          <Route
            path="updateNremove-company-details"
            element={<UpdateNRemoveCompany />}
          />
          <Route
            path="updateNremove-undergraduate-details"
            element={<UpdateNRemoveUndergraduate />}
          />
          {/* student routes */}
          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path="student-cvupdate" element={<StudentCvUpdate />}></Route>
          <Route path="student-company" element={<StudentCompany />} />
          <Route path="student-settings" element={<StudentSettings />} />
          <Route path="notice" element={<Notice />}></Route>
          <Route path="sidebar" element={<Sidebar />}></Route>

          <Route path="department-studentprofile" element={<DepartmentShowStudentProfile />}></Route>
        </Route>

        {/*login page*/}

        <Route path="/">
          <Route path="login" element={<Login />}></Route>
        </Route>

        {/*test your components here*/}

        <Route path="/">
          <Route path="testcvupdate" element={<StudentCvUpdate />}></Route>
          <Route
            path="dialogbox"
            element={
              <Dialogbox title="Title here" btn_name="default name">
                keep Children's here while calling
              </Dialogbox>
            }
          ></Route>
          <Route path="testnotice" element={<Notice />}></Route>
          <Route path="test" element={<Test />}></Route>
          <Route path="testsidebar" element={<Sidebar />}></Route>
          <Route path="testcvform" element={<EnglishProficiency />}></Route>
          <Route
            path="testlanguages"
            element={<ProgrammingLanguages />}
          ></Route>
        </Route>
      </Route>
    )
  );

  return (
    <AuthState>
      <Fragment>
        <RouterProvider router={router} />
      </Fragment>
    </AuthState>
  );
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

export default App;
