import {createSlice} from '@reduxjs/toolkit';

export const loginTokenSlice = createSlice({
  name: 'loginToken',
  initialState: {
    token: '',
  },
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
      console.log('token redux saved:', state.token);
    },
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const {updateToken} = loginTokenSlice.actions;

export default loginTokenSlice.reducer;
