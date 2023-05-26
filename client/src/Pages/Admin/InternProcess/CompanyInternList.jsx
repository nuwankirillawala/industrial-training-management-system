import { Button } from '@mui/material';
import useFetch from '../../../Hooks/useFetch';
import InternDataGridCompany from '../../../components/InternProcess/ViewTable/InternDataGridCompany';
import SendIcon from '@mui/icons-material/Send';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from 'react-router-dom';


const CompanyInternList = () => {
  const { data } = useFetch('GET', 'http://localhost:5000/api/v1/company/intern-process/company-list', null);
  const companies = data;

  const navigate = useNavigate();

  const handleView = (company) => {
    navigate(`/intern-process/c/${company.id}`)
  }
  
  const handleSend = (company) => {
    navigate(`/intern-process/c/${company.id}`)
  }

  const rows =
    companies &&
    companies.map((company) => {
      const listSizeCurrent = company.internApplications.applicationList.length;
      return {
        id: company._id,
        name: company.name,
        email: company.email,
        contactNo: company.internSeats,
        internSeats: company.internSeats,
        listSizeTotal: company.internApplications.applicationListSize,
        listSizeCurrent: listSizeCurrent,
        listStatus: company.internApplications.listStatus,

      };
    });

  const columns = [
    { field: 'name', headerName: 'Name', width: 150, headerClassName: 'data-grid-header' },
    { field: 'email', headerName: 'email', width: 150, headerClassName: 'data-grid-header' },
    { field: 'conatctNo', headerName: 'contactNo', width: 100, headerClassName: 'data-grid-header' },
    { field: 'internSeats', headerName: 'Intern Seats', width: 100, headerClassName: 'data-grid-header' },
    { field: 'listSizeTotal', headerName: 'Total List Size', width: 150, headerClassName: 'data-grid-header' },
    { field: 'listSizeCurrent', headerName: 'Filled List Size', width: 150, headerClassName: 'data-grid-header' },
    { field: 'listStatus', headerName: 'Intern List Status', width: 150, headerClassName: 'data-grid-header' },
    {
      field: 'view',
      headerName: '',
      width: 100,
      headerClassName: 'data-grid-header',
      renderCell: (params) => (<Button onClick={() => handleView(params.row)} endIcon={<ViewListIcon />}>View</Button>)
      // renderCell: (params) => (<Button type='close' onClick={() => handleRemoveStudent(params.row)} startIcon={<DeleteIcon />} />)

    },
    {
      field: 'action',
      headerName: '',
      width: 150,
      headerClassName: 'data-grid-header',
      renderCell: (params) => (<Button onClick={() => handleSend(params.row)} endIcon={<SendIcon />}>Send</Button>)
      // renderCell: (params) => (<Button type='close' onClick={() => handleRemoveStudent(params.row)} startIcon={<DeleteIcon />} />)

    },
  ];

  return (
    <InternDataGridCompany
      heading="Intern Connected Companies"
      companies={companies && companies}
      rows={rows}
      columns={columns}
    />
  );
};

export default CompanyInternList;