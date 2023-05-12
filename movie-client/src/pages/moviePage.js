import { useParams, Link } from "react-router-dom";
import { MOVIE } from "../redux/entitiesConst";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchMovie, posterDownload } from "../redux/reducers/movieSlice";
import Error from '../components/common/error';
import { PlayCircleOutlined, UserOutlined } from '@ant-design/icons';
import "./styles/moviePage.css";
import { DARK_COLOR, LIGHT_COLOR } from "../common/designConst";
import { Rate } from "antd";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const MoviePage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { [MOVIE]: movie, loading, success, error } = useSelector(state => state[MOVIE]);

   const [rateValue, setRateValue] = useState(5);

   const getMovie = (id) => {
      console.log('movie');
      dispatch(fetchMovie({ id }));
   }

   const getPoster = (image) => {
      console.log('poster');
      dispatch(posterDownload({ posterName: image }))
   }

   useEffect(() => {
      if (!movie)
         getMovie(id);
      if (movie && movie?.image && !movie.poster)
         getPoster(movie.image)
      if (movie) {
         setRateValue(movie?.rating);
         movie?.id !== id && getMovie(id);
      }


      console.log('movie: ', movie);

   }, [movie]);

   return (
      <>
         {loading
            ? "LOADING..."
            :
            !success
               ? <Error>{"Something went wrong: " + error}</Error>
               :
               <>
                  <div className="movie-main" style={{ backgroundImage: `url(${movie?.poster})` }}>
                     <div className="movie-container">
                        <div className="movie-poster">
                           <img src={movie?.poster} alt={movie?.name} />
                        </div>
                        <div className="movie-info">
                           <div className="movie-title">
                              {movie?.name}
                           </div>
                           <div className="movie-details">
                              <div className="set">
                                 <label>Release Date</label>
                                 <span>March 3, 2021</span>
                              </div>
                              <div className="set">
                                 <label>Release Date</label>
                                 <span>March 3, 2021</span>
                              </div>
                              <div className="set">
                                 <label>Release Date</label>
                                 <span>March 3, 2021</span>
                              </div>
                           </div>
                           <div className="movie-desc">
                              {movie?.description}
                           </div>
                           <div className="movie-rating">
                              <label>
                                 Movie Rating:
                              </label>
                              <Rate tooltips={desc} onChange={setRateValue} value={rateValue}></Rate>
                           </div>
                           <div className="movie-starring" >
                              <header>
                                 Movie Cast
                              </header>
                              <div className="starring-list">
                                 {movie?.starrings?.map(star => (
                                    <div className="starring">
                                       <div className="starring-img"><UserOutlined style={{ color: LIGHT_COLOR, fontSize: 100 }} /></div>
                                       <label>{star.firstName + " " + star.secondName}</label>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </>
         }
      </>
   )
}

export default MoviePage;