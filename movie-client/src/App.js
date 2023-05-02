import './App.css';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from './redux/reducers/movieSlice';
import { MOVIES } from './redux/entitiesConst'

function App() {
  const dispatch = useDispatch();
  const { [MOVIES]: movies } = useSelector((state) => state[MOVIES])

  const getMovies = (pageParams) => {
    dispatch(fetchMovies(pageParams));
    console.log('da');

    console.log(movies);

  }

  useEffect(() => {
    getMovies({ PageNumber: 1, pageSize: 2, MovieName: "ass" });
  }, [dispatch])

  return (
    <div className="App">
    </div>
  );
}

export default App;
