import * as React from 'react'
import Layout from '../../components/layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { getProjects } from '../../utils/firebaseFunctions'
import ProjectLists from '../../components/projectLists'
import { reset } from '../../redux-store/singleProject.slice'
import { selectProjectsState } from '../../redux-store/projects.slice'
import ProjectFilter from './ProjectFilter'
import { selectAuthState } from '../../redux-store/auth.slice'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { projects } = useAppSelector(selectProjectsState)
  const { user } = useAppSelector(selectAuthState)
  const [currentFilter, setCurrentfilter] = React.useState('all')

  const changeFilter = (newFilter: string) => {
    setCurrentfilter(newFilter)
  }

  const filteredProjects = projects
    ? projects.filter((project) => {
        switch (currentFilter) {
          case 'all':
            return true
          case 'mine':
            let assignedToMe = false
            project.assignedUsersList.forEach((u) => {
              if (user?.uid === u.id) {
                assignedToMe = true
              }
            })
            return assignedToMe

          case 'development':
          case 'design':
          case 'sales':
          case 'marketting':
            return project.category === currentFilter
          default:
            return true
        }
      })
    : null

    
  React.useEffect(() => {
    document.title = 'Dashboard  '
    getProjects(dispatch)
    dispatch(reset())
  }, [dispatch])

  return (
    <Layout>
      <Box sx={{ p: '0rem 2rem' }}>
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '1.3rem', mb: '1.2rem' }}
        >
          Dashboard
        </Typography>
        {projects && (
          <ProjectFilter
            currentFilter={currentFilter}
            changeFilter={changeFilter}
          />
        )}
        {projects && <ProjectLists filteredProject={filteredProjects} />}
      </Box>
    </Layout>
  )
}

export default Dashboard
