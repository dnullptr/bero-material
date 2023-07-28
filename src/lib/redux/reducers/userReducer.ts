import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import {
  getAllUsersFromDb,
  getUserDataFromDb,
  loginWithFirebase,
  logoutWithFirebase,
  registerWithFirebase,
  signInWithOtp,
} from 'src/lib/firebase/funcs'
import { User } from 'src/models/User'
// Define a type for the slice state
interface UserState {
  user: any
  status?: 'idle' | 'loading' | 'failed'
}

// Define the initial state using that type
const initialState: UserState = {
  user: {},
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = 'idle'
      state.user = action.payload

      console.log('user', action.payload)
    })
    builder.addCase(signIn.rejected, (state) => {
      state.status = 'failed'
    })
    builder.addCase(register.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = 'idle'
      state.user = action.payload

      console.log('user', action.payload)
    })
    builder.addCase(register.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(logOut.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.status = 'idle'
      state.user = {}
    })
    builder.addCase(logOut.rejected, (state) => {
      state.status = 'failed'
    })
    builder.addCase(getAll.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.status = 'idle'
      state.user = action.payload
    })
    builder.addCase(getAll.rejected, (state) => {
      state.status = 'failed'
      console.log('FB error')
    })
  },
})

export const signIn = createAsyncThunk('user/signIn', async (data: { email: string; password: string }, thunkApi) => {
  try {
    const { email, password } = data
    const user = await loginWithFirebase(email, password)
    if (user) {
      console.log('user', user.uid)
      const userData = await getUserDataFromDb(user.uid)

      return userData
    } else thunkApi.rejectWithValue('error') //return { id: 'Guest', fullName: 'Guest' }
  } catch {
    return thunkApi.rejectWithValue('error')
  }
})

export const register = createAsyncThunk('user/register', async (data: User, thunkApi) => {
  try {
    const user = await registerWithFirebase(data)
    if (user) {
      return user
    }
  } catch {
    return thunkApi.rejectWithValue('error')
  }
})

export const logOut = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    await logoutWithFirebase()
  } catch {
    return thunkApi.rejectWithValue('error')
  }
})

export const getAll = createAsyncThunk('user/getAll', async (_, thunkApi) => {
  try {
    const users = await getAllUsersFromDb()
    console.log('users from fb', users)
    return users
  } catch {
    return thunkApi.rejectWithValue('error')
  }
})

// export const { setPhoneNumber } = userSlice.actions

// // Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user
export const selectStatus = (state: RootState) => state.user.status
export default userSlice.reducer
