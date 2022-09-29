import { useAppSelector } from '../redux-store/hooks'
import { useLocation, Navigate } from 'react-router-dom'
import { selectAuthState } from '../redux-store/auth.slice'
import { ROUTES } from '../utils/constants'

const UnAuthRoute = ({ children }: { children: JSX.Element }) => {
  const { isLogged } = useAppSelector(selectAuthState)
  let location = useLocation()

  if (isLogged) {
    return <Navigate to={ROUTES.DASHBOARD} state={{ from: location }} replace />
  }

  return children
}

export default UnAuthRoute
