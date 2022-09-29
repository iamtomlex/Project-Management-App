import { commentToAdd } from "../utils/types"

export interface User {
  email: string | null
  uid: string
  displayName: string | null
  photoURL: string | null
}

export interface AuthState {
  isLogged: boolean
  user: User | null
}

export interface UsersState {
  users: {
    dateCreated: number
    displayName: string
    email: string
    online: boolean
    photoURL: string
    userId: string
  }[]
}

export interface CreatedBy {
  id: string
  photoURL: string
  displayName: string
}

export interface AssignedUserState {
  id: string
  photoURL: string
  displayName: string
}

export interface ProjectDocumentState {
  name: string
  details: string
  category: string
  dueDate: string
  comments: commentToAdd[]
  createdBy: CreatedBy
  assignedUsersList: AssignedUserState[]
  id: string
}

export interface ProjectState {
  projects: ProjectDocumentState[]
}

export interface singlProjectDocumentState {
  singleProject: ProjectDocumentState | null
}
