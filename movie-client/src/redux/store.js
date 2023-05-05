import { configureStore } from "@reduxjs/toolkit"
import movieReducer from './reducers/movieSlice';
import authReducer from './reducers/authSlice';
import { MOVIES, AUTH } from './entitiesConst'

export default configureStore({
   reducer: {
      [MOVIES]: movieReducer,
      [AUTH]: authReducer,
   }
});