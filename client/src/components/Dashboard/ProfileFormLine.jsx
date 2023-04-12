import { Stack, Typography } from "@mui/material";

const ProfileFormLine = ({title, content}) => {
    return (
        <Stack direction={'row'}>
            <Typography variant="body1" fontWeight={'bold'} flex={3}>{title}</Typography>
            <Typography variant="body1" flex={0.3}>:</Typography>
            <Typography flex={6}>{content}</Typography>
        </Stack>
    )
}

export default ProfileFormLine;