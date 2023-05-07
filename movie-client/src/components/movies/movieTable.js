import { Space, Button, Popconfirm, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setPageNumber, deleteMovie } from '../../redux/reducers/movieSlice';
import { MOVIES } from '../../redux/entitiesConst'
import { useEffect } from 'react';
import Table from '../common/table/table'
/* import CreateTopic from './actions/createTopic' */
/* import EditTopic from './actions/editTopic' */
import { DeleteOutlined, DisconnectOutlined, EditOutlined, FieldBinaryOutlined, FieldTimeOutlined } from '@ant-design/icons'


const MovieTable = () => {
   const { error, loading, [MOVIES]: movies, success, totalMovies, pagination, pageNum, deleteLoading } = useSelector(state => state[MOVIES]);

   const dispatch = useDispatch();

   const getMovies = () => {
      console.log('getMovies: ', pagination, pageNum);

      dispatch(fetchMovies(pagination));
   }

   const changePageNumber = (page) => {
      dispatch(setPageNumber(page));
      console.log('changePageNumber: ', page);
   }

   useEffect(() => {
      getMovies();
   }, [pagination])

   const hiddenColumns = [
      "id"
   ]

   const deleteHandler = async (record) => {
      await dispatch(deleteMovie({ id: record.id }));
      getMovies();
   }

   /* const enableHandler = async (record) => {
      await dispatch(enableTopic({ id: record.id }));
      getAllTopics(table.pageParams);
   }

   const disableHandler = async (record) => {
      await dispatch(disableTopic({ id: record.id }));
      getAllTopics(table.pageParams);
   } */

   const actionRender = (_, record) =>
      <Space size={0}>
         <div style={{ width: "30px" }}>
            {/* <EditTopic record={record} getTopics={getAllTopics} /> */}
         </div>
         <div style={{ width: "100px" }}>
            <Space size={0}>
               <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => deleteHandler(record)}
               >
                  <Button danger type='link' style={{ padding: "0 0 0 10px" }} loading={deleteLoading}><DeleteOutlined /></Button>
               </Popconfirm>
            </Space>
         </div>

      </Space>

   const arrayRender = (_, { starrings }) => (
      <>
         {starrings.map((starring) => {
            let color = 'volcano';
            return (
               <Tag color={color} key={starring.firstName + starring.secondName}>
                  {starring.firstName + " " + starring.secondName}
               </Tag>
            );
         })}
      </>
   )

   return (
      <>
         <div>
            <h2>Movies:</h2>
            {error && <h3>{error}</h3>}
         </div>
         {/* <div style={{ marginBottom: 10 }}>
            <CreateTopic />
         </div> */}
         {success &&
            <Table
               entities={movies}
               totalEntities={totalMovies}
               hiddenColumns={hiddenColumns}
               loading={loading}
               nameRefColumn={true}
               arrayRender={arrayRender}
               changePageNumber={changePageNumber}
               actionRender={actionRender}
               extractEntities={getMovies}
               pagination={pagination}
            />}
      </>
   )
}

export default MovieTable;