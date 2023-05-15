import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDownloadRequest, createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { MOVIE } from "../entitiesConst"

const initialState = {
   [MOVIE]: null,
   success: null,
   error: null,
   loading: null,
   userRating: null,
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

export const updateUserRating = createAsyncThunk(
   `${MOVIE}/setUserRating`,
   async ({ id, rating, userName }, { rejectWithValue }) => {
      try {
         await createRequest({
            method: axios.POST, url: axios.PATH_USER_SET_RATING({ id }),
            body: {
               userName, rating,
            }
         })

      } catch (error) {
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
         } else {
            return rejectWithValue(error.message)
         }
      }
   }
)

export const fetchUserRating = createAsyncThunk(
   `${MOVIE}/fetchUserRating`,
   async ({ id, userName }, { rejectWithValue, dispatch }) => {
      try {
         await createRequest({
            method: axios.GET, url: axios.PATH_USER_GET_RATING({ id, userName }),
            postCallback: (dataAfter) => {
               const { rating } = dataAfter.data;
               return rating;
            },
            redux_cfg: {
               dispatch,
               actions: [setUserRating]
            }
         })

      } catch (error) {
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
         } else {
            return rejectWithValue(error.message)
         }
      }
   }
)

export const fetchMovieRating = createAsyncThunk(
   `${MOVIE}/fetchMovieRating`,
   async ({ id }, { rejectWithValue, dispatch }) => {
      try {
         await createRequest({
            method: axios.GET, url: axios.PATH_GET_MOVIE_RATING({ id }),
            postCallback: (dataAfter) => {
               const { rating } = dataAfter.data;
               return rating;
            },
            redux_cfg: {
               dispatch,
               actions: [setMovieRating]
            }
         })

      } catch (error) {
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
         } else {
            return rejectWithValue(error.message)
         }
      }
   }
)

const movieSlice = createSlice({
   name: MOVIE,
   initialState,
   reducers: {
      setMovie(state, { payload }) {
         state[MOVIE] = payload;
      },
      setPoster(state, { payload }) {
         state[MOVIE].poster = payload.poster;
      },
      resetError(state) {
         state.error = null;
      },
      setUserRating(state, { payload }) {
         state.userRating = payload;
      },
      setMovieRating(state, { payload }) {
         state[MOVIE].rating = payload;
      },
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


export const { setMovie, setPoster, resetError, setUserRating, setMovieRating } = movieSlice.actions;

export default movieSlice.reducer;