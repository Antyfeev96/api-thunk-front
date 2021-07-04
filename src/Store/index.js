import { combineReducers, configureStore } from '@reduxjs/toolkit';
import toolkitSlice from '../Reducers/Reducers';

const rootReducer = combineReducers({
  myState: toolkitSlice
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})