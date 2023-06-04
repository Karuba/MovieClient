import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDownloadRequest, createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { MOVIES } from "../entitiesConst"

const initialState = {
   [MOVIES]: null,
   searchMovies: null,
   success: null,
   error: null,
   loading: null,
   deleteLoading: null,
   createLoading: null,
   createSuccess: null,
   editLoading: null,
   editSuccess: null,
   totalMovies: null,
   pagination: {
      pageNumber: 1,
      pageSize: 5,
      movieName: "",
      newMovies: false,
   },
   searchPagination: {
      pageNumber: 1,
      pageSize: 10,
      newMovies: false,
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

export const createMovie = createAsyncThunk(
   `${MOVIES}/createMovie`,
   async function (newMovie, { rejectWithValue }) {
      try {
         await createRequest({
            method: axios.POST, url: axios.PATH_POST_MOVIE,
            body: newMovie
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const editMovie = createAsyncThunk(
   `${MOVIES}/editMovie`,
   async function ({ id, newMovie }, { rejectWithValue }) {
      try {
         await createRequest({
            method: axios.PUT, url: axios.PATH_PUT_MOVIE({ id }),
            body: newMovie
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const posterDownload = createAsyncThunk(
   `${MOVIES}/posterDownload`,
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
               actions: [setPoster]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchSearchMovies = createAsyncThunk(
   `${MOVIES}/fetchSearchMovies`,
   async function ({ searchPagination, movieName }, { rejectWithValue, dispatch }) {
      try {

         const searchParams = {
            ...searchPagination,
            movieName,
         }

         await createRequest({
            method: axios.GET, url: axios.PATH_GET_MOVIES_WITH_PARAMS(searchParams),
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               return data;
            },
            redux_cfg: {
               dispatch,
               actions: [setSearchMovies]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

const moviesSlice = createSlice({
   name: MOVIES,
   initialState,
   reducers: {
      setMovies(state, { payload }) {
         state[MOVIES] = payload.movies.map(m => ({ ...m, poster: null }));
      },
      setTotalMovies(state, { payload }) {
         state.totalMovies = payload.quantity;
      },
      setPageNumber(state, { payload }) {
         state.pagination.pageNumber = payload;
      },
      setSearchMovieName(state, { payload }) {
         state.pagination = {
            ...state.pagination,
            pageNumber: 1,
            movieName: payload,
         }
      },
      setPoster(state, { payload }) {
         const index = state[MOVIES].findIndex(m => m.id === payload.id);
         if (index || index === 0)
            state[MOVIES][index].poster = payload.poster;
      },
      setSearchMovies(state, { payload }) {
         state.searchMovies = payload.movies;
      },
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
      [createMovie.pending]: (state) => {
         state.createLoading = true;
         state.createSuccess = false;
         state.error = null;
      },
      [createMovie.fulfilled]: (state) => {
         state.createLoading = false;
         state.createSuccess = true;
      },
      [createMovie.rejected]: (state, { payload }) => {
         state.createLoading = false;
         state.error = payload;
      },
      [editMovie.pending]: (state) => {
         state.editLoading = true;
         state.editSuccess = false;
         state.error = null;
      },
      [editMovie.fulfilled]: (state) => {
         state.editLoading = false;
         state.editSuccess = true;
      },
      [editMovie.rejected]: (state, { payload }) => {
         state.editLoading = false;
         state.error = payload;
      },
   }
});


export const { setMovies, setTotalMovies, setPageNumber, setPoster, setSearchMovieName, setSearchMovies } = moviesSlice.actions;

export default moviesSlice.reducer;