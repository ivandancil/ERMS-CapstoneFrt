import { Box } from '@mui/material'
import Header from '../../components/Header'

const UserDashboard = () => {
  return (
    <Box m='20px'>
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Header title="DASHBOARD" subtitle="Welcome to USER dashboard" />
    </Box>
  </Box>
  )
}

export default UserDashboard