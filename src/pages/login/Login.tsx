import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import styles, { BootstrapInput } from './styles'
import { toast } from 'react-toastify'
import { ROUTES } from '../../utils/constants'

import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'

import { makeLoginRequest } from '../../utils/firebaseFunctions'
import { selectAuthState } from '../../redux-store/auth.slice'
import Navbar from '../../components/navbar'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const isInvalid = password === '' || email === '' || loading

  const { user } = useAppSelector(selectAuthState)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()

  //@ts-ignore
  let from = location.state?.from?.pathname || ROUTES.DASHBOARD

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      email,
      password,
    }
    const callback = () => {
      navigate(from, { replace: true })
    }

    try {
      if (!user) {
        await makeLoginRequest(payload, dispatch, callback)
        toast.success('Loggged In successfully')
      }
    } catch (err) {
      toast.error('Unable to Login!!')
      setLoading(false)
      setEmail('')
      setPassword('')
    }
  }

  React.useEffect(() => {
    document.title = 'Login Page'
  }, [])

  return (
    <>
      <Navbar />
      <Box sx={styles.container}>
        <Paper sx={{ p: '2.5rem 1.5rem' }}>
          <Typography fontWeight='bold' fontSize='1.5rem'>
            Login
          </Typography>
          <Box
            component='form'
            onSubmit={handleLogin}
            method='POST'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={styles.formItem}>
              <FormControl variant='standard'>
                <InputLabel shrink htmlFor='email' sx={styles.textFieldLabel}>
                  Email Address
                </InputLabel>

                <BootstrapInput
                  id='email'
                  name='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='off'
                  required
                  fullWidth
                  sx={styles.textFieldInput}
                />
              </FormControl>
            </Box>

            <Box sx={styles.formItem}>
              <FormControl variant='standard'>
                <InputLabel
                  shrink
                  htmlFor='password'
                  sx={styles.textFieldLabel}
                >
                  Password
                </InputLabel>

                <BootstrapInput
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  sx={styles.textFieldInput}
                />
              </FormControl>
            </Box>

            <Button
              variant='outlined'
              type='submit'
              sx={styles.button}
              disabled={isInvalid}
            >
              {loading ? (
                <CircularProgress sx={{ color: '#8d69f1' }} size={25} />
              ) : (
                'Login'
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default Login
