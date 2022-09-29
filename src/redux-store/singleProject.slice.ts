import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { singlProjectDocumentState } from './types'

const initialState: singlProjectDocumentState = {
  singleProject: null,
}

const singleProjectSlice = createSlice({
  name: 'singleProject',
  initialState,
  reducers: {
    getCurrentSingleProjects: (
      state: singlProjectDocumentState,
      action: PayloadAction<any>
    ) => {
      state.singleProject = action.payload
    },
    reset: (state: singlProjectDocumentState, action: PayloadAction<void>) => {
      state.singleProject = initialState.singleProject
    },
  },
})

export const { getCurrentSingleProjects, reset } = singleProjectSlice.actions

export const selectSingleProjectState = (state: RootState) =>
  state.singleProject

export default singleProjectSlice.reducer
