import { configureStore } from "@reduxjs/toolkit"
import movieReducer from './reducers/movieSlice';
import authReducer from './reducers/authSlice';
import { MOVIES, AUTH, STARRING } from './entitiesConst'
import starringReducer from "./reducers/starringSlice";

export default configureStore({
   reducer: {
      [MOVIES]: movieReducer,
      [AUTH]: authReducer,
      [STARRING]: starringReducer,
   }
});