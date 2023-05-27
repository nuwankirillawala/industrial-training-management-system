import useFetch from '../../../Hooks/useFetch';
import { useEffect, useState } from 'react';
import InternDataGrid from '../../../components/InternProcess/ViewTable/InternDataGrid';
import { useParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';

const CompanyInternList = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const { companyId } = useParams();

    const { data } = useFetch('GET', `http://localhost:5000/api/v1/company/intern-process/company/${companyId}`)

    console.log('dattaaa', data.company && data.company.internApplications.applicationList);
    const users = data.company && data.company.internApplications.applicationList;
    // const users =[]

    const handleView = (candidate) => {
        const cvURL = candidate.cvURL;
        if (cvURL) {
            window.open(`http://localhost:5000/${cvURL}`, '_blank');
        } else {
            console.log('CV URL is not available for the candidate.');
            setOpenDialog(true);
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog box
    }

    const rows =
        users &&
        users.map((user) => {
            return {
                id: user.candidate.regNo,
                regNo: user.candidate.regNo,
                name: user.candidate.name,
                gpa: user.candidate.gpa,
                weightedGPA: user.candidate.weightedGPA,
                status: user.candidate.status,
                cvURL: user.candidate.cvURL,
            };
        });

    const columns = [
        { field: 'regNo', headerName: 'Registration No.', width: 180, headerClassName: 'data-grid-header' },
        { field: 'name', headerName: 'Name', width: 200, headerClassName: 'data-grid-header' },
        { field: 'gpa', headerName: 'GPA', type: 'number', width: 100, headerClassName: 'data-grid-header' },
        { field: 'weightedGPA', headerName: 'Weighted GPA', type: 'number', width: 150, headerClassName: 'data-grid-header' },
        { field: 'status', headerName: 'Status', width: 120, headerClassName: 'data-grid-header' },
        {
            field: 'view',
            headerName: '',
            width: 100,
            headerClassName: 'data-grid-header',
            renderCell: (params) => (<Button onClick={() => handleView(params.row)} startIcon={<ContactPageIcon />}>View CV</Button>)

        },
    ];

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'} marginBottom={1}>
                <Typography variant="head3">Intern Candidate List</Typography>
                <Button variant='itms'> Send Applications to Company</Button>
            </Stack>
            <InternDataGrid
                users={users && users}
                rows={rows}
                columns={columns}
            />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>CV Not Available</DialogTitle>
                <DialogContent>
                    <p>Candidate has not uploaded CV! Please inform him/her.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CompanyInternList;