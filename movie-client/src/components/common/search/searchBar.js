import { AutoComplete } from 'antd'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MOVIES } from '../../../redux/entitiesConst';
import { fetchSearchMovies } from '../../../redux/reducers/moviesSlice';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
   const { searchMovies, searchPagination } = useSelector(state => state[MOVIES])
   const dispatch = useDispatch();
   const navigate = useNavigate()

   const [options, setOptions] = useState([]);
   const [value, setValue] = useState([]);

   const renderItem = (title) => ({
      value: title,
      label: (
         <div
            style={{
               display: 'flex',
               justifyContent: 'space-between',
            }}
         >
            {title}
         </div>
      ),
   });

   const getPanelValue = (searchMovies) =>
      !searchMovies ? []
         :
         searchMovies.map(movie =>
            renderItem(movie.name),
         )

   const onSelect = (data) => {
      setOptions([]);
      setValue();
      const movie = searchMovies.find(movie => movie.name === data);
      if (movie)
         navigate(`/movie/${movie.id}`);
   };

   const onSearch = async (searchText) => {
      await dispatch(fetchSearchMovies({ searchPagination, movieName: searchText }));
   }

   useEffect(() => {
      if (searchMovies?.length)
         setOptions(getPanelValue(searchMovies))
   }, [searchMovies])

   return (
      <AutoComplete
         value={value}
         onChange={setValue}
         options={options}
         style={{
            width: 200
         }}
         onSelect={onSelect}
         onSearch={onSearch}
         placeholder="find your movie &#128270;"
      />
   )
}

export default SearchBar;