import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { UsersState } from './types'

const initialState: UsersState = {
  users: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getCurrentOnlineUsers: (state: UsersState, action: PayloadAction<any>) => {
      state.users = action.payload
    },
    clearUsers: (state, action: PayloadAction<void>) => {
      state.users = initialState.users
    },
  },
})

export const { getCurrentOnlineUsers, clearUsers } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users

export default usersSlice.reducer
