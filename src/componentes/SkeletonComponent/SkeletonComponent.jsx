import { Skeleton } from '@mui/material'
import React from 'react'

export const SkeletonComponent = ({width, height}) => {
  return (
    <Skeleton variant='rounded' animation="wave" width={width} height={height}/>
  )
}

