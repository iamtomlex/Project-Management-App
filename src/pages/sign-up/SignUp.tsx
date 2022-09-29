import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import styles, { BootstrapInput } from './styles'
import { toast } from 'react-toastify'
import { ROUTES } from '../../utils/constants'
import {
  doesDisplayNameExist,
  makeSignUpRequest,
} from '../../utils/firebaseFunctions'
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage'
import { useAppDispatch } from '../../redux-store/hooks'
import { storage } from '../../utils/firebase'
import { generateImageTag } from '../../utils/helper'
import Navbar from '../../components/navbar'

const SignUp = () => {
  const [displayName, setDisplayName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [thumbnail, setThumbnail] = React.useState<any>('')
  const [loading, setLoading] = React.useState(false)
  const [imageLoading, setImageLoading] = React.useState(false)
  const [percent, setPercent] = React.useState<number>(0)
  const [imageUrl, setImageUrl] = React.useState('')

  const isInvalid =
    password === '' ||
    email === '' ||
    displayName === '' ||
    loading ||
    imageUrl === ''

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      email,
      password,
      displayName,
      imageUrl,
    }
    const callback = () => {
      navigate(ROUTES.LOGIN, { replace: true })
    }

    const displayNameExists = await doesDisplayNameExist(displayName)

    if (!displayNameExists.length) {
      try {
        await makeSignUpRequest(payload, dispatch, callback)
        toast.success('Successfully Signed Up!!')
      } catch (err: any) {
        toast.error(err.message)
        setLoading(false)
        setEmail('')
        setPassword('')
        setDisplayName('')
      }
    } else {
      toast.error('This username already exist. Try another one!!')
      setLoading(false)
      setEmail('')
      setPassword('')
      setDisplayName('')
    }
  }

  const handleFileChange = (e: any) => {
    const imageFile = e.target.files[0]

    if (!imageFile) {
      toast.error('Please Select a file')
      return
    }
    if (!imageFile.type.includes('image')) {
      toast.error('Selcted File must be an image')
      return
    }
    if (imageFile.size > 500000) {
      toast.error('Image file size must be less than 500kb')
      return
    }

    setThumbnail(imageFile)
    setImageLoading(true)

    const storageRef = ref(storage, `thumbnails/${generateImageTag()}`)
    const metadata = {
      contentType: 'image/jpeg',
    }

    const uploadTask = uploadBytesResumable(storageRef, thumbnail, metadata)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent: number = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setPercent(percent)
      },
      (err) => {
        toast.error('Error while uploading: Try Again 😞')
        setImageLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url)
          toast.success('Image uploaded successfully 😊')
          setImageLoading(false)
        })
      }
    )
  }

  const deleteImage = () => {
    setLoading(true)
    //  setOnDelete(true)
    const deleteRef = ref(storage, imageUrl)
    deleteObject(deleteRef).then(() => {
      setImageUrl('')
      setLoading(false)
      setImageUrl('')
      toast.success('Image deleted successfully 😊')
    })
  }

  React.useEffect(() => {
    document.title = 'Sign Up Page'
  }, [])

  return (
    <>
      <Navbar />
      <Box sx={styles.container}>
        <Paper sx={{ p: '2.5rem 1.5rem' }}>
          <Typography fontWeight='bold' fontSize='1.5rem'>
            Sign Up
          </Typography>
          <Box
            component='form'
            onSubmit={handleSignUp}
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

            <Box sx={styles.formItem}>
              <FormControl variant='standard'>
                <InputLabel
                  shrink
                  htmlFor='fullName'
                  sx={styles.textFieldLabel}
                >
                  Display Name
                </InputLabel>

                <BootstrapInput
                  id='displayName'
                  name='displayName'
                  type='displayName'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  autoComplete='off'
                  required
                  fullWidth
                  sx={styles.textFieldInput}
                />
              </FormControl>
            </Box>

            {imageUrl === '' ? (
              <Button
                sx={{ alignSelf: 'flex-start', m: '1rem 0rem' }}
                variant='contained'
                component='label'
                disabled={imageLoading}
              >
                {imageLoading ? `${percent} % done` : 'Upload Image'}

                <input
                  type='file'
                  // accept='image/*'
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
            ) : (
              <Box
                position='relative'
                sx={{
                  width: '400px',
                  minHeight: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: '1rem',
                }}
              >
                <Box
                  component='img'
                  src={imageUrl}
                  alt='Delete and Upload!!'
                  sx={{
                    width: '50%',
                    height: '50%',
                    objectFit: 'cover',
                  }}
                />
                <IconButton sx={styles.deleteBtn} onClick={deleteImage}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}

            <Button
              variant='outlined'
              type='submit'
              sx={styles.button}
              disabled={isInvalid}
            >
              {loading ? (
                <CircularProgress sx={{ color: '#8d69f1' }} size={25} />
              ) : (
                'Sign Up'
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default SignUp
