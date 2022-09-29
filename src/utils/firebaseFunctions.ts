import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { Action, AnyAction, Dispatch, EmptyObject } from '@reduxjs/toolkit'
import { auth, colRef, db } from './firebase'
import { ThunkDispatch } from 'redux-thunk'

import {
  commentToAdd,
  MakeLoginRequestInterface,
  MakeSignUpRequestInterface,
  UserData,
} from './types'
import { login } from '../redux-store/auth.slice'
import { AuthState, UsersState } from '../redux-store/types'
import { getCurrentOnlineUsers } from '../redux-store/users.slice'
import { getCurrentProjects } from '../redux-store/projects.slice'
import { getCurrentSingleProjects } from '../redux-store/singleProject.slice'
import { ROUTES } from './constants'
import { NavigateFunction } from 'react-router-dom'

export const makeSignUpRequest = async (
  payload: MakeSignUpRequestInterface,
  dispatch: ThunkDispatch<
    EmptyObject & {
      auth: unknown
    } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<Action<any>>,
  callback: () => void
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  )

  const { user } = userCredential

  await updateProfile(user, {
    displayName: payload.displayName,
    photoURL: payload.imageUrl,
  })

  const docRef = doc(db, 'users', user.uid)

  await setDoc(
    docRef,
    {
      online: false,
      userId: user.uid,
      displayName: payload.displayName,
      email: payload.email.toLowerCase(),
      photoURL: payload.imageUrl,
      dateCreated: Date.now(),
    },
    { merge: true }
  )

  callback()
}

export const doesDisplayNameExist = async (displayName: string) => {
  const q = query(colRef, where('displayName', '==', displayName))
  const result = await getDocs(q)

  return result.docs.map((user) => user.data().length > 0)
}

export const makeLoginRequest = async (
  payload: MakeLoginRequestInterface,
  dispatch: ThunkDispatch<
    EmptyObject & {
      auth: AuthState
    } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  callback: () => void
) => {
  const { user } = await signInWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  )

  const userData: UserData = {
    email: user.email,
    displayName: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
  }
  dispatch(login(userData))

  const docRef = doc(db, 'users', user.uid)

  await updateDoc(docRef, {
    online: true,
  })

  callback()
}

export const makeLogoutChanges = async (userId: string) => {
  const docRef = doc(db, 'users', userId)

  await updateDoc(docRef, {
    online: false,
  })
}

export const getUsers = (
  dispatch: ThunkDispatch<
    EmptyObject & {
      auth: AuthState
      users: UsersState
    } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<Action<any>>
) => {
  onSnapshot(colRef, (data) => {
    let result: any = data.docs.map((item) => ({
      ...item.data(),
    }))
    dispatch(getCurrentOnlineUsers(result))
  })
}

export const saveProject = async (project: any) => {
  await setDoc(doc(db, 'projects', `${Date.now()}`), project, {
    merge: true,
  })
}

export const getProjects = (
  dispatch: ThunkDispatch<
    EmptyObject & {
      auth: AuthState
      users: UsersState
    } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<Action<any>>
) => {
  const projectRef = collection(db, 'projects')
  onSnapshot(projectRef, (data) => {
    let result: any = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }))
    dispatch(getCurrentProjects(result))
  })
}

export const getProjectsDocument = (
  projectId: any,
  dispatch: ThunkDispatch<
    EmptyObject & {
      auth: AuthState
      users: UsersState
    } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<Action<any>>,
  navigate: NavigateFunction
) => {
  const docRef = doc(db, 'projects', projectId)

  onSnapshot(docRef, (docSnap) => {
    if (docSnap.data()) {
      let result = { ...docSnap.data(), id: docSnap.id }
      dispatch(getCurrentSingleProjects(result))
    } else {
      navigate(ROUTES.ERROR, { replace: true })
    }
  })
}

export const updateDocuments = async (
  id: string,
  commentToAdd: commentToAdd,
  projectComments: commentToAdd[]
) => {
  const docRef = doc(db, 'projects', id)

  await updateDoc(docRef, {
    comments: [...projectComments, commentToAdd],
  })
}

export const deleteProject = async (projectId: string) => {
  await deleteDoc(doc(db, 'projects', projectId))
}
