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
      //console.log('action payload', action.payload);
      state.UserFullName = action.payload.UserFullName;
      state.UserPhone = action.payload.UserPhone;
      state.UserGender = action.payload.UserGender;
      state.UserDoB = action.payload.UserDoB;
      //console.log('state', state);
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

// const initialState = {
//   searchValue: {},
//   status: 'idle',
//   error: null,
// };
// export const fetchSearch = createAsyncThunk('search/fetchSearch', async () => {
//   const res = await fetch('https://reactnative.dev/movies.json')
//     .then(response => response.json())
//     .then(json => {
//       //console.log(json.movies);
//       return json.movies;
//     })
//     .catch(error => {
//       console.error(error);
//     })
//     .finally(json => {
//       //console.log('finally' + json.movies);
//     });
//   //console.log(res);
//   return res;
// });
// export const searchSlice = createSlice({
//   name: 'search',
//   initialState: initialState,
//   reducers: {
//     updateSearch: (state, action) => {
//       // the inside "thunk function"
//       state.searchValue = action.payload;
//     },
//   },
//   extraReducers: {
//     [fetchSearch.pending]: (state, action) => {
//       state.status = 'loading';
//     },
//     [fetchSearch.fulfilled]: (state, action) => {
//       state.status = 'succeeded';
//       state.searchValue = action.payload;
//     },
//     [fetchSearch.rejected]: (state, action) => {
//       state.status = 'failed';
//       state.error = action.error.message;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const {updateSearch} = searchSlice.actions;

// export default searchSlice.reducer;
