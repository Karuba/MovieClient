import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDownloadRequest, createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { MOVIE } from "../entitiesConst"

const initialState = {
   [MOVIE]: null,
   success: null,
   error: null,
   loading: null,
}

export const fetchMovie = createAsyncThunk(
   `${MOVIE}/fetchMovie`,
   async function ({ id }, { rejectWithValue, dispatch }) {
      try {
         await createRequest({
            method: axios.GET, url: axios.PATH_GET_MOVIE({ id }),
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               return data;
            },
            redux_cfg: {
               dispatch,
               actions: [setMovie]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

export const posterDownload = createAsyncThunk(
   `${MOVIE}/posterDownload`,
   async function ({ posterName }, { rejectWithValue, dispatch }) {
      try {
         createDownloadRequest({
            url: axios.PATH_EXTRACT_POSTER({ posterName }),
            postCallback: (response => ({
               poster: URL.createObjectURL(response.data),
            })),
            redux_cfg: {
               dispatch,
               actions: [setPoster]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const movieSlice = createSlice({
   name: MOVIE,
   initialState,
   reducers: {
      setMovie(state, { payload }) {
         state[MOVIE] = payload;
      },
      setPoster(state, { payload }) {
         state[MOVIE].poster = payload.poster;
      }
   },
   extraReducers: {
      [fetchMovie.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [fetchMovie.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [fetchMovie.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   }
});


export const { setMovie, setPoster } = movieSlice.actions;

export default movieSlice.reducer;