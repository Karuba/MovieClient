import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { MOVIES } from "../entitiesConst"

const initialState = {
   [MOVIES]: [],
   success: null,
   error: null,
   loading: null,
   deleteLoading: null,
   postLoading: null,
   totalMovies: null,
   pagination: {
      pageNumber: 1,
      pageSize: 5,
      movieName: "",
   }
}

export const fetchMovies = createAsyncThunk(
   `${MOVIES}/fetchMovies`,
   async function (pagination, { rejectWithValue, dispatch }) {
      try {

         //console.log('query address: ' + axios.PATH_GET_MOVIES_WITH_PARAMS(pageParams));
         await createRequest({
            method: axios.GET, url: axios.PATH_GET_MOVIES_WITH_PARAMS(pagination),
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               return data;
            },
            redux_cfg: {
               dispatch,
               actions: [setMovies, setTotalMovies]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

export const deleteMovie = createAsyncThunk(
   `${MOVIES}/deleteMovie`,
   async ({ id }, { rejectWithValue }) => {
      try {
         await createRequest({
            method: axios.DELETE, url: axios.PATH_DELETE_MOVIE({ id }),
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
         state[MOVIES] = payload.movies;
      },
      setTotalMovies(state, { payload }) {
         state.totalMovies = payload.quantity;
      },
      setPageNumber(state, { payload }) {
         state.pagination.pageNumber = payload;
      }
   },
   extraReducers: {
      [fetchMovies.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [fetchMovies.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [fetchMovies.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
      [deleteMovie.pending]: (state) => {
         state.deleteLoading = true;
         state.error = null;
      },
      [deleteMovie.fulfilled]: (state) => {
         state.deleteLoading = false;
      },
      [deleteMovie.rejected]: (state, { payload }) => {
         state.deleteLoading = false;
         state.error = payload;
      },
   }
});


export const { setMovies, setTotalMovies, setPageNumber } = movieSlice.actions;

export default movieSlice.reducer;