import React from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from './redux-store'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import Routes from './routes'
import { PersistGate } from 'redux-persist/integration/react'
import Theme from './theme'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <ToastContainer  />
          {/* <ToastContainer delay={5000} /> */}
          <Box>
            <Routes />
          </Box>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
