import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import CompanyListCard from '../../../components/InternProcess/CompanyListCard'
import { Tile } from '../../../components/card/Tile'
import * as assets from '../../../assets'
import useFetch from '../../../Hooks/useFetch'

const SelectCompany = () => {
    const { data } = useFetch("GET", 'http://localhost:5000/api/v1/company/intern-process/company-list', null);
    const companies = data;
    console.log(companies);


    const demo = {
        name: 'Creative Software',
        image: assets.Creative,
        goto: '/intern-process/company'
    }
    return (
        <Grid container direction='row' spacing={2}>
            <Grid item xs={8}>
                <Grid container direction='column'>
                    <Grid item>
                        <Typography variant="head1">Select a Company</Typography>
                    </Grid>
                    <Grid item marginLeft={3} marginTop={2}>
                        <Stack direction='column' spacing={1}>
                            {companies && companies.map((company) => (
                                <CompanyListCard company={company} key={company._id}/>
                            ))}
                            <CompanyListCard company={demo} />
                            <CompanyListCard company={demo} />
                            <CompanyListCard company={demo} />
                            <CompanyListCard company={demo} />
                            


                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Tile>Add</Tile>
            </Grid>
        </Grid>
    )
}

export default SelectCompany