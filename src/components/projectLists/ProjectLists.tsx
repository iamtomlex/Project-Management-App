import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../redux-store/hooks'
import { selectProjectsState } from '../../redux-store/projects.slice'
import { Link } from 'react-router-dom'
import styles from './styles'
import { ProjectDocumentState } from '../../redux-store/types'

interface Props {
  filteredProject: ProjectDocumentState[] | null
}

const ProjectLists = ({ filteredProject }: Props) => {
  const { projects } = useAppSelector(selectProjectsState)
  return (
    <Box sx={styles.container}>
      {projects.length === 0 && <Typography>No projects yet!</Typography>}

      {filteredProject?.map((project) => {
        return (
          <Paper sx={styles.projectCard} key={project.id}>
            <Link to={`/projects/${project.id}`} style={{ color: '#2e2e2e' }}>
              <Typography variant='h6' sx={{ color: '#2e2e2e' }}>
                {project.name}
              </Typography>
              <Typography component='p' sx={{ color: '#999', mb: '1.2rem' }}>
                Due by {project.dueDate}
              </Typography>
              <Divider />
              <Box
                sx={{ display: 'flex', gap: '1rem', mt: '1rem', mb: '1.5rem' }}
              >
                {project.assignedUsersList.map((user) => (
                  <Avatar key={user.photoURL} src={user.photoURL} />
                ))}
              </Box>
              <Typography component='p' sx={{ color: '#999' }}>
                Click to comment 😊
              </Typography>
            </Link>
          </Paper>
        )
      })}
    </Box>
  )
}

export default ProjectLists
