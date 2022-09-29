import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Layout from '../../components/layout'
import styles, { BootstrapInput } from './styles'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { selectUsers } from '../../redux-store/users.slice'
import { toast } from 'react-toastify'
import { Timestamp } from 'firebase/firestore'
import { selectAuthState } from '../../redux-store/auth.slice'
import Select from 'react-select'
import { saveProject } from '../../utils/firebaseFunctions'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import { reset } from '../../redux-store/singleProject.slice'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketting', label: 'Marketting' },
]

interface Props {
  value: {
    dateCreated: number
    displayName: string
    email: string
    online: boolean
    photoURL: string
    userId: string
  }
  label: string
}

interface CategoryProps {
  value: string
  label: string
}

const Create = () => {
  const { users } = useAppSelector(selectUsers)
  const { user } = useAppSelector(selectAuthState)
  const navigate = useNavigate()
  const dispatch =useAppDispatch()

  const [usersOpt, setUsersOpt] = React.useState<Props[]>([])

  const [name, setName] = React.useState('')
  const [details, setDetails] = React.useState('')
  const [dueDate, setDueDate] = React.useState('')
  const [category, setCategory] = React.useState({} as CategoryProps)
  const [assignedUsers, setAssignedUsers] = React.useState<Props[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (users) {
      const options: any = users.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsersOpt(options)
    }
  }, [users])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!category) {
      toast.error('Please select a project category')
      return
    }
    if (assignedUsers.length < 1) {
      toast.error('Please assign the project to at leats 1 user')
      return
    }

    const createdBy = {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      id: user?.uid,
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.userId,
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)).toDate().toDateString(),
      comments: [],
      createdBy,
      assignedUsersList,
    }

  
    try {
      setLoading(true)
      await saveProject(project)
      navigate(ROUTES.DASHBOARD)
      toast.success('Succesfully Added Project')
      setLoading(false)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

    React.useEffect(() => {
      document.title = 'Create Project '
    dispatch(reset())

    }, [dispatch])

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>Crate a new project</Typography>

        <Box
          component='form'
          onSubmit={handleSubmit}
          method='POST'
          sx={{
            // display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={styles.formItem}>
            <FormControl variant='standard'>
              <InputLabel shrink htmlFor='name' sx={styles.textFieldLabel}>
                Project name:
              </InputLabel>

              <BootstrapInput
                id='name'
                name='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete='off'
                required
                fullWidth
                sx={styles.textFieldInput}
              />
            </FormControl>
          </Box>

          <Box sx={styles.formItem}>
            <FormControl variant='standard'>
              <InputLabel shrink htmlFor='name' sx={styles.textFieldLabel}>
                Project details:
              </InputLabel>

              <TextField
                multiline
                rows={1}
                sx={{
                  width: {
                    xs: '300px',
                    md: '500px',
                    lg: '480px',
                    xl: '600px',
                  },
                  mt: '3rem',
                }}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </FormControl>
          </Box>

          <Box sx={styles.formItem}>
            <FormControl variant='standard'>
              <InputLabel shrink htmlFor='duedate' sx={styles.textFieldLabel}>
                Set due date:
              </InputLabel>

              <BootstrapInput
                id='dueDate'
                name='dueDate'
                type='date'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                autoComplete='off'
                required
                fullWidth
                sx={styles.textFieldInput}
              />
            </FormControl>
          </Box>

          <Box sx={styles.formItem}>
            <InputLabel
              shrink
              htmlFor='duedate'
              sx={{ mb: '0rem', fontSize: '22px', color: '#222' }}
            >
              Project category:
            </InputLabel>

            <Select
              onChange={(option: any) => setCategory(option)}
              options={categories}
            />
          </Box>

          <Box sx={styles.formItem}>
            <InputLabel
              shrink
              htmlFor='duedate'
              sx={{ mb: '0rem', fontSize: '22px', color: '#222' }}
            >
              Assign to:
            </InputLabel>

            <Select
              onChange={(option: any) => setAssignedUsers(option)}
              options={usersOpt}
              isMulti
            />
          </Box>

          <Button variant='outlined' type='submit' sx={styles.button}>
            {loading ? (
              <CircularProgress sx={{ color: '#8d69f1' }} size={25} />
            ) : (
              'Add Project'
            )}
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default Create
