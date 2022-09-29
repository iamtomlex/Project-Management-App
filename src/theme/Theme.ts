import { createTheme } from '@mui/material/styles'

const font = "'Poppins', sans-serif"

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      background: {
        default: string
      }
    }
    breakpoints: {
      values: {
        xs: number
        sm: number
        md: number
        lg: number
        xl: number
      }
    }
    typography: {
      fontFamily: string
      button: {
        textTransform: string
      }
    }
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f4f4',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1400,
    },
  },

  typography: {
    fontFamily: font,
    button: {
      textTransform: 'none',
    },
  },
})

export default theme
