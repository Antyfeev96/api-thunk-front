import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import toolkitSlice from '../Reducers/Reducers';
import thunk from 'redux-thunk';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});


const rootReducer = combineReducers({
  myState: toolkitSlice
})

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
})