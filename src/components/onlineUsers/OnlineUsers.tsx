import React, { useEffect, } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { getUsers } from '../../utils/firebaseFunctions'
import styles from './styles'
import { selectUsers } from '../../redux-store/users.slice'
import { selectAuthState } from '../../redux-store/auth.slice'

const OnlineUsers = () => {
  const dispatch = useAppDispatch()
  const { users } = useAppSelector(selectUsers)
  const { user } = useAppSelector(selectAuthState)

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])

  return (
    <Box sx={styles.userList}>
      <Typography sx={{ fontWeight: 'bold', fontSize: '1.25rem', mb: '2rem', }}>
        All Users
      </Typography>
      {users.map((Cuser) => (
        <Box
          key={Cuser.userId}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            mb: '1.25rem',
          }}
        >
          {Cuser.online && <Box sx={styles.online} />}

          <Typography component='span'>
            {Cuser.displayName === user?.displayName
              ? 'You'
              : Cuser.displayName}
          </Typography>
          <Avatar src={Cuser.photoURL} alt={Cuser.displayName} />
        </Box>
      ))}
    </Box>
  )
}

export default OnlineUsers
