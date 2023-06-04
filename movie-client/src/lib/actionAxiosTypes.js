export const GET = 'get';
export const POST = 'post';
export const DELETE = 'delete';
export const PUT = 'put';

//Movies
export const PATH_GET_MOVIES_WITH_PARAMS = ({ pageNumber, pageSize, movieName, newMovies }) =>
   `/api/movie?PageNumber=${pageNumber}&PageSize=${pageSize}&MovieName=${movieName ?? ""}&NewMovies=${newMovies ?? ""}`;
export const PATH_GET_USER_MOVIES_WITH_PARAMS = ({ pageNumber, pageSize, movieName, newMovies, userName }) =>
   `/api/movie/user/${userName}?PageNumber=${pageNumber}&PageSize=${pageSize}&MovieName=${movieName ?? ""}&NewMovies=${newMovies ?? ""}`;
export const PATH_DELETE_MOVIE = ({ id }) =>
   `/api/movie/${id ?? ""}`;
export const PATH_POST_MOVIE = `/api/movie`;
export const PATH_PUT_MOVIE = ({ id }) => `/api/movie/${id ?? ""}`;
export const PATH_GET_BEST_MOVIES_WITH_PARAMS = ({ pageSize }) =>
   `/api/movie/best?PageSize=${pageSize}`;

//Predict Movie
export const PATH_GET_PREDICT_MOVIES =
   `/api/predict`;

//Movies - poster
export const PATH_EXTRACT_POSTER = ({ posterName }) =>
   `/api/movie/poster/${posterName}`;

//Movie
export const PATH_GET_MOVIE = ({ id }) =>
   `/api/movie/${id ?? ""}`;
export const PATH_USER_SET_RATING = ({ id }) =>
   `/api/movie/${id ?? ""}`;
export const PATH_USER_GET_RATING = ({ id, userName }) =>
   `/api/movie/${id ?? ""}/userRating/${userName ?? ""}`;
export const PATH_GET_MOVIE_RATING = ({ id }) =>
   `/api/movie/${id ?? ""}/movieRating`;

//Auth
export const PATH_USER_REGISTER = `/api/authentication/register`;
export const PATH_USER_LOGIN = `/api/authentication/login`;

//Starring
export const PATH_GET_STARRING_WITH_PARAMS = ({ pageNumber, pageSize, name }) =>
   `/api/starring?PageNumber=${pageNumber}&PageSize=${pageSize}&Name=${name ?? ""}`;
export const PATH_DELETE_STAR = ({ id }) =>
   `/api/starring/${id}`;
export const PATH_POST_STAR = `/api/starring`;
export const PATH_PUT_STAR = ({ id }) => `/api/starring/${id}`;