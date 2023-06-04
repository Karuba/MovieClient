import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createDownloadRequest, createRequest } from '../../common/requestGenerator';
import * as axios from "../../lib/actionAxiosTypes";
import { AUTH } from "../entitiesConst"

const userToken = localStorage.getItem('userToken')
   ? localStorage.getItem('userToken')
   : null

const userInfo = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null

const setLocalStoreToken = ({ userInfo, userToken }) => {
   console.log({ userInfo, userToken });
   if (!userInfo && !userToken)
      return;
   localStorage.setItem(`userInfo`, JSON.stringify(userInfo));
   localStorage.setItem(`userToken`, `Bearer ${userToken}`);
}

const removeLocalStoreToken = () => {
   localStorage.removeItem(`userInfo`);
   localStorage.removeItem(`userToken`);
}

const initialState = {
   loading: false,
   success: false,
   error: null,
   userInfo,
   userToken,
   avatar: null,
   userMovies: null,
   totalUserMovies: null,
   movieLoading: null,
   movieError: null,
   movieSuccess: null,
   pagination: {
      pageNumber: 1,
      pageSize: 5,
      movieName: "",
      newMovies: false,
   },
}



export const registerUser = createAsyncThunk(
   `${AUTH}/registerUser`,
   async ({ userName, password }, { rejectWithValue }) => {
      try {
         await createRequest({
            method: axios.POST, url: axios.PATH_USER_REGISTER,
            body: {
               userName,
               password,
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

export const userLogin = createAsyncThunk(
   `${AUTH}/userLogin`,
   async ({ userName, password }, { rejectWithValue, dispatch }) => {
      try {
         await createRequest({
            method: axios.POST, url: axios.PATH_USER_LOGIN,
            body: {
               userName, password,
            },
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               return { userName: data.user.userName, roles: data.user.roles, userToken: data.token };
            },
            redux_cfg: {
               dispatch,
               actions: [setUserInfo, setUserToken]
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

export const userLogout = createAsyncThunk(
   `${AUTH}/userLogout`,
   async (_, { rejectWithValue, dispatch }) => {
      try {

         dispatch(removeUserInfo());
         dispatch(removeUserToken());

      } catch (error) {
         if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
         } else {
            return rejectWithValue(error.message)
         }
      }
   }
)

export const fetchUserMovies = createAsyncThunk(
   `${AUTH}/fetchUserMovies`,
   async function ({ pagination, userName }, { rejectWithValue, dispatch }) {
      try {

         await createRequest({
            method: axios.GET, url: axios.PATH_GET_USER_MOVIES_WITH_PARAMS({ ...pagination, userName }),
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               return data;
            },
            redux_cfg: {
               dispatch,
               actions: [setUserMovies, setTotalUserMovies]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

export const posterDownload = createAsyncThunk(
   `${AUTH}/posterDownload`,
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

/* export const avatarDownload = createAsyncThunk(
   `${entities.AUTH}/avatarDownload`,
   async function ({ id }, { rejectWithValue, dispatch }) {
      try {
         createDownloadRequest({
            url: axios.PATH_EXTRACT_AVATAR({ id }),
            postCallback: (response => ({
               avatar: URL.createObjectURL(response.data),
            })),
            redux_cfg: {
               dispatch,
               actions: [setAvatar]
            }
         })

      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);
 */

/* export const putUser = createAsyncThunk(
   `${entities.AUTH}/putUser`,
   async function ({ user, avatar }, { rejectWithValue }) {
      try {
         if (avatar) {
            const formData = new FormData();
            formData.append("file", avatar);

            await createRequest({
               method: axios.POST, url: axios.PATH_UPLOAD_AVATAR,
               body: formData,
               axios_cfg: {
                  "Content-Type": "multipart/form-data"
               }
            })
         }


         /* let isExist = avatar.length;
         const formData = new FormData();
         formData.append("file", data.fileList[0]);

         const responseData = isExist ? await createRequest({
            method: axios.POST, url: axios.PATH_UPLOAD_FILE,
            body: formData,
            axios_cfg: {
               "Content-Type": "multipart/form-data"
            },
            postCallback: (dataAfter) => {
               const { data } = dataAfter;
               return data;
            }
         })
            :
            null;

         await createRequest({
            method: axios.PUT, url: axios.PATH_PUT_BOOK,
            body: {
               ...putBookDto(data, { name: data?.fileList[0]?.name, path: responseData }, isExist),
            },
            postCallback: (dataAfter) => {
               console.log(axios.POST);                                           ///
               const { data } = dataAfter;
               console.log(data);                    ///
               return data;
            }
         }) */
/*
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);
 */

const authSlice = createSlice({
   name: AUTH,
   initialState,
   reducers: {
      setUserInfo(state, { payload }) {
         state.userInfo = payload;
      },
      setUserToken(state, { payload }) {
         state.userToken = payload.userToken;
         setLocalStoreToken({ userInfo: payload, userToken: payload.userToken });
      },
      removeUserInfo(state, { payload }) {
         state.userInfo = payload;
      },
      removeUserToken(state, { payload }) {
         state.userToken = payload;
         removeLocalStoreToken();
      },
      setSuccess(state, { payload }) {
         state.success = payload;
      },
      setAvatar(state, { payload }) {
         state.avatar = payload.avatar;
      },
      setUserMovies(state, { payload }) {
         state.userMovies = payload.movies.map(m => ({ ...m, poster: null }));;
      },
      setTotalUserMovies(state, { payload }) {
         state.totalMovies = payload.quantity;
      },
      setPoster(state, { payload }) {
         const index = state.userMovies.findIndex(m => m.id === payload.id);
         if (index || index === 0)
            state.userMovies[index].poster = payload.poster;
      },
   },
   extraReducers: {
      // login user
      [userLogin.pending]: (state) => {
         state.loading = true;
         state.error = null;
         state.success = false;
      },
      [userLogin.fulfilled]: (state) => {
         state.loading = false;
         state.success = true;
         //state.userInfo = payload
         //state.userToken = payload.userToken
      },
      [userLogin.rejected]: (state, { payload }) => {
         state.loading = false
         state.error = payload
      },
      // register user
      [registerUser.pending]: (state) => {
         state.loading = true;
         state.error = null;
         state.success = false;
      },
      [registerUser.fulfilled]: (state) => {
         state.loading = false
         state.success = true
      },
      [registerUser.rejected]: (state, { payload }) => {
         state.loading = false
         state.error = payload
      },
      [fetchUserMovies.pending]: (state) => {
         state.movieLoading = true;
         state.movieError = null;
      },
      [fetchUserMovies.fulfilled]: (state) => {
         state.movieLoading = false;
         state.movieSuccess = true;
      },
      [fetchUserMovies.rejected]: (state, { payload }) => {
         state.movieLoading = false;
         state.movieError = payload;
      },
   },
})

export const { setUserInfo, setUserToken, removeUserInfo, removeUserToken, setSuccess, setAvatar, setUserMovies, setTotalUserMovies, setPoster } = authSlice.actions;

export default authSlice.reducer