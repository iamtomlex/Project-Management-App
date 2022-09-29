import { faker } from '@faker-js/faker'
import { ROUTES } from './constants'

export const checkDashboardPageIsActive = () => {
  const isDashboardPageActive = window.location.pathname === ROUTES.DASHBOARD

  return { isDashboardPageActive }
}

export const checkNewProjectPageIsActive = () => {
  const isNewProjectPageActive = window.location.pathname === ROUTES.CREATE

  return { isNewProjectPageActive }
}

export const generateImageTag = (): string => faker.datatype.uuid()
