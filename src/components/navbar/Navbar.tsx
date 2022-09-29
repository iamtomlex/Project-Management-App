import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import styles from './styles'
import { ROUTES } from '../../utils/constants'
import DrawerContent from './drawer'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { logout, selectAuthState } from '../../redux-store/auth.slice'
import { toast } from 'react-toastify'
import { makeLogoutChanges } from '../../utils/firebaseFunctions'
import { clearUsers } from '../../redux-store/users.slice'
import { reset } from '../../redux-store/singleProject.slice'
import { clearProjects } from '../../redux-store/projects.slice'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector(selectAuthState)

  const handleLogout = async () => {
    if (user) {
      dispatch(logout())
      dispatch(clearUsers())
      dispatch(clearProjects())
      dispatch(reset())
      await makeLogoutChanges(user?.uid)
      navigate(ROUTES.LOGIN)
      toast.success('Successfully Logged out')
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const onClickLogo = () => {
    navigate(ROUTES.DASHBOARD)
  }

  return (
    <Box>
      <AppBar
        component='nav'
        sx={{
          position: 'fixed',
          background: '#fff',
          padding: { sm: '0px 5px', md: '0px 20px', lg: '0px 40px' },
          height: '60px',
        }}
      >
        <Toolbar sx={styles.headerContainer}>
          <Box sx={styles.left}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 0.5, display: { lg: 'none' }, color: '#8d69f1' }}
            >
              <MenuIcon sx={{ fontSize: '2rem' }} />
            </IconButton>

            <Typography
              sx={{
                color: '#8d69f1',
                cursor: 'pointer',
              }}
              component='span'
              fontWeight='bold'
              onClick={onClickLogo}
            >
              The Dojo{' '}
            </Typography>
          </Box>

          <Box sx={styles.right}>
            {!user ? (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Typography sx={styles.text}>Login</Typography>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <Typography sx={styles.text}>SignUp</Typography>
                </Link>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                variant='outlined'
                sx={{ color: '#8d69f1', fontSize: '1rem' }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
          }}
        >
          <DrawerContent />
        </Drawer>
      </Box>
    </Box>
  )
}

export default Navbar
