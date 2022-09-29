import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddIcon from '@mui/icons-material/Add'
import styles from './styles'
import {
  checkDashboardPageIsActive,
  checkNewProjectPageIsActive,
} from '../../../utils/helper'
import { ROUTES } from '../../../utils/constants'
import { useAppSelector } from '../../../redux-store/hooks'
import { selectAuthState } from '../../../redux-store/auth.slice'
import AvatarD from '../../avatar'
import UsersMobile from '../../onlineUsers/UsersMobile'

const Drawer = () => {
  const { user } = useAppSelector(selectAuthState)
  return (
    <Box sx={styles.container}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {user?.photoURL && (
          <AvatarD
            url={user?.photoURL! as string}
            alt={user?.displayName! as string}
          />
        )}
        <Typography
          fontWeight='bold'
          fontSize='large'
          textAlign='center'
          sx={{ pb: '1rem' }}
        >
          Welcome{' '}
          {`${user?.displayName}`.charAt(0).toUpperCase() +
            `${user?.displayName}`.slice(1)}{' '}
          !!!
        </Typography>
      </Box>

      <Divider sx={{ background: '#fafaf', width: '100%' }} />

      <Box sx={{ mt: '2rem', mb:'1rem' }}>
        <List component='nav'>
          <ListItemButton
            sx={
              checkDashboardPageIsActive().isDashboardPageActive
                ? styles.active
                : styles.inactive
            }
            href={ROUTES.DASHBOARD}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              <DashboardIcon
                sx={
                  checkDashboardPageIsActive().isDashboardPageActive
                    ? styles.activeIcon
                    : styles.inactiveIcon
                }
              />
            </ListItemIcon>
            <ListItemText
              primary='Dashboard'
              primaryTypographyProps={{ fontSize: 18 }}
            />
          </ListItemButton>

          <ListItemButton
            sx={
              checkNewProjectPageIsActive().isNewProjectPageActive
                ? styles.active
                : styles.inactive
            }
            href={ROUTES.CREATE}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              <AddIcon
                sx={
                  checkNewProjectPageIsActive().isNewProjectPageActive
                    ? styles.activeIcon
                    : styles.inactiveIcon
                }
              />
            </ListItemIcon>
            <ListItemText
              primary='New Project'
              primaryTypographyProps={{ fontSize: 18 }}
            />
          </ListItemButton>
        </List>
      </Box>

      <Divider sx={{ background: '#fafaf', width: '100%' }} />

      <UsersMobile />
    </Box>
  )
}

export default Drawer
