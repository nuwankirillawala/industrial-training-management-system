import { Avatar, Button, Icon, Stack, Typography } from "@mui/material"
import { Tile } from "../card/Tile"
import { useNavigate } from "react-router-dom";
import { ClickableTile } from "../card/ClickableTile";

const FeaturedCard = ({ title, color, icon, link }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    };

    return (
        <ClickableTile
            width={'auto'}
            height={100}
            backgroundColor={'#fff'}
            sx={{
                ':hover': {
                    boxShadow: 2,
                },
            }}
            onClick={handleClick}
        >
            <Icon component={icon} style={{ color: color }} />
            <Stack direction={'column'}>
                <Typography variant="head4" color={"initial"} textAlign={'left'} fontWeight={500}>{title}</Typography>
                {/* <Button size="small"><KeyboardDoubleArrowRightIcon /></Button> */}
            </Stack>
        </ClickableTile>
    )
}

export default FeaturedCard