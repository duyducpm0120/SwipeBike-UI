import {createSlice} from '@reduxjs/toolkit';

export const isNewNotiSlice = createSlice({
  name: 'isNewNoti',
  initialState: {
    value: false,
  },
  reducers: {
    updateIsNewNoti: (state, action) => {
      state.value = action.payload;
      //console.log('isLoading update', state.value);
    },
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const {updateIsNewNoti} = isNewNotiSlice.actions;

export default isNewNotiSlice.reducer;
