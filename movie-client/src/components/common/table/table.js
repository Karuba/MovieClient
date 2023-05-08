import { useState } from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import './table.css'

const EntitiesTable = ({
   style,
   entities,
   totalEntities,
   nameRefColumn = false,
   hiddenColumns,
   loading,
   arrayRender,
   actionRender,
   extractEntities,
   addingExpandable,
   unsortedColumns,
   pagination,
   changePageNumber
}) => {

   //const [pageNum, setPageNum] = useState(pagination.pageNumber);
   /* const [pageSize, setPageSize] = useState(pagination.pageSize); */
   //const [sortField, setSortField] = useState(table.INITIAL_ORDER_FIELD);
   //const [sortOrder, setSortOrder] = useState(table.ASC_ORDER);

   const dataSource = entities.map(entity => nameRefColumn ?
      ({
         key: entity.id,
         ...entity,
         name: <Link to={`/book/${entity.id}`} entity={entity} style={{ color: "black" }}> {entity.name}</Link >
      })
      :
      ({
         key: entity.id,
         ...entity,
      }));

   const columns = (entityEntries) => {
      const cols = entityEntries.map(entityEntry => !hiddenColumns.find(column => column === entityEntry[0]) ?
         ({
            title: <div className={!unsortedColumns?.find(column => column === entityEntry[0]) && 'headerCell'}>{entityEntry[0].charAt(0).toUpperCase() + entityEntry[0].slice(1)}</div>,
            dataIndex: entityEntry[0],
            key: entityEntry[0],
            align: "center",
            render: Array.isArray(entityEntry[1]) && arrayRender,
            onHeaderCell: unsortedColumns?.find(column => column === entityEntry[0]) ?
               null
               :
               (column) => {
                  return {
                     onClick: () => {
                        console.log(column);
                        //setSortField(column.dataIndex);
                        //setSortOrder(sortOrder === table.ASC_ORDER ? table.DESC_ORDER : table.ASC_ORDER);
                        //extractEntities({ pageNumber: pageNum, pageSize: pageSize, sortField: column.dataIndex, sortOrder: sortOrder === table.ASC_ORDER ? table.DESC_ORDER : table.ASC_ORDER });

                     }
                  };
               },
         }) :
         null
      ).filter(entityEntry => !!entityEntry);

      !!actionRender && cols.push({
         title: "Action",
         dataIndex: "action",
         key: "action",
         align: "center",
         render: actionRender,
      })
      return cols;
   }

   return (
      <Table
         style={style}
         dataSource={dataSource}
         columns={!!entities && entities?.length != 0 && columns(Object.entries(entities[0]))}
         loading={loading}
         bordered
         pagination={{
            current: pagination.pageNumber,
            pageSize: pagination.pageSize,
            total: totalEntities,
            onChange: (page, pageSize) => {
               //setPageNum(page);
               //setPageSize(pageSize);
               changePageNumber(page)
               //extractEntities();
               //extractEntities({ pageNum: page, pageSize: pageSize, sortField: sortField, sortOrder: sortOrder });
            }
         }}
         expandable={{
            expandedRowRender: addingExpandable,
         }}
      >
      </Table>
   )
}

export default EntitiesTable;