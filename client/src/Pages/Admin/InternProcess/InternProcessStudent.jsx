import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Tile } from '../../../components/card/Tile';
import ProfileFormLine from '../../../components/Dashboard/ProfileFormLine';
import useFetch from '../../../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import InternDataGridMini from '../../../components/InternProcess/ViewTable/InternDataGridMini';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


const InternProcessStudent = () => {
  const [student, setStudent] = useState();
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState();
  const { studentId } = useParams();

  const { data: studentData } = useFetch('GET', `http://localhost:5000/api/v1/undergraduate/view-undergraduate-profile/${studentId}`);
  const { data: companyData } = useFetch("GET", 'http://localhost:5000/api/v1/company/intern-process-company-list', null);

  console.log(studentData);
  // const student = studentData && studentData.user;

  useEffect(() => {
    studentData && setStudent(studentData.user)
    companyData && setCompanies(companyData.companyList)
  }, [companyData, studentData]);
  console.log(companyData);

  const columnsLeft = [
    { field: 'name', headerName: 'Name', width: 180, headerClassName: 'data-grid-header' },
    { field: 'internSeats', headerName: 'Intern Seats', width: 130, headerClassName: 'data-grid-header' },
    { field: 'applicationListSize', headerName: 'List Size', width: 100, headerClassName: 'data-grid-header' },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      headerClassName: 'data-grid-header',
      // renderCell: (params) => (<Button onClick={() => handleAddStudent(params.row)} startIcon={<AddIcon />}>Add</Button>)
      renderCell: (params) => (<Button onClick={() => handleAddCompany(params.row)} startIcon={<AddIcon />} />)

    },
  ];

  const rowsLeft =
    companies &&
    companies.map((company) => {
      return {
        id: company._id,
        _id: company._id,
        name: company.name,
        internSeats: company.internSeats,
        applicationListSize: company.applicationListSize,
      };
    });

  const columnsRight = [
    { field: 'name', headerName: 'Name', width: 150, headerClassName: 'data-grid-header' },
    { field: 'internSeats', headerName: 'Intern Seats', width: 130, headerClassName: 'data-grid-header' },
    { field: 'applicationListSize', headerName: 'List Size', width: 100, headerClassName: 'data-grid-header' },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      headerClassName: 'data-grid-header',
      // renderCell: (params) => (<Button onClick={() => handleAddStudent(params.row)} startIcon={<AddIcon />}>Add</Button>)
      renderCell: (params) => (<Button type='close' onClick={() => handleRemoveCompany(params.row)} startIcon={<DeleteIcon />} />)

    },
  ];

  const rowsRight =
    selectedCompanies &&
    selectedCompanies.map((company) => {
      console.log(company);
      return {
        id: company._id,
        _id: company._id,
        name: company.name,
        internSeats: company.internSeats,
        applicationListSize: company.applicationListSize,
      };
    });

    const handleAddCompany = (company) => {
      if (selectedCompanies.length < 3) {
        setSelectedCompanies([...selectedCompanies, company]);
        setCompanies(companies.filter(c => c._id !== company.id));
      }
      else {
        setAlertOpen(true);
      }
    };

    const handleRemoveCompany = (company) => {
      console.log(typeof companies);
      setCompanies([...companies, company]);
      setSelectedCompanies(selectedCompanies.filter(c => c.id !== company.id));
    }

    const handleSave = async () => {
      // const res = await axios.post("http://localhost:5000/api/v1/company/update-company-intern-application-list", { companyId: company._id, candidateList: selectedStudents }, { withCredentials: true })
      // if (res) {
      //   setDialogData(res.data);
        setDialogOpen(true);
      }

  return (
    <Grid container spacing={1}>

      <Grid item xs={12}>
        <Typography variant="head3">Intern Process Student</Typography>
      </Grid>
      <Grid item xs={6}>
        {student && <Tile>
          <Typography variant="head4">Student Details</Typography>
          <ProfileFormLine title='Name' content={student.name} />
          <ProfileFormLine title='Registration No' content={student.regNo} />
          <ProfileFormLine title='GPA' content={student.gpa} />
          <ProfileFormLine title='Weighted GPA' content={student.weighedGPA} />
        </Tile>}
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} direction='row'>
          <Grid item xs={6}>
            <Tile>
              <InternDataGridMini
                users={companies && companies}
                rows={rowsLeft}
                columns={columnsLeft}
              />
            </Tile>
          </Grid>
          <Grid item xs={6}>
            <Tile>
              <InternDataGridMini
                users={selectedCompanies && selectedCompanies}
                rows={rowsRight}
                columns={columnsRight}
              />
              <br />
              <Button variant="contained" size="large" onClick={handleSave}>Save List</Button>
            </Tile>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default InternProcessStudent