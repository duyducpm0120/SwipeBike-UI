import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadTokenFromLocalStorage} from '../../storage';

export const fetchLoginToken = createAsyncThunk(
  'loginToken/fetchToken',
  async () => {
    const res = await loadTokenFromLocalStorage()
      .then(response => {
        console.log('token fetch from storage', response);
        return response;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(json => {
        //console.log('finally' + json.movies);
      });
    //console.log(res);
    return res;
  },
);

export const loginTokenSlice = createSlice({
  name: 'loginToken',
  initialState: {
    token: '',
    status: 'idle',
    error: null,
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
  extraReducers: {
    [fetchLoginToken.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchLoginToken.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload;
      console.log('Token saved to redux');
    },
    [fetchLoginToken.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateToken} = loginTokenSlice.actions;

export default loginTokenSlice.reducer;
