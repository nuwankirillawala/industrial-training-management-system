import { Avatar, Button, Icon, Stack, Typography } from "@mui/material"
import { Tile } from "../card/Tile"
import { useNavigate } from "react-router-dom";

const FeaturedCard = ({ title, color, icon, link }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    };

    return (
        <Tile
            width={'auto'}
            height={110}
            backgroundColor={'#fff'}
            sx={{
                ':hover': {
                    boxShadow: 2,
                },
            }}
            onClick={handleClick}
        >
            <Icon component={icon} />
            <Stack direction={'column'}>
                <Typography variant="head4" color={"initial"} textAlign={'left'} fontWeight={500}>{title}</Typography>
                {/* <Button size="small"><KeyboardDoubleArrowRightIcon /></Button> */}
            </Stack>
        </Tile>
    )
}

export default FeaturedCard