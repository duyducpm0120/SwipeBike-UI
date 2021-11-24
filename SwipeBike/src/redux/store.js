import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import loginTokenReducer from './slices/loginTokenSlice';
export default configureStore({
  reducer: {
    userProfile: profileReducer,
    token: loginTokenReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});
