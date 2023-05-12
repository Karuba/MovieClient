import { Space, Button, Popconfirm, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarring, setPageNumber, deleteStarring } from '../../redux/reducers/starringSlice';
import { MOVIES, STARRING } from '../../redux/entitiesConst'
import { useEffect } from 'react';
import Table from '../common/table/table'
import { DeleteOutlined } from '@ant-design/icons'
import CreateStarring from './actions/createStarring';
import EditStarring from './actions/editStarring';
import { fetchMovies } from '../../redux/reducers/moviesSlice';
/* import CreateMovie from './actions/createMovie'; */


const StarringTable = () => {
   const { error, loading, [STARRING]: starring, success, totalStarring, pagination, deleteLoading } = useSelector(state => state[STARRING]);
   const { pagination: moviePagination } = useSelector(state => state[MOVIES]);

   const dispatch = useDispatch();

   const getMovies = () =>
      dispatch(fetchMovies(moviePagination));

   const getStarring = () =>
      dispatch(fetchStarring(pagination));

   const changePageNumber = (page) => {
      dispatch(setPageNumber(page));
   }

   useEffect(() => {
      getStarring();
   }, [pagination])

   const hiddenColumns = [
      "id"
   ]

   const deleteHandler = async (record) => {
      await dispatch(deleteStarring({ id: record.id }));
      getStarring();
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
         <div style={{ width: "50px" }}>
            <EditStarring record={record} getMovies={getMovies} />
         </div>
         <div style={{ width: "50px" }}>
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


   return (
      <>
         <div>
            <h2>Starring:</h2>
            {error && <h3>{error}</h3>}
         </div>
         <div style={{ marginBottom: 10 }}>
            <CreateStarring />
         </div>
         {success &&
            <Table
               style={{
                  width: 1000
               }}
               entities={starring}
               totalEntities={totalStarring}
               hiddenColumns={hiddenColumns}
               loading={loading}
               nameRefColumn={false}
               changePageNumber={changePageNumber}
               actionRender={actionRender}
               extractEntities={getStarring}
               pagination={pagination}
            />}
      </>
   )
}

export default StarringTable;