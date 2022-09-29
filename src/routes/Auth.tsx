import { useAppSelector } from '../redux-store/hooks'
import { useLocation, Navigate } from 'react-router-dom'
import { selectAuthState } from '../redux-store/auth.slice'
import { ROUTES } from '../utils/constants'

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { isLogged } = useAppSelector(selectAuthState)
  let location = useLocation()

  if (!isLogged) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return children
}

export default AuthRoute
