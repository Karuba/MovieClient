import { configureStore } from "@reduxjs/toolkit"
import moviesReducer from './reducers/moviesSlice';
import authReducer from './reducers/authSlice';
import { MOVIES, AUTH, STARRING, MOVIE, NEW_MOVIES, REC_MOVIES, BEST_MOVIES } from './entitiesConst'
import starringReducer from "./reducers/starringSlice";
import movieReducer from "./reducers/movieSlice";
import newMoviesReducer from "./reducers/newMoviesSlice";
import recMoviesReducer from "./reducers/recMoviesSlice";
import bestMoviesReducer from "./reducers/bestMoviesSlice";

export default configureStore({
   reducer: {
      [MOVIES]: moviesReducer,
      [AUTH]: authReducer,
      [STARRING]: starringReducer,
      [MOVIE]: movieReducer,
      [NEW_MOVIES]: newMoviesReducer,
      [REC_MOVIES]: recMoviesReducer,
      [BEST_MOVIES]: bestMoviesReducer,
   }
});