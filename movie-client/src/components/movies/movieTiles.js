import { useEffect } from 'react';
import Movie from './movie/movie'
import { useDispatch, useSelector } from 'react-redux';
import { MOVIES } from '../../redux/entitiesConst';
import { fetchMovies } from '../../redux/reducers/movieSlice';
import { Space, Spin } from 'antd';
import Tile from './components/tile';


const Movies = () => {

   const dispatch = useDispatch();
   const { error, loading, success, [MOVIES]: movies, pagination } = useSelector(state => state[MOVIES])

   const getMovies = () => {
      dispatch(fetchMovies(pagination))
   }

   useEffect(() => {
      getMovies();
   }, [])

   return (
      <Space style={{ justifyContent: "space-around", alignItems: "center", height: "100%", width: "100%" }}>
         {error && <span style={{ color: "#DC4038" }}>{error}</span>}
         {loading ?
            <Spin tip="Loading..." size="large" />
            :
            success ?
               <>
                  {movies?.map(movie =>
                     <Tile key={movie.id} content={movie} />
                  )}
               </>
               :
               <></>
         }
      </Space>
   );
}

export default Movies;