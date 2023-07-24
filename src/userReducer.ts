import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    createdAt: string,
    earning_hour: number,
    email: string,
    image_url: string,
    password: string,
    __v: number,
    _id: string 
}

const initialState: UserState = {
  createdAt: '',
  earning_hour: 0,
  email: "",
  image_url: "",
  password: "",
  __v: 0,
  _id: ""
};
  



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    removeUser: () => {
      return initialState;
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer