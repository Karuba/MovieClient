import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import UserDescription from '../components/profile/userDescription'
import * as entity from '../redux/entitiesConst'
import Movies from '../components/movies/movieTiles'
import { fetchUserMovies, posterDownload } from '../redux/reducers/authSlice'

const UserProfile = () => {

   const dispatch = useDispatch();
   const { loading,
      userInfo,
      avatar,
      error,
      userMovies,
      totalUserMovies,
      movieLoading,
      movieError,
      movieSuccess,
      pagination,
   } = useSelector((state) => state.auth)

   const getMovies = () => {
      if (userInfo?.userName)
         dispatch(fetchUserMovies({ pagination, userName: userInfo.userName }))
   }

   useEffect(() => {
      getMovies();
   }, [userMovies?.length])

   const getPoster = (id, image) => {
      dispatch(posterDownload({ id, posterName: image }))
   }

   const navigate = useNavigate()

   useEffect(() => {
      if (!userInfo)
         navigate('/login')
   }, [navigate, userInfo])

   return (
      <>
         <div style={{ minHeight: 250 }}>
            {userInfo && <UserDescription userInfo={userInfo} avatar={avatar} />}
            <Movies {...{ error: movieError, loading: movieLoading, success: movieSuccess, movies: userMovies, getPoster }} />
         </div>
      </>
   )
}

export default UserProfile