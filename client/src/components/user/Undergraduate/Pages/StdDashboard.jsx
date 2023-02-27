import React from 'react'
import { BasicCard } from '../../../card/basicCard/BasicCard'
import { Box,Typography } from '@mui/material'
import { Tile } from '../../../card/Tile'

export const StdDashboard = () => {
  return (
    <BasicCard>
      <Tile>
        <Typography> hi</Typography>
      </Tile>
    </BasicCard>
  )
}