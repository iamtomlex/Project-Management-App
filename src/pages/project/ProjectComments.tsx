import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { BootstrapInput } from './styles'
import { grey } from '@mui/material/colors'
import CircularProgress from '@mui/material/CircularProgress'
import { useAppSelector } from '../../redux-store/hooks'
import { selectAuthState } from '../../redux-store/auth.slice'
import { nanoid } from 'nanoid'
import { ProjectDocumentState } from '../../redux-store/types'
import { updateDocuments } from '../../utils/firebaseFunctions'
import { toast } from 'react-toastify'
import { commentToAdd } from '../../utils/types'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  project: ProjectDocumentState | null
}

const ProjectComments = ({ project }: Props) => {
  const [newComment, setNewComment] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const sortedComments = project
    ?.comments.slice().sort((a, b) => b.createdAt - a.createdAt)

  const { user } = useAppSelector(selectAuthState)

  const handleSubmitComment = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()

    const commentToAdd = {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      comment: newComment,
      createdAt: Date.now(),
      id: nanoid(),
    }

    try {
      await updateDocuments(
        project?.id! as string,
        commentToAdd,
        project?.comments! as commentToAdd[]
      )
      toast.success('Successfully added omment')
    } catch (err: any) {
      toast.error(err.message)
      setLoading(false)
    }

    setNewComment('')
    setLoading(false)
  }
  return (
    <Box
      sx={{
        mt: {
          xs: '2rem',
          xl: '0rem',
        },
      }}
    >
      <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', mb: '1rem' }}>
        Project Comments
      </Typography>

      <Box>
        {sortedComments?.map((comment) => {
          return (
            <Box key={comment?.id} sx={{ mb: '1.3rem' }}>
              <Paper sx={{ p: '2rem 1rem' }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    mb: '0.8rem',
                  }}
                >
                  <Avatar
                    sx={{ width: '30px', height: '30px' }}
                    src={comment.photoURL! as string}
                    alt={comment.displayName! as string}
                  />
                  <Typography sx={{ fontSize: '1.3rem' }}>
                    {comment.displayName}
                  </Typography>
                </Box>

                <Typography component='div' sx={{ color: '#999', mb: '1rem' }}>
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </Typography>
                <Typography
                  component='div'
                  sx={{ color: '#999', fontSize: '1.1rem' }}
                >
                  {comment.comment}
                </Typography>
              </Paper>
            </Box>
          )
        })}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          pl: '0rem',
          pr: '1.25rem',
        }}
        component='form'
        onSubmit={(e) =>
          newComment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
        method='POST'
      >
        <FormControl sx={{ display: 'flex' }}>
          <BootstrapInput
            aria-label='Add a comment'
            fullWidth
            // multiline
            autoComplete='off'
            type='text'
            name='add-comment'
            placeholder='Add new comments...'
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
            sx={{
              fontSize: '1rem',
              color: grey[500],
              width: '300px',
              py: '1.25rem',
            }}
          />
        </FormControl>
        <Button
          variant='outlined'
          sx={{ height: '40px', width: 'fit-content', color: '#8d69f1' }}
          disabled={newComment.length < 1 || loading}
          onClick={handleSubmitComment}
        >
          {loading ? <CircularProgress size={25} /> : 'Add Comment'}
        </Button>
      </Box>
    </Box>
  )
}

export default ProjectComments
