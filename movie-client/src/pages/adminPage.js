import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AUTH } from '../redux/entitiesConst'
import MovieTable from '../components/movies/movieTable'
import StarringTable from '../components/starring/starringTable'

const AdminPage = () => {

   const { loading, userInfo, error } = useSelector((state) => state[AUTH])
   const navigate = useNavigate()

   useEffect(() => {
      console.log(userInfo);
      if (!userInfo)
         navigate('/login')
   }, [navigate, userInfo])

   return (
      <>
         <div style={{ height: 1300 }}>
            <MovieTable />
            <StarringTable />
         </div>
      </>
   )
}

export default AdminPage