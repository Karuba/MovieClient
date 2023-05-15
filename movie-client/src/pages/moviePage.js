import { useParams, Link, useNavigate } from "react-router-dom";
import { AUTH, MOVIE } from "../redux/entitiesConst";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchMovie, fetchMovieRating, fetchUserRating, posterDownload, resetError, updateUserRating } from "../redux/reducers/movieSlice";
import Error from '../components/common/error';
import { PlayCircleOutlined, UserOutlined } from '@ant-design/icons';
import "./styles/moviePage.css";
import { DARK_COLOR, LIGHT_COLOR, NIGHT_COLOR } from "../common/designConst";
import { Rate, Space } from "antd";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const MoviePage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { [MOVIE]: movie, loading, success, error, userRating } = useSelector(state => state[MOVIE]);
   const { userInfo } = useSelector(state => state[AUTH]);

   const [rateValue, setRateValue] = useState(5);

   const getMovie = (id) => {
      dispatch(fetchMovie({ id }));
      if (userInfo?.userName)
         dispatch(fetchUserRating({ id, userName: userInfo.userName }))
   }

   const getPoster = (image) => {
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
   }, [movie]);

   const navigate = useNavigate()

   useEffect(() => {
      if (error && !movie) {
         dispatch(resetError());
         navigate('/');
      }
   }, [error])

   const setRate = async (value) => {
      if (value && userInfo?.userName) {
         await dispatch(updateUserRating({ id, rating: value, userName: userInfo.userName }));
         dispatch(fetchUserRating({ id, userName: userInfo.userName }));
         dispatch(fetchMovieRating({ id }));
      }
   }

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
                           <Space size={100}>
                              <div className="movie-rating">
                                 <label>
                                    Movie Rating:
                                 </label>
                                 <Rate disabled allowHalf value={movie.rating}></Rate><span style={{ paddingLeft: 5 }}>{movie.rating}/5</span>
                              </div>
                              <div className="movie-rating">
                                 <label>
                                    My Rating:
                                 </label>
                                 <Rate tooltips={desc} onChange={setRate} value={userRating}></Rate><span style={{ paddingLeft: 5 }}>{userRating}/5</span>
                              </div>
                           </Space>
                           <div className="movie-starring" >
                              <header>
                                 Movie Cast
                              </header>
                              <div className="starring-list">
                                 {movie?.starrings?.map(star => (
                                    <div key={star.id} className="starring">
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