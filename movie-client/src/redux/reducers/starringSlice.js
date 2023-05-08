import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { STARRING } from "../entitiesConst"

const defaultPagination = {
   pageNumber: 1,
   pageSize: 5,
   firstName: "",
   secondName: "",
}

const initialState = {
   [STARRING]: [],
   success: null,
   error: null,
   loading: null,
   deleteLoading: null,
   createLoading: null,
   editLoading: null,
   totalStarring: null,
   defaultPagination: {
      ...defaultPagination
   },
   pagination: {
      ...defaultPagination
   }
}

export const fetchStarring = createAsyncThunk(
   `${STARRING}/fetchStarring`,
   async function (pagination, { rejectWithValue, dispatch }) {
      try {

         //console.log('query address: ' + axios.PATH_GET_MOVIES_WITH_PARAMS(pageParams));
         await createRequest({
            method: axios.GET, url: axios.PATH_GET_STARRING_WITH_PARAMS(pagination),
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               return data;
            },
            redux_cfg: {
               dispatch,
               actions: [setStarring, setTotalStarring]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

export const deleteStarring = createAsyncThunk(
   `${STARRING}/deleteStarring`,
   async ({ id }, { rejectWithValue }) => {
      try {
         await createRequest({
            method: axios.DELETE, url: axios.PATH_DELETE_STAR({ id }),
         })
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

export const createStar = createAsyncThunk(
   `${STARRING}/createStar`,
   async function (newStar, { rejectWithValue }) {
      try {
         await createRequest({
            method: axios.POST, url: axios.PATH_POST_STAR,
            body: {
               ...newStar
            }
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const editStar = createAsyncThunk(
   `${STARRING}/editStar`,
   async function (newStar, { rejectWithValue }) {
      try {
         await createRequest({
            method: axios.PUT, url: axios.PATH_PUT_STAR({ id: newStar.id }),
            body: {
               ...newStar
            }
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const starringSlice = createSlice({
   name: STARRING,
   initialState,
   reducers: {
      setStarring(state, { payload }) {
         state[STARRING] = payload.starring;
      },
      setTotalStarring(state, { payload }) {
         state.totalStarring = payload.quantity;
      },
      setPageNumber(state, { payload }) {
         state.pagination.pageNumber = payload;
      }
   },
   extraReducers: {
      [fetchStarring.pending]: (state) => {
         state.loading = true;
         state.error = null;
      },
      [fetchStarring.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
      },
      [fetchStarring.rejected]: (state, { payload }) => {
         state.loading = false;
         state.error = payload;
      },
      [deleteStarring.pending]: (state) => {
         state.deleteLoading = true;
         state.error = null;
      },
      [deleteStarring.fulfilled]: (state) => {
         state.deleteLoading = false;
      },
      [deleteStarring.rejected]: (state, { payload }) => {
         state.deleteLoading = false;
         state.error = payload;
      },
      [createStar.pending]: (state) => {
         state.createLoading = true;
         state.error = null;
      },
      [createStar.fulfilled]: (state) => {
         state.createLoading = false;
      },
      [createStar.rejected]: (state, { payload }) => {
         state.createLoading = false;
         state.error = payload;
      },
      [editStar.pending]: (state) => {
         state.editLoading = true;
         state.error = null;
      },
      [editStar.fulfilled]: (state) => {
         state.editLoading = false;
      },
      [editStar.rejected]: (state, { payload }) => {
         state.editLoading = false;
         state.error = payload;
      },
   }
});


export const { setStarring, setTotalStarring, setPageNumber } = starringSlice.actions;

export default starringSlice.reducer;