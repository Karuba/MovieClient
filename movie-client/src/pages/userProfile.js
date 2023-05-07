import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import UserDescription from '../components/profile/userDescription'
import * as entity from '../redux/entitiesConst'

const UserProfile = () => {

   const { loading, userInfo, avatar, error } = useSelector((state) => state.auth)

   const navigate = useNavigate()

   useEffect(() => {
      if (!userInfo)
         navigate('/login')
   }, [navigate, userInfo])

   return (
      <>
         <div style={{ minHeight: 250 }}>
            {userInfo && <UserDescription userInfo={userInfo} avatar={avatar} />}
         </div>
      </>
   )
}

export default UserProfile