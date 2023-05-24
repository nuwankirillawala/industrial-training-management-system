import { Stack } from '@mui/system';
import { Tile } from '../../../components/card/Tile';
import { Grid, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import GroupsIcon from '@mui/icons-material/Groups';
// import BusinessIcon from '@mui/icons-material/Business';
// import EngineeringIcon from '@mui/icons-material/Engineering';
import administrator from "../../../Images/administrator.png"
import alumni from '../../../Images/alumni.png'
import companySupervisor from '../../../Images/companySupervisor.png'
import deptCoordinator from '../../../Images/deptCoordinator.png'
import Undergraduate from '../../../Images/Undergraduate.png'
import { Divider } from '@mui/material';

import { Icon } from '@mui/material';

function RedirectAdduser(text) {
    switch (text) {
        case 'Administrator':
            return '/admin/add'
            break;
        case 'Department CoOrdinator':
            return '/department-coordinator/add'
            break;
        case 'Undergraduate':
            return '/student/add'
            break;
        case 'Company Supervisor':
            return '/supervisor/add'
            break;
        case 'Alumni':
            return '/alumni/add'
            break;
        default:
            break;
    }
}

function RedirectViewuser(text) {
    switch (text) {
        case 'Administrator':
            return '/view-admin-details'
            break;
        case 'Department CoOrdinator':
            return '/view-dept-coordinator-details'
            break;
        case 'Undergraduate':
            return '/view-undg-details'
            break;
        case 'Company Supervisor':
            return '/view-comp-details'
            break;
        case 'Alumni':
            return '/view-alumini-details'
            break;
        default:
            break;
    }
}

function RedirectUpdateNRemoveuser(text) {
    switch (text) {
        case 'Administrator':
            return '/updateNremove-admin-details'
            break;
        case 'Department CoOrdinator':
            return '/updateNremove-Department-Coordinator-details'
            break;
        case 'Undergraduate':
            return '/updateNremove-undergraduate-details'
            break;
        case 'Company Supervisor':
            return '/updateNremove-companySupervisor-details'
            break;
        case 'Alumni':
            return '/updateNremove-alumni-details'
            break;
        default:
            break;
    }
}


export const ManageUser = () => {

    const navigate = useNavigate()

    const userList = [
        { name: 'Administrator', icon: administrator, description: "Administrator responsible for manages all users in the system by adding,  updating and removing users." },
        { name: 'Department CoOrdinator', icon: deptCoordinator, description: "Department Co-ordinator supervise the internship process." },
        { name: 'Undergraduate', icon: Undergraduate, description: "Undergraduates use the platform for keep track of internship and give their updates.  Also use the platform for internship report purposes." },
        { name: 'Company Supervisor', icon: companySupervisor, description: "Company supervisors involve the internship process by guiding Internship applicants and confirming their details." },
        { name: 'Alumni', icon: alumni, description: "Alumni persons share IT field experiences and technical details to new internship applicants." }
    ];


    return (

        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12}>
                <Typography variant="pageTitle">Manage Users</Typography>
            </Grid>
            {userList.map((user, index) => (
                <Grid item md={4} sm={6} lg={2.4} key={index}>
                    <Tile height={'82vh'}>
                        {/*                         <Stack ><Icon color='primary' fontSize='large'><user.icon /> </Icon></Stack>
 */}
                        <Stack sx={{ display: 'flex-end', alignItems: 'center' }} ><img src={user.icon} height="35vh" width='40px' /></Stack>
                        <Stack height={'9vh'}> <Typography variant="h6" fontWeight={'bold'}>{user.name}</Typography> </Stack>
                        <Divider orientation="horizontal" />
                        <Stack height={'15vh'} padding="10px">  <Typography variant="body1" > {user.description} </Typography>  </Stack>
                        <Stack direction={"column"} sx={{ height: '58%' }} justifyContent={"flex-end"} spacing={1}>
                            <Button variant="itms" onClick={() => navigate(RedirectViewuser(user.name))}> View  </Button>
                            <Button variant="itms" onClick={() => navigate(RedirectAdduser(user.name))} > Add  </Button>
                            <Button variant="itms" onClick={() => navigate(RedirectUpdateNRemoveuser(user.name))}> Update / Remove </Button>
                        </Stack>
                    </Tile>
                </Grid>
            ))}
        </Grid>

    )




}



