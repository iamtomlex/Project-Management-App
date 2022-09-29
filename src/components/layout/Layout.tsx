import Box from '@mui/material/Box'
import { selectAuthState } from '../../redux-store/auth.slice'
import { useAppSelector } from '../../redux-store/hooks'
import Navbar from '../navbar'
import OnlineUsers from '../onlineUsers'
import Sidebar from '../sidebar'

import styles from './styles'

const Layout = ({ children }: any): JSX.Element => {
  const { user } = useAppSelector(selectAuthState)
  return (
    <Box sx={styles.container}>
      <Navbar />

      <Box sx={styles.content}>
        {user && <Sidebar />}

        <Box sx={styles.main}>{children}</Box>

        <OnlineUsers />
      </Box>
    </Box>
  )
}

export default Layout
