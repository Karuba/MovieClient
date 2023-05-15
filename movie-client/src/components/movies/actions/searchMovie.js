import { Input, Space, Button, Form } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchMovieName } from "../../../redux/reducers/moviesSlice";

const SearchMovie = () => {
   const [movieName, setMovieName] = useState("");

   const dispatch = useDispatch();

   const handleSearch = () => {
      if (movieName) {
         dispatch(setSearchMovieName(movieName));
      }
   }

   return (
      <Form component={false}>
         <Form.Item name="name" label="Name" style={{ margin: 0 }}
         >
            <Space >
               <Input value={movieName} onChange={(e) => setMovieName(e.target.value)} />
               <Button onClick={handleSearch} ><SearchOutlined /></Button>
            </Space>
         </Form.Item>
      </Form>
   )
}

export default SearchMovie;