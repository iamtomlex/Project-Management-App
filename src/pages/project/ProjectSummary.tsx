import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ProjectDocumentState } from '../../redux-store/types'
import styles from './styles'
import { deleteProject } from '../../utils/firebaseFunctions'
import { useAppSelector } from '../../redux-store/hooks'
import { selectAuthState } from '../../redux-store/auth.slice'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

interface Props {
  project: ProjectDocumentState | null
}

const ProjectSummary = ({ project }: Props) => {
  const { user } = useAppSelector(selectAuthState)
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    setLoading(true)
    await deleteProject(project?.id! as string)
    navigate(ROUTES.DASHBOARD)
    setLoading(false)
  }
  return (
    <>
      <Paper sx={styles.paper}>
        <Box>
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold', fontSize: '1.3rem', mb: '1rem' }}
          >
            {project?.name}
          </Typography>
          <Typography component='p' sx={{ mb: '1rem' }}>
            By {project?.createdBy.displayName}
          </Typography>
          <Typography component='p' sx={{ mb: '1rem' }}>
            Project due by {project?.dueDate}
          </Typography>
          <Typography component='p' color='#999' sx={{ mb: '2rem' }}>
            {project?.details}
          </Typography>
          <Typography>Project is assigned to:</Typography>
          <Box sx={{ display: 'flex', gap: '1rem', mt: '1rem' }}>
            {project?.assignedUsersList.map((user) => {
              return (
                <Avatar
                  key={user.id}
                  src={user.photoURL}
                  alt={user.displayName}
                />
              )
            })}
          </Box>
        </Box>
      </Paper>

      <Box>
        {user?.uid === project?.createdBy.id && (
          <>
            <Typography component='em' color='#999'>
              Note: Project will be deleted when you mark as complete!!!
            </Typography>

            <Button
              onClick={handleClick}
              variant='outlined'
              sx={{ color: '#8d69f1', fontSize: '1rem', mt: '1rem' }}
            >
              Mark as Complete
            </Button>
          </>
        )}
      </Box>
    </>
  )
}

export default ProjectSummary
