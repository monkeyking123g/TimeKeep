import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TokenState {
    access_token: string
    toggle: boolean  
}

const initialState: TokenState  = {
  access_token: '',
  toggle: true
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
    setToggle: (state) => {
      state.toggle = !state.toggle; 
    },
   
  },
})

export const { setAccessToken, removeAccessToken, setToggle } = tokenSlice.actions

export default tokenSlice.reducer