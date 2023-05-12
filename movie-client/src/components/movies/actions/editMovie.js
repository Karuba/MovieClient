import { Button, Modal, Form, Input, AutoComplete, Upload, Space, Tag, Select } from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MOVIES, STARRING } from '../../../redux/entitiesConst';
import {
   descriptionAutoSize,
   movieNameValidation,
   uploadCharacters,
   uploadImgValidator,
   validateDescription
} from '../../../redux/contracts/movieContracts';
import { fetchStarring } from '../../../redux/reducers/starringSlice';
import { editMovie, posterDownload } from '../../../redux/reducers/moviesSlice';
import UploadPoster from './uploadPoster';

const EditMovie = ({ record, getMovies }) => {

   const [form] = Form.useForm();
   useEffect(() => {
      form.setFieldsValue({
         ...record,
         starring: record.starrings.map(star => ({
            label: star.firstName + " " + star.secondName,
            value: star.id,
         }))
      });
   }, [record]);

   const layout = {
      labelCol: {
         span: 5,
      },
      wrapperCol: {
         span: 18,
      },
   };

   const handleChange = (value) => {
      console.log(`selected ${value}`);
   };

   const dispatch = useDispatch();
   const { error, editLoading, editSuccess } = useSelector(state => state[MOVIES])
   const { [STARRING]: starring, loading, defaultPagination } = useSelector(state => state[STARRING])

   const [open, setOpen] = useState(false);
   const [options, setOptions] = useState([]);
   const [poster, setPoster] = useState(null);

   const getPoster = (id, image) => {
      dispatch(posterDownload({ id, posterName: image }))
   }

   useEffect(() => {
      if (record.image)
         getPoster(record.id, record.image);
   }, [])

   const showModal = async () => {
      setOpen(true);

      if (starring)
         await dispatch(fetchStarring(defaultPagination));

      setOptions(state =>
         state = starring.map(star => ({
            label: star.firstName + " " + star.secondName,
            value: star.id,
         }))

      );
   };

   const handleSubmit = async (values) => {
      const { uploadFiles, ...rest } = values
      const formData = new FormData();
      formData.append("poster", poster)
      formData.append("name", values.name);
      formData.append("starring", JSON.stringify(values.starring?.map(star =>
         typeof star === "object"
            ? { starringId: star.value }
            : { starringId: star }
      ) ?? []));

      formData.append("description", values.description);
      formData.append("image", record.image);
      console.log('formData: ', formData);

      const newMovie = {
         ...rest,
         starring: values.starring?.map(star => ({ starringId: star })) ?? [],
         poster: formData,
      }

      console.log('values: ', values);
      console.log('newMovie: ', newMovie);


      if (finish || !uploadFiles) {
         await dispatch(editMovie({ id: record.id, newMovie: formData }));
      }
   };

   useEffect(() => {
      if (editSuccess) {
         setOpen(false);
         getMovies();
         form.resetFields();
      }
   }, [editSuccess])

   const handleCancel = () => {
      setOpen(false);
   };

   const [finish, setFinish] = useState(false);

   return (
      <>
         <Button type='link' onClick={showModal}>
            <EditOutlined />
         </Button>
         <Modal
            title="Create a movie"
            open={open}
            onOk={handleSubmit}
            confirmLoading={editLoading}
            onCancel={handleCancel}
            footer={
               <>
                  {error && <h3>Server error: {error}</h3>}
               </>
            }
            maskClosable={false}
         >
            <Form
               form={form}
               autoComplete="off"
               {...layout}
               onFinish={(values => {
                  handleSubmit(values);
               })}
            >
               <Form.Item name="uploadFiles" label="Your File"

                  valuePropName='fileList'
                  getValueFromEvent={(event) => {
                     return event?.fileList
                  }}
                  rules={uploadImgValidator(setFinish)}
               >
                  <UploadPoster setPoster={setPoster} previousPoster={record.poster} />
               </Form.Item>
               <Form.Item name="name" label="Name"
                  rules={movieNameValidation}
               >
                  <Input placeholder="enter the movie's name" />
               </Form.Item>

               <Form.Item name="description" label="Description"
                  rules={validateDescription}
               >
                  <Input.TextArea placeholder='enter the description'
                     autoSize={descriptionAutoSize}
                  />
               </Form.Item>

               <Form.Item name="starring" label="Starring" >
                  <Select
                     mode="multiple"
                     allowClear
                     placeholder="Please select"
                     onChange={handleChange}
                     options={options}
                  /* defaultValue={record.starrings.map(star => ({
                     label: star.firstName + " " + star.secondName,
                     value: star.id,
                  }))} */
                  />
               </Form.Item>
               <Form.Item style={{ display: "flex", justifyContent: "right" }}>
                  <Button htmlType='submit' loading={editLoading || loading}><SaveOutlined /> Save movie</Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default EditMovie;