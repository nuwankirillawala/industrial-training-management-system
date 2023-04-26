import useFetch from '../../../Hooks/useFetch';
import { useEffect, useState } from 'react';
import InternDataGrid from '../../../components/InternProcess/ViewTable/InternDataGrid';

const ViewInternListRemain = () => {
  const { data } = useFetch('GET', 'http://localhost:5000/api/v1/undergraduate/view-intern-list', null);
  const users = data.users;


  const rows =
    users &&
    users.map((user) => {
      return {
        id: user.regNo,
        regNo: user.regNo,
        name: user.name,
        gpa: user.gpa,
        weightedGPA: user.weightedGPA,
        status: user.status,
      };
    });

  const columns = [
    { field: 'regNo', headerName: 'Registration No.', width: 180, headerClassName: 'data-grid-header' },
    { field: 'name', headerName: 'Name', width: 200, headerClassName: 'data-grid-header' },
    { field: 'gpa', headerName: 'GPA', type: 'number', width: 100, headerClassName: 'data-grid-header' },
    { field: 'weightedGPA', headerName: 'Weighted GPA', type: 'number', width: 150, headerClassName: 'data-grid-header' },
    { field: 'status', headerName: 'Status', width: 120, headerClassName: 'data-grid-header' },
  ];

  return (
    <InternDataGrid 
    heading="Remain Intern Candidate List"
    users={users && users}
    rows={rows}
    columns={columns}
    />
  );
};

export default ViewInternListRemain;