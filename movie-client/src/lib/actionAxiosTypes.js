export const GET = 'get';
export const POST = 'post';
export const DELETE = 'delete';
export const PUT = 'put';

//Movies
export const PATH_GET_MOVIES_WITH_PARAMS = ({ pageNumber, pageSize, movieName }) =>
   `/api/movie?PageNumber=${pageNumber}&PageSize=${pageSize}&MovieName=${movieName ?? ""}`;
export const PATH_DELETE_MOVIE = ({ id }) =>
   `/api/movie/${id}`;
export const PATH_POST_MOVIE = `/api/movie`;

//Auth
export const PATH_USER_REGISTER = `/api/authentication/register`;
export const PATH_USER_LOGIN = `/api/authentication/login`;

//Starring
export const PATH_GET_STARRING_WITH_PARAMS = ({ pageNumber, pageSize, firstName, secondName }) =>
   `/api/starring?PageNumber=${pageNumber}&PageSize=${pageSize}&FirstName=${firstName ?? ""}&SecondName=${secondName ?? ""}`;
export const PATH_DELETE_STAR = ({ id }) =>
   `/api/starring/${id}`;
export const PATH_POST_STAR = `/api/starring`;
export const PATH_PUT_STAR = ({ id }) => `/api/starring/${id}`;