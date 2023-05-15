import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDownloadRequest, createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { REC_MOVIES } from "../entitiesConst"

const initialState = {
   [REC_MOVIES]: null,
   success: null,
   error: null,
   loading: null,
   totalMovies: null,
   pagination: {
      pageNumber: 1,
      pageSize: 5,
      movieName: "",
   }
}

export const fetchRecMovies = createAsyncThunk(
   `${REC_MOVIES}/fetchRecMovies`,
   async function (userName, { rejectWithValue, dispatch }) {
      try {

         //console.log('query address: ' + axios.PATH_GET_MOVIES_WITH_PARAMS(pageParams));
         await createRequest({
            method: axios.POST, url: axios.PATH_GET_PREDICT_MOVIES,
            body: {
               userName,
            },
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               return data;
            },
            redux_cfg: {
               dispatch,
               actions: [setRecMovies/* , setTotalRecMovies */]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

export const recMoviePosterDownload = createAsyncThunk(
   `${REC_MOVIES}/recMoviePosterDownload`,
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
               actions: [setRecMoviePoster]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const recMoviesSlice = createSlice({
   name: REC_MOVIES,
   initialState,
   reducers: {
      setRecMovies(state, { payload }) {
         state[REC_MOVIES] = payload.map(m => ({ ...m, poster: null }));
      },
      setTotalRecMovies(state, { payload }) {
         state.totalMovies = payload.quantity;
      },
      setRecMoviesPageNumber(state, { payload }) {
         state.pagination.pageNumber = payload;
      },
      setRecMoviePoster(state, { payload }) {
         const index = state[REC_MOVIES].findIndex(m => m.id === payload.id);

         if (index || index === 0)
            state[REC_MOVIES][index].poster = payload.poster;
      },
   },
   extraReducers: {
      [fetchRecMovies.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [fetchRecMovies.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [fetchRecMovies.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
   }
});


export const { setRecMovies, setTotalRecMovies, setRecMoviesPageNumber, setRecMoviePoster } = recMoviesSlice.actions;

export default recMoviesSlice.reducer;