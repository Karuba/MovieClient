import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MOVIES } from '../../redux/entitiesConst';
import { fetchMovies } from '../../redux/reducers/moviesSlice';
import { Space, Spin } from 'antd';
import Tile from './components/tile';


const Movies = ({ error, loading, success, movies, getPoster }) => {

   return (
      <Space style={{ justifyContent: "space-around", alignItems: "center", height: "100%", width: "100%" }}>
         {error && <span style={{ color: "#DC4038" }}>{error}</span>}
         {loading ?
            <Spin tip="Loading..." size="large" />
            :
            success ?
               <>
                  {movies?.map(movie =>
                     <Tile key={movie.id} content={movie} getPoster={getPoster} />
                  )}
               </>
               :
               <></>
         }
      </Space>
   );
}

export default Movies;