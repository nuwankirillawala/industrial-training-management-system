import React from 'react'
import { Tile } from '../../components/card/Tile'
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'

const PrivateNotePanel = () => {
  return (
    <Tile>
        <Typography variant="h6" color="initial">Private Notes</Typography>
        <Divider /> 
    </Tile>
  )
}

export default PrivateNotePanel