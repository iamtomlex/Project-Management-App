import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { ProjectState } from './types'

const initialState: ProjectState = {
  projects: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getCurrentProjects: (state: ProjectState, action: PayloadAction<any>) => {
      state.projects = action.payload
    },
    clearProjects: (state, action: PayloadAction<void>) => {
      state.projects = initialState.projects
    },
  },
})

export const { getCurrentProjects,clearProjects } = projectsSlice.actions

export const selectProjectsState = (state: RootState) => state.projects

export default projectsSlice.reducer
