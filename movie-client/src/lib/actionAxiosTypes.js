export const GET = 'get';
export const POST = 'post';
export const DELETE = 'delete';
export const PUT = 'put';

//Movies
export const PATH_GET_MOVIES_WITH_PARAMS = ({ PageNumber, pageSize, MovieName }) =>
   `/api/movie?PageNumber=${PageNumber}&PageSize=${pageSize}&MovieName=${MovieName ?? ""}`;
