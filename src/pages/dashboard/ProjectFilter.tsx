import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const filterList = [
  'all',
  'mine',
  'development',
  'design',
  'marketing',
  'sales',
]

interface Props {
  currentFilter: string
  changeFilter: (newFilter: string) => void
}

const ProjectFilter = ({ currentFilter, changeFilter }: Props) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleClick = (newFilter: string) => {
    changeFilter(newFilter)
  }

  return (
    <>
      <Typography component='p' sx={{ mb: '0.7rem' }}>
        Filter By:
      </Typography>

      <Box
        sx={{
          mb: '1rem',
          maxWidth: { xs: 350, sm: 700, md: 768,  },
          background: '#fff',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
          aria-label='scrollable force tabs example'
        >
          {filterList.map((f) => (
            <Tab key={f} label={f} onClick={() => handleClick(f)} />
          ))}
        </Tabs>
      </Box>
    </>
  )
}

export default ProjectFilter
