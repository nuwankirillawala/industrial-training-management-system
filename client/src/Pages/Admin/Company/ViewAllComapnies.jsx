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
import MiniCardType2 from '../../../components/InternProcess/MiniCardType2';


const ViewAllCompanies = () => {
    const [companies, setCompanies] = useState([]);

    const { data: companyData } = useFetch("GET", 'http://localhost:5000/api/v1/company/all', null);

    useEffect(() => {
        companyData && setCompanies(companyData.companyList)
    }, [companyData]);
    console.log(companyData);

    const columns = [
        { field: 'name', headerName: 'Name', width: 180, headerClassName: 'data-grid-header' },
        { field: 'email', headerName: 'Email', width: 100, headerClassName: 'data-grid-header' },

        { field: 'total', headerName: 'Total Rating', width: 130, headerClassName: 'data-grid-header' },
        { field: 'culture', headerName: 'Culture', width: 130, headerClassName: 'data-grid-header' },
        { field: 'work_life', headerName: 'Work-life balance', width: 130, headerClassName: 'data-grid-header' },
        { field: 'oppertunities', headerName: 'Opportunities for growth', width: 130, headerClassName: 'data-grid-header' },
        { field: 'salary', headerName: 'Salary and benefits', width: 130, headerClassName: 'data-grid-header' },
        { field: 'location', headerName: 'Location', width: 130, headerClassName: 'data-grid-header' },
        { field: 'projects', headerName: 'Projects', width: 130, headerClassName: 'data-grid-header' },
        { field: 'mentorship', headerName: 'Mentorship', width: 130, headerClassName: 'data-grid-header' },
        { field: 'reputation', headerName: 'Reputation', width: 130, headerClassName: 'data-grid-header' },
        { field: 'industry', headerName: 'Industry', width: 130, headerClassName: 'data-grid-header' },
        { field: 'technology', headerName: 'Technology', width: 130, headerClassName: 'data-grid-header' },
        { field: 'team_size', headerName: 'Team Size', width: 130, headerClassName: 'data-grid-header' },
        { field: 'values', headerName: 'Company Values', width: 130, headerClassName: 'data-grid-header' },
        { field: 'mission', headerName: 'Mission', width: 130, headerClassName: 'data-grid-header' },
        { field: 'support', headerName: 'Support', width: 130, headerClassName: 'data-grid-header' },
        { field: 'experience', headerName: 'Experience', width: 130, headerClassName: 'data-grid-header' },
        {
            field: 'action',
            headerName: 'See more',
            width: 100,
            headerClassName: 'data-grid-header',
            // renderCell: (params) => (<Button onClick={() => handleAddStudent(params.row)} startIcon={<AddIcon />}>Add</Button>)
            renderCell: (params) => (<Button onClick={() => handleClick(params.row)} startIcon={<AddIcon />} />)
        },
    ];

    const rows =
        companies &&
        companies.map((company) => {
            return {
                id: company._id,
                _id: company._id,
                name: company.name,
                email: company.email,
                // total: company.ratings.total ? company.ratings.total : 0,
                // culture: company.ratings.culture,
                // work_life: company.ratings.work_life_balance,
                // oppertunities: company.ratings.oppertunities_to_growth,
                // salary: company.ratings.salary_and_benifits,
                // location: company.ratings.location,
                // projects: company.ratings.projects,
                // mentorship: company.ratings.mentorship,
                // reputation: company.ratings.reputation,
                // industry: company.ratings.industry,
                // technology: company.ratings.technology,
                // team_size: company.ratings.team_size,
                // values: company.ratings.values,
                // mission: company.ratings.mission,
                // support: company.ratings.support,
                // experience: company.ratings.experience

            };
        });

    return (
        <Grid container spacing={1}>

            <Grid item xs={12}>
                <Typography variant="head3">Intern Process Student</Typography>
            </Grid>
            <Grid item xs={6} sx={{ margin: 1 }}>
                <MiniCardType2
                    title='Company Selection for Internship'
                    content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
                    goto='/student-company'
                />
            </Grid>
            <Grid item xs={12} sx={{ margin: 1 }}>
                <Tile>
                    <InternDataGridMini
                        users={companies && companies}
                        rows={rows}
                        columns={columns}
                    />
                </Tile>
            </Grid>
        </Grid>
    )
}

export default ViewAllCompanies