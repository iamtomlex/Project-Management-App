import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import AuthRoute from './Auth'
import UnAuthRoute from './UnAuth'

const Dashboard = lazy(() => import('../pages/dashboard'))
const Login = lazy(() => import('../pages/login'))
const SignUp = lazy(() => import('../pages/sign-up'))
const Project = lazy(() => import('../pages/project'))
const Create = lazy(() => import('../pages/create'))
const NotFound = lazy(() => import('../pages/not-found'))

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path={ROUTES.CREATE}
          element={
            <AuthRoute>
              <Create />
            </AuthRoute>
          }
        />
        <Route
          path={ROUTES.PROJECT}
          element={
            <AuthRoute>
              <Project />
            </AuthRoute>
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            <UnAuthRoute>
              <Login />
            </UnAuthRoute>
          }
        />
        <Route
          path={ROUTES.SIGN_UP}
          element={
            <UnAuthRoute>
              <SignUp />
            </UnAuthRoute>
          }
        />

        <Route path='*' element={<Navigate to={ROUTES.ERROR} replace />} />
        <Route path={ROUTES.ERROR} element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
