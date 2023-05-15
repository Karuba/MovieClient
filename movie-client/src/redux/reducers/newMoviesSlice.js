import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDownloadRequest, createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { NEW_MOVIES } from "../entitiesConst"

const initialState = {
   [NEW_MOVIES]: null,
   success: null,
   error: null,
   loading: null,
   totalMovies: null,
   pagination: {
      pageNumber: 1,
      pageSize: 5,
      movieName: "",
      newMovies: true,
   }
}

export const fetchNewMovies = createAsyncThunk(
   `${NEW_MOVIES}/fetchNewMovies`,
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
               actions: [setNewMovies, setTotalNewMovies]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

export const newMoviePosterDownload = createAsyncThunk(
   `${NEW_MOVIES}/newMoviePosterDownload`,
   async function ({ id, posterName }, { rejectWithValue, dispatch }) {
      try {
         createDownloadRequest({
            url: axios.PATH_EXTRACT_POSTER({ posterName }),
            postCallback: (response => ({
               id: id,
               poster: URL.createObjectURL(response.data),
            })),
            redux_cfg: {
               dispatch,
               actions: [setNewMoviePoster]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const newMoviesSlice = createSlice({
   name: NEW_MOVIES,
   initialState,
   reducers: {
      setNewMovies(state, { payload }) {
         state[NEW_MOVIES] = payload.movies.map(m => ({ ...m, poster: null }));
      },
      setTotalNewMovies(state, { payload }) {
         state.totalMovies = payload.quantity;
      },
      setNewMoviesPageNumber(state, { payload }) {
         state.pagination.pageNumber = payload;
      },
      setNewMoviePoster(state, { payload }) {
         const index = state[NEW_MOVIES].findIndex(m => m.id === payload.id);

         if (index || index === 0)
            state[NEW_MOVIES][index].poster = payload.poster;
      },
   },
   extraReducers: {
      [fetchNewMovies.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [fetchNewMovies.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [fetchNewMovies.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   }
});


export const { setNewMovies, setTotalNewMovies, setNewMoviesPageNumber, setNewMoviePoster } = newMoviesSlice.actions;

export default newMoviesSlice.reducer;