import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { MOVIES } from "../entitiesConst"

const initialState = {
   [MOVIES]: [],
   success: null,
   status: null,
   error: null,
   loading: null,
   deleteLoading: null,
   postLoading: null,
   totalBooks: null,
}

export const fetchMovies = createAsyncThunk(
   `${MOVIES}/fetchMovies`,
   async function (pageParams, { rejectWithValue, dispatch }) {
      try {

         console.log('query address: ' + axios.PATH_GET_MOVIES_WITH_PARAMS(pageParams));
         await createRequest({
            method: axios.GET, url: axios.PATH_GET_MOVIES_WITH_PARAMS(pageParams),
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               console.log(data);

               return data;
            },
            redux_cfg: {
               dispatch,
               actions: [setMovies]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

const movieSlice = createSlice({
   name: MOVIES,
   initialState,
   reducers: {
      setMovies(state, { payload }) {
         state[MOVIES] = payload;
      },
      setTotalBooks(state, { payload }) {
         state.totalBooks = payload[1];
      },
   },
   extraReducers: {
      [fetchMovies.pending]: (state) => {
         state.loading = true
         state.error = null
      },
      [fetchMovies.fulfilled]: (state) => {
         state.loading = false
         state.success = true
      },
      [fetchMovies.rejected]: (state, { payload }) => {
         state.loading = false
         state.error = payload
      },
   }
});


export const { setMovies, setTotalBooks } = movieSlice.actions;

export default movieSlice.reducer;