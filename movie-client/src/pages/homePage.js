import { useEffect } from 'react';
import Movies from '../components/movies/movieTiles'
import { Space } from 'antd';


const HomePage = () => {
  useEffect(() => {
    console.log('HomePage');

  }, []);

  return (
    <>
      <Movies />
    </>
  )
}

export default HomePage;