import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { RootLayout } from "./components/Layout/RootLayout";
import { StudentCvUpdate } from "./Pages/Undergraduate/StudentCvUpdate";
import { StudentSettings } from "./Pages/Undergraduate/StudentSettings";
import { StudentDashboard } from "./Pages/Undergraduate/StudentDashboard";
import { StudentCompany } from "./Pages/Undergraduate/StudentCompany";
import Dialogbox from "./components/Dialogbox/Dialogbox";
import { RemoveMultipleAdmin } from "./components/user/Admin/RemoveMultipleUsers/RemoveMultipleAdmin";
import { ManageCompany } from "./Pages/Admin/ManageCompany";
import Notice from "./components/shared/Notice/Notice";
import { AdminDashboard } from "./Pages/Admin/Dashboard/AdminDashboard";
//import { AddCompany } from './components/user/Admin/addCompany/AddCompany'
import { DailyReportForm } from "./components/DailyReportForm/DailyReportForm";
// Importing Pages
import Login from "./Pages/Shared/Login/Login";
import Test from "./components/Testing/Test";
import ForgotPassword from "./Pages/Shared/ForgotPassword/ForgotPassword";
import Sidebar from "./components/Sidebar/Sidebar";
import * as Admin from "./Pages/Admin";
import { DepartmentStudentProfile } from "./Pages/Department/DepartmentStudentProfile";
import NoticeForm from "./components/shared/Notice/NoticeForm";
import DeleteNotice from "./components/shared/Notice/DeleteNotice";
import InternApplicationMenu from "./Pages/Undergraduate/InternApplication/InternApplicationMenu";
import ViewAllCompanies from "./Pages/Admin/Company/ViewAllComapnies";
import { SupervisorDashboard } from "./Pages/Supervisor/SupervisorDashboard";
import { StudentReportPortal } from "./Pages/Undergraduate/ReportSubmission/StudentReportPortel";
import { Internship } from "./Pages/Undergraduate/Internship/Internship";
import { InternStatus } from "./Pages/Undergraduate/InternStatus/InternStatus";
import { CVUpload } from "./Pages/Undergraduate/CVUpload";
import { ReportPortalSupervisor } from "./Pages/Supervisor/ReportSubmission/ReportPortalSupervisor";
import { ShowStudentResults } from "./components/user/Department/ShowStudentResults";
import { StudentShowResult } from "./Pages/Undergraduate/StudentShowResult";
import PrivateNotePanel from "./Pages/Undergraduate/PrivateNotePanel";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/*add main pages here use path variable */}

      <Route path="/" element={<Layout />}>
        <Route path="remove-multiple-admin" element={<RemoveMultipleAdmin />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="manage-company" element={<ManageCompany />} />
        {/* <Route path='add-company' element={<AddCompany />} /> */}
        <Route
          path="department-studentprofile"
          element={<DepartmentStudentProfile />}
        />
        <Route path="noticeform" element={<NoticeForm />} />
        <Route path="deletenotices" element={<DeleteNotice />} />

        {/* student routes */}
        <Route path="student-dashboard" element={<StudentDashboard />} />
        <Route path="student-aditional" element={<StudentCvUpdate />} />
        <Route path="student-cvupload" element={<CVUpload />} />
        <Route path="student-company" element={<StudentCompany />} />
        <Route path="student-settings" element={<StudentSettings />} />
        <Route path="student-showresult" element={<StudentShowResult />} />
        <Route path="notice" element={<Notice />} />
        <Route path="sidebar" element={<Sidebar />} />
        <Route
          path="intern-application/menu"
          element={<InternApplicationMenu />}
        />
        <Route path="company/all" element={<ViewAllCompanies />} />
        <Route path="student-report" element={<StudentReportPortal />} />
        <Route path="student-internship" element={<Internship />} />
        <Route path="student-internstatus" element={<InternStatus />} />
        <Route path="private-note" element={<PrivateNotePanel />} />

        {/* Supervisor */}
        <Route path="supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route
          path="supervisor-report-portal"
          element={<ReportPortalSupervisor />}
        />

        {/* Admin Routes  */}
        <Route path="admin/add" element={<Admin.AddAdmin />} />
        <Route path="alumni/add" element={<Admin.AddAlumni />} />
        <Route
          path="department-coordinator/add"
          element={<Admin.AddDepartmentCoordinator />}
        />
        <Route path="student/add" element={<Admin.AddStudent />} />
        <Route path="supervisor/add" element={<Admin.AddSupervisor />} />

        <Route path="admin/update" element={<Admin.UpdateAdmin />} />
        <Route path="alumni/update" element={<Admin.UpdateAlumni />} />
        <Route
          path="department-coordinator/update"
          element={<Admin.UpdateDepartmentCoordinator />}
        />
        <Route path="student/update" element={<Admin.UpdateStudent />} />
        <Route path="supervisor/update" element={<Admin.UpdateSupervisor />} />

        <Route path="admin/view" element={<Admin.ViewAdmin />} />
        <Route path="alumni/view" element={<Admin.ViewAlumni />} />
        <Route
          path="department-coordinator/view"
          element={<Admin.ViewDepartmentCoordinator />}
        />
        <Route path="student/view" element={<Admin.ViewStudent />} />
        <Route path="supervisor/view" element={<Admin.ViewSupervisor />} />

        <Route path="manage-user" element={<Admin.ManageUser />} />
        <Route path="user-created" element={<Admin.UserCreated />} />

        <Route path="alumni-list" element={<Admin.AlumniList />} />

        <Route path="company/add" element={<Admin.AddCompany />} />
        <Route path="company-created" element={<Admin.CompanyCreated />} />
        <Route path="company/manage" element={<Admin.ManageCompany />} />
        <Route path="company/view" element={<Admin.ViewCompany />} />
        <Route
          path="company/intern-list"
          element={<Admin.SelectCompanyInternList />}
        />
        <Route
          path="company/intern-list/:companyId"
          element={<Admin.CompanyInternList />}
        />

        <Route
          path="intern-process/type"
          element={<Admin.InternProcessType />}
        />
        <Route
          path="intern-process/company/select"
          element={<Admin.SelectCompany />}
        />
        <Route
          path="intern-process/student/select"
          element={<Admin.SelectStudent />}
        />
        <Route
          path="intern-process/company/:companyId"
          element={<Admin.InternProcessCompany />}
        />
        <Route
          path="intern-process/student/:studentId"
          element={<Admin.InternProcessStudent />}
        />
        <Route
          path="intern-process/intern-list"
          element={<Admin.ViewInternList />}
        />
        <Route
          path="intern-process/intern-list/remain"
          element={<Admin.ViewInternListRemain />}
        />

        <Route path="daily-report" element={<Admin.DailyReport />} />
        <Route path="report-list" element={<Admin.ReportList />} />
        <Route path="final-feedback" element={<Admin.FinalFeedback />} />
        <Route
          path="final-feedback-list"
          element={<Admin.FinalFeedbackList />}
        />
        <Route path="report-portal" element={<Admin.ReportPortal />} />

        <Route
          path="result-sheet/upload"
          element={<Admin.UploadResultsheet />}
        />
        <Route path="result-sheet/view" element={<Admin.ViewResultsheet />} />

        <Route
          path="assign-supervisor-for-intern"
          element={<Admin.AssignSupervisorForIntern />}
        />
        <Route path="supervisor-list" element={<Admin.SupervisorList />} />

        <Route path="student/profile" element={<Admin.StudentProfile />} />

        {/* end of admin routes */}
      </Route>

      {/*login page*/}

      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/*test your components here*/}

      <Route path="/">
        <Route path="testcvupdate" element={<StudentCvUpdate />} />
        <Route
          path="dialogbox"
          element={
            <Dialogbox title="Title here" btn_name="default name">
              keep Children's here while calling
            </Dialogbox>
          }
        ></Route>
        <Route path="testnotice" element={<Notice />} />
        <Route path="test" element={<Test />} />
        <Route path="testsidebar" element={<Sidebar />} />
        <Route path="daily-report-form" element={<DailyReportForm />} />
        <Route path="testnoticeform" element={<NoticeForm />} />
        <Route path="testdeletenotices" element={<DeleteNotice />} />
      </Route>
    </Route>
  )
);

export { router };
