import { Box, Divider, LinearProgress, Paper, Typography } from "@mui/material"
import { Fragment } from "react"

const SkillLevel = ({ skill, value }) => {
    return (
        <Fragment>
            <Box sx={{
            display: 'flex',
            alignItems: 'center',
            // backgroundColor: '#fff',
            // padding: '5px',
            // margin: '2px'
        }}>
            <Typography flex={1}>{skill}</Typography>
            <Typography sx={{ mr: 1 }} flex={0.1}>:</Typography>
            <LinearProgress variant="determinate" value={value} sx={{ width: '50%' }} flex={12} />
            <Typography sx={{ ml: 1 }} flex={0.5}>{'50%'}</Typography>
        </Box>
        {/* <Divider sx={{m: '5px'}}/> */}
        </Fragment>
    )
}

export default SkillLevel