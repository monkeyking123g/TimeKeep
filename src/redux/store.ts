import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';
import { UserState } from "./userReducer"
import { TokenState } from './tokenReducer';

export interface RootState {
  user: UserState;
  access_token: TokenState
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer
  }
})