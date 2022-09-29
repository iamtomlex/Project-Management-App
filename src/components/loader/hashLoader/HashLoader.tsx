import HashLoader from 'react-spinners/HashLoader'
import Box from '@mui/material/Box'
import styles from '../styles'

const HashLoad = () => {
  return (
    <Box sx={styles.container}>
      <HashLoader color='#b2dffc' size={50} />
    </Box>
  )
}

export default HashLoad
