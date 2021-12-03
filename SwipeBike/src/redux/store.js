import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import loginTokenReducer from './slices/loginTokenSlice';
import isLoadingReducer from './slices/isLoadingSlice';
import isNewNotiReducer from './slices/isNewNoti';
export default configureStore({
  reducer: {
    userProfile: profileReducer,
    loginToken: loginTokenReducer,
    isLoading: isLoadingReducer,
    isNewNoti: isNewNotiReducer,
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
