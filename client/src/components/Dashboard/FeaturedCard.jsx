import { Avatar, Typography } from "@mui/material"
import { Tile } from "../card/Tile"

const FeaturedCard = ({ title, color }) => {
    return (
        <Tile width={'auto'} height={100}  backgroundColor={'#fff'}>
            {/* <Avatar width={'60px'} height={'60px'} /> */}
            <Typography variant="head4" color={"initial"} textAlign={'center'} fontWeight={500}>{title}</Typography>
        </Tile>
    )
}

export default FeaturedCard