import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDownloadRequest, createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { BEST_MOVIES } from "../entitiesConst"

const initialState = {
   [BEST_MOVIES]: null,
   success: null,
   error: null,
   loading: null,
   totalMovies: null,
   pagination: {
      pageSize: 5,
   }
}

export const fetchBestMovies = createAsyncThunk(
   `${BEST_MOVIES}/fetchBestMovies`,
   async function (pagination, { rejectWithValue, dispatch }) {
      try {

         //console.log('query address: ' + axios.PATH_GET_MOVIES_WITH_PARAMS(pageParams));
         await createRequest({
            method: axios.GET, url: axios.PATH_GET_BEST_MOVIES_WITH_PARAMS(pagination),
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               return data;
            },
            redux_cfg: {
               dispatch,
               actions: [setBestMovies]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

export const bestMoviePosterDownload = createAsyncThunk(
   `${BEST_MOVIES}/bestMoviePosterDownload`,
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
               actions: [setBestMoviePoster]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const bestMoviesSlice = createSlice({
   name: BEST_MOVIES,
   initialState,
   reducers: {
      setBestMovies(state, { payload }) {
         state[BEST_MOVIES] = payload.map(m => ({ ...m, poster: null }));
      },
      setBestMoviePoster(state, { payload }) {
         const index = state[BEST_MOVIES].findIndex(m => m.id === payload.id);

         if (index || index === 0)
            state[BEST_MOVIES][index].poster = payload.poster;
      },
   },
   extraReducers: {
      [fetchBestMovies.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [fetchBestMovies.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [fetchBestMovies.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   }
});


export const { setBestMovies, setBestMoviePoster } = bestMoviesSlice.actions;

export default bestMoviesSlice.reducer;