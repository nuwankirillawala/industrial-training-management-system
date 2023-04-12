import { Avatar, Typography } from "@mui/material"
import { Tile } from "../card/Tile"

const FeaturedCard = ({ title, color }) => {
    return (
        <Tile width={300} height={150}  backgroundColor={'#fff'}>
            {/* <Avatar width={'60px'} height={'60px'} /> */}
            <Typography variant="h5" color={"initial"} textAlign={'center'} fontWeight={500}>{title}</Typography>
        </Tile>
    )
}

export default FeaturedCard