import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fafafa',
    padding: 0,
    margin: 0,
  },
  formItem: {
    marginBottom: '5px',
  },
  textFieldLabel: {
    fontSize: 18,
    color: '#222',
  },
  textFieldInput: {
    pt: '1.5rem',
    width: {
      xs: '300px',
      md: '400px',
    },
  },
  button: {
    color: '#8d69f1',
    fontSize: '1rem',
    alignSelf: 'flex-start',
    mt: '1rem',
    '&:hover': {
      background: '#8d69f1',
      color: '#fff',
    },
  },
}

export default styles

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    color: '#222',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fafafa',
    border: '1px solid #ced4da',
    fontSize: 16,
    // width: '300px',
    height: '20px',
    padding: '10px 15px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

    '&:focus': {
      borderColor: '#b2dffc',
    },
  },
}))
