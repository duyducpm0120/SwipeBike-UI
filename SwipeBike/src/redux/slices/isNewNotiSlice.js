import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { hasNewNotifications } from '../../api';

export const fetchHasNewNoti = createAsyncThunk(
  'isNewNoti/fetchHasNewNoti',
  async (token) => {
    const res = await hasNewNotifications(token)
      .then(response => {
        console.log('hasNewNoti', response.data);
        return response.data.HasNewNotifications;
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
  extraReducers: {
    [fetchHasNewNoti.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchHasNewNoti.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.value = action.payload;
      console.log('Fetched hasNewNoti', action.payload);
    },
    [fetchHasNewNoti.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateIsNewNoti} = isNewNotiSlice.actions;

export default isNewNotiSlice.reducer;
