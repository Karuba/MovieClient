import { Input, Space, Button, Form } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchStarringName } from "../../../redux/reducers/starringSlice";

const SearchStarring = () => {
   const [starringName, setStarringName] = useState("");

   const dispatch = useDispatch();

   const handleSearch = () => {
      if (starringName) {
         dispatch(setSearchStarringName(starringName));
      }
   }

   return (
      <Form component={false}>
         <Form.Item name="name" label="Name" style={{ margin: 0 }}
         >
            <Space >
               <Input value={starringName} onChange={(e) => setStarringName(e.target.value)} />
               <Button onClick={handleSearch} ><SearchOutlined /></Button>
            </Space>
         </Form.Item>
      </Form>
   )
}

export default SearchStarring;