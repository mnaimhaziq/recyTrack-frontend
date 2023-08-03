import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ManageUsersLayout = () => {
  return (
    <Box m="1.5rem 2.5rem " p="0 0 4rem 0">
    <Outlet />
  </Box>
  )
}

export default ManageUsersLayout