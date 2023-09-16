import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TokenState {
    access_token: any
    toggle: boolean  
}
const tokenDataFromLocalStorage: TokenState  | null = JSON.parse(localStorage.getItem('access_token'))
console.log(tokenDataFromLocalStorage)
const initialState: TokenState  = {
  access_token: tokenDataFromLocalStorage,
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