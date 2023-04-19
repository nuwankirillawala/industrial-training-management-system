import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { RootLayout } from './components/Layout/RootLayout'
import { StudentCvUpdate } from './Pages/Undergraduate/StudentCvUpdate'
import { StudentSettings } from './Pages/Undergraduate/StudentSettings'
import { StudentDashboard } from './Pages/Undergraduate/StudentDashboard'
import { StudentCompany } from './Pages/Undergraduate/StudentCompany'
import { Manageuser } from './Pages/Admin/UserCRUD/ManageUser'
import Dialogbox from './components/Dialogbox/Dialogbox'
import { AddAdmin } from './components/user/Admin/addUsers/AddAdmin'
import { AddSuperv } from './components/user/Admin/addUsers/AddSuperv'
import { AddUndg } from './components/user/Admin/addUsers/AddUndg'
import { AddCompanySupervisor } from './components/user/Admin/addUsers/AddCompanySupervisor'
import { AddAlumini } from './components/user/Admin/addUsers/AddAlumini'
import { ViewAdmin } from './components/user/Admin/viewUsers/ViewAdmin'
import { ViewSuperv } from './components/user/Admin/viewUsers/ViewSuperv'
import { ViewUndg } from './components/user/Admin/viewUsers/ViewUndg'
import { ViewCompany } from './components/user/Admin/viewUsers/ViewCompany'
import { ViewAlumini } from './components/user/Admin/viewUsers/ViewAlumini'
import { UpdateNRemoveAdmin } from './components/user/Admin/updateNremoveUsers/UpdateNRemoveAdmin'
import { RemoveMultipleAdmin } from './components/user/Admin/RemoveMultipleUsers/RemoveMultipleAdmin'
import { UpdateNRemoveAlumni } from './components/user/Admin/updateNremoveUsers/UpdateNRemoveAlumni'
import { UpdateNRemoveCompany } from './components/user/Admin/updateNremoveUsers/UpdateNRemoveCompany'
import { UpdateNRemoveUndergraduate } from './components/user/Admin/updateNremoveUsers/UpdateNRemoveUndergraduate'
import Notice from './components/shared/Notice/Notice'

// Importing Pages
import Login from './Pages/Shared/Login/Login';
import Test from './components/Testing/Test';
import ForgotPassword from './Pages/Shared/ForgotPassword/ForgotPassword'
import Sidebar from './components/Sidebar/Sidebar'

import * as Admin from './Pages/Admin';


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

            {/* Admin Routes  */}
            <Route path='add-admin' element={<Admin.AddAdmin />} />
            <Route path='add-alumni' element={<Admin.AddAlumni />} />
            <Route path='add-department-coordinator' element={<Admin.AddDepartmentCoordinator />} />
            <Route path='add-student' element={<Admin.AddStudent />} />
            <Route path='add-supervisor' element={<Admin.AddSupervisor />} />
            <Route path='update-admin' element={<Admin.UpdateAdmin />} />
            <Route path='update-alumni' element={<Admin.UpdateAlumni />} />
            <Route path='update-department-coordinator' element={<Admin.UpdateDepartmentCoordinator />} />
            <Route path='update-student' element={<Admin.UpdateStudent />} />
            <Route path='update-supervisor' element={<Admin.UpdateSupervisor />} />
            <Route path='view-admin' element={<Admin.ViewAdmin />} />
            <Route path='view-alumni' element={<Admin.ViewAlumni />} />
            <Route path='view-department-coordinator' element={<Admin.ViewDepartmentCoordinator />} />
            <Route path='view-student' element={<Admin.ViewStudent />} />
            <Route path='view-supervisor' element={<Admin.ViewSupervisor />} />
            <Route path='manage-user' element={<Admin.ManageUser />} />
            <Route path='user-created' element={<Admin.UserCreated />} />
            <Route path='alumni-list' element={<Admin.AlumniList />} />
            <Route path='add-company' element={<Admin.AddCompany />} />
            <Route path='company-created' element={<Admin.CompanyCreated />} />
            <Route path='manage-company' element={<Admin.ManageCompany />} />
            <Route path='view-company' element={<Admin.ViewCompany />} />
            <Route path='company-intern-list' element={<Admin.CompanyInternList />} />
            <Route path='intern-process-company' element={<Admin.InternProcessCompany />} />
            <Route path='intern-process-student' element={<Admin.InternProcessStudent />} />
            <Route path='intern-process-type' element={<Admin.InternProcessType />} />
            <Route path='view-intern-list' element={<Admin.ViewInternList />} />
            <Route path='view-intern-list-remain' element={<Admin.ViewInternListRemain />} />
            <Route path='daily-report' element={<Admin.DailyReport />} />
            <Route path='daily-report-list' element={<Admin.DailyReportList />} />
            <Route path='final-feedback' element={<Admin.FinalFeedback />} />
            <Route path='final-feedback-list' element={<Admin.FinalFeedbackList />} />
            <Route path='report-portal' element={<Admin.ReportPortal />} />
            <Route path='upload-result-sheet' element={<Admin.UploadResultsheet />} />
            <Route path='view-result-sheet' element={<Admin.ViewResultsheet />} />
            <Route path='assign-supervisor-for-intern' element={<Admin.AssignSupervisorForIntern />} />
            <Route path='supervisor-list' element={<Admin.SupervisorList />} />




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

export { router };