export const GET = 'get';
export const POST = 'post';
export const DELETE = 'delete';
export const PUT = 'put';

//Movies
export const PATH_GET_MOVIES_WITH_PARAMS = ({ pageNumber, pageSize, movieName }) =>
   `/api/movie?PageNumber=${pageNumber}&PageSize=${pageSize}&MovieName=${movieName ?? ""}`;
export const PATH_DELETE_MOVIE = ({ id }) =>
   `api/movie/${id}`;

//Auth
export const PATH_USER_REGISTER = `/api/authentication/register`;
export const PATH_USER_LOGIN = `/api/authentication/login`;
