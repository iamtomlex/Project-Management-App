import GridLoader from 'react-spinners/GridLoader'
import Box from '@mui/material/Box'
import styles from '../styles'

const GridLoad = () => {
  return (
    <Box sx={styles.container}>
      <GridLoader color='#8d69f1' size={30} />
    </Box>
  )
}

export default GridLoad
