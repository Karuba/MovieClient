import { configureStore } from "@reduxjs/toolkit"
import movieReducer from './reducers/movieSlice';
import { MOVIES } from './entitiesConst'

export default configureStore({
   reducer: {
      [MOVIES]: movieReducer,
   }
});