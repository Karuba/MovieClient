import { configureStore } from "@reduxjs/toolkit"
import moviesReducer from './reducers/moviesSlice';
import authReducer from './reducers/authSlice';
import { MOVIES, AUTH, STARRING, MOVIE } from './entitiesConst'
import starringReducer from "./reducers/starringSlice";
import movieReducer from "./reducers/movieSlice";

export default configureStore({
   reducer: {
      [MOVIES]: moviesReducer,
      [AUTH]: authReducer,
      [STARRING]: starringReducer,
      [MOVIE]: movieReducer,
   }
});