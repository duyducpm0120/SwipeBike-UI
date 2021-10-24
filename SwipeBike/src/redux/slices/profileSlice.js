import {createSlice} from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    UserFullName: '',
    UserPhone: 0,
    UserGender: '',
    UserDoB: '',
  },
  reducers: {
    updateProfile: (state, action) => {
      console.log('action payload', action.payload);
      state = action.payload;
      console.log('state', state);
    },
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const {updateProfile} = profileSlice.actions;

export default profileSlice.reducer;
