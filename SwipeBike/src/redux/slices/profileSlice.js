import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loadUserProfile} from '../../api/profile';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async token => {
    const res = await loadUserProfile(token)
      .then(response => {
        console.log('profile first fetch', response.data);
        return response;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(json => {
        //console.log('finally' + json.movies);
      });
    //console.log(res);
    return res.data;
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userProfile: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    updateProfile: (state, action) => {
      //console.log('action payload', action.payload);
      state.userProfile = action.payload.userProfile;
      console.log('user Profile redux', state.userProfile);
    },
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
  },
  extraReducers: {
    [fetchProfile.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.userProfile = action.payload;
      console.log('Profile saved to redux');
    },
    [fetchProfile.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateProfile} = profileSlice.actions;

export default profileSlice.reducer;
