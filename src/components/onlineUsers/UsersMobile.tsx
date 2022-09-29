import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { getUsers } from '../../utils/firebaseFunctions'
import styles from './styles'
import { selectUsers } from '../../redux-store/users.slice'
import { selectAuthState } from '../../redux-store/auth.slice'

const UsersMobile = () => {
  const dispatch = useAppDispatch()
  const { users } = useAppSelector(selectUsers)
  const { user } = useAppSelector(selectAuthState)

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])

  return (
    <Box sx={styles.userMobile}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '1.25rem', mb: '1rem', textAlign:'center' }}>
        All Users
      </Typography>
      {users.map((Cuser) => (
        <Box
          key={Cuser.userId}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1rem',
            mb: '1.25rem',
          }}
        >
          <Avatar src={Cuser.photoURL} alt={Cuser.displayName} />

          <Typography component='span'>
            {Cuser.displayName === user?.displayName
              ? 'You'
              : Cuser.displayName}
          </Typography>
          {Cuser.online && <Box sx={styles.online} />}
        </Box>
      ))}
    </Box>
  )
}

export default UsersMobile
