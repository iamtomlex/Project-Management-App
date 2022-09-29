import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

const NotFound = () => {
  React.useEffect(() => {
    document.title = 'Not Found'
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2'>Not Found</Typography>
      <Typography>
        <Link to={ROUTES.LOGIN}>Go Home</Link>
      </Typography>
    </Box>
  )
}

export default NotFound
