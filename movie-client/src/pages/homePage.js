import { useEffect } from 'react';
import Movies from '../components/movies/movieTiles'
import { Space } from 'antd';
import { DARK_COLOR } from '../common/designConst';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, posterDownload } from '../redux/reducers/moviesSlice';
import { AUTH, BEST_MOVIES, MOVIES, NEW_MOVIES, REC_MOVIES } from '../redux/entitiesConst';
import { fetchNewMovies, newMoviePosterDownload } from '../redux/reducers/newMoviesSlice';
import { fetchRecMovies, recMoviePosterDownload } from '../redux/reducers/recMoviesSlice';
import { bestMoviePosterDownload, fetchBestMovies } from '../redux/reducers/bestMoviesSlice';


const HomePage = () => {
  useEffect(() => {
    console.log('HomePage');

  }, []);

  const { userInfo } = useSelector(state => state[AUTH]);

  const dispatch = useDispatch();

  const {
    error,
    loading,
    success,
    [MOVIES]: movies,
    pagination
  } = useSelector(state => state[MOVIES]);

  const {
    error: newError,
    loading: newLoading,
    success: newSuccess,
    [NEW_MOVIES]: newMovies,
    pagination: newPagination
  } = useSelector(state => state[NEW_MOVIES]);

  const {
    error: recError,
    loading: recLoading,
    success: recSuccess,
    [REC_MOVIES]: recMovies,
    pagination: recPagination
  } = useSelector(state => state[REC_MOVIES]);

  const {
    error: bestError,
    loading: bestLoading,
    success: bestSuccess,
    [BEST_MOVIES]: bestMovies,
    pagination: bestPagination
  } = useSelector(state => state[BEST_MOVIES]);

  //Movies
  const getMovies = () => {
    dispatch(fetchMovies(pagination))
  }

  useEffect(() => {
    if (!movies)
      getMovies();
  })

  const getPoster = (id, image) => {
    dispatch(posterDownload({ id, posterName: image }))
  }

  //NewMovies
  const getNewMovies = () => {
    dispatch(fetchNewMovies(newPagination))
  }

  useEffect(() => {
    if (!newMovies)
      getNewMovies();
  })

  const getNewMoviePoster = (id, image) => {
    dispatch(newMoviePosterDownload({ id, posterName: image }))
  }

  //recMovies
  const getRecMovies = ({ userName }) => {
    dispatch(fetchRecMovies(userName))
  }

  useEffect(() => {
    if (userInfo?.userName)
      getRecMovies({ userName: userInfo.userName });
  }, [userInfo])

  const getRecMoviePoster = (id, image) => {
    dispatch(recMoviePosterDownload({ id, posterName: image }))
  }

  //BestMovies
  const getBestMovies = () => {
    dispatch(fetchBestMovies(bestPagination))
  }

  useEffect(() => {
    if (userInfo?.userName)
      getBestMovies();
  }, [userInfo])

  const getBestMoviePoster = (id, image) => {
    dispatch(bestMoviePosterDownload({ id, posterName: image }))
  }

  return (
    <div style={{
      padding: 50,
      height: "100%",
      width: "100%",
    }}>
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        marginBottom: 50,
      }}>
        <div style={{
          fontSize: 50,
          backgroundColor: "rgb(186, 175, 175, 0.6)",
          borderRadius: 24,
          height: 85,
          width: 300,
          textAlign: "center",
        }}>
          <span style={{
            display: "inline-block",
            verticalAlign: "middle",
            lineHeight: "normal",
          }}>Movie Store:</span>
        </div>
      </div>
      <Movies {...{ error, loading, success, movies, getPoster }} />
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        marginBottom: 50,
      }}>
        <div style={{
          fontSize: 50,
          backgroundColor: "rgb(186, 175, 175, 0.6)",
          borderRadius: 24,
          height: 85,
          width: 300,
          textAlign: "center",
        }}>
          <span style={{
            display: "inline-block",
            verticalAlign: "middle",
            lineHeight: "normal",
          }}>New Movie Store:</span>
        </div>
      </div>
      <Movies {...{ error: newError, loading: newLoading, success: newSuccess, movies: newMovies, getPoster: getNewMoviePoster }} />
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        marginBottom: 50,
      }}>
        <div style={{
          fontSize: 50,
          backgroundColor: "rgb(186, 175, 175, 0.6)",
          borderRadius: 24,
          height: 85,
          width: 300,
          textAlign: "center",
        }}>
          <span style={{
            display: "inline-block",
            verticalAlign: "middle",
            lineHeight: "normal",
          }}>Your Recommendation Movies Store:</span>
        </div>
      </div>
      <Movies {...{ error: recError, loading: recLoading, success: recSuccess, movies: recMovies, getPoster: getRecMoviePoster }} />
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        marginBottom: 50,
      }}>
        <div style={{
          fontSize: 50,
          backgroundColor: "rgb(186, 175, 175, 0.6)",
          borderRadius: 24,
          height: 85,
          width: 300,
          textAlign: "center",
        }}>
          <span style={{
            display: "inline-block",
            verticalAlign: "middle",
            lineHeight: "normal",
          }}>Best Movies Store:</span>
        </div>
      </div>
      <Movies {...{ error: bestError, loading: bestLoading, success: bestSuccess, movies: bestMovies, getPoster: getBestMoviePoster }} />
    </div>
  )
}

export default HomePage;