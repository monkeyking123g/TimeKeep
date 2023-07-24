import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TokenState {
    access_token: string  
}

const initialState: TokenState  = {
  access_token: ''
};
  



export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<TokenState>) => {
      return action.payload;
    },
    removeAccessToken: () => {
      return initialState;
    },
  },
})

export const { setAccessToken, removeAccessToken } = tokenSlice.actions

export default tokenSlice.reducer