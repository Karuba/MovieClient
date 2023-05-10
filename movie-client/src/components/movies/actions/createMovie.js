import { Button, Modal, Form, Input, AutoComplete, Upload, Space, Tag, Select } from 'antd';
import { FileAddOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons'
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
import { createMovie, fetchMovies } from '../../../redux/reducers/movieSlice';
import UploadPoster from './uploadPoster';

const CreateMovie = () => {

   const layout = {
      labelCol: {
         span: 5,
      },
      wrapperCol: {
         span: 18,
      },
   };

   /* const options = [];
   for (let i = 10; i < 36; i++) {
      options.push({
         label: i.toString(36) + i,
         value: i.toString(36) + i,
      });
   } */
   const handleChange = (value) => {
      console.log(`selected ${value}`);
   };

   const dispatch = useDispatch();
   const { error, createLoading, pagination, createSuccess } = useSelector(state => state[MOVIES])
   const { [STARRING]: starring, loading, defaultPagination } = useSelector(state => state[STARRING])

   const [open, setOpen] = useState(false);
   /* const [data, setData] = useState([]); */
   const [options, setOptions] = useState([]);
   const [form] = Form.useForm();
   const [poster, setPoster] = useState(null);

   /* const addData = () => {
      const field = form.getFieldValue("starring")
      const star = field.split(' ')
      const add = starring.find(s => s.firstName === star[0] && s.secondName === star[1]);
      if (add)
         setData([...data, add]);

      form.resetFields();
   } */

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
      formData.append("starring", values.starring?.map(star => ({ starringId: star })) ?? [])
      formData.append("description", values.description);
      console.log('formData: ', formData);

      const newMovie = {
         ...rest,
         starring: values.starring?.map(star => ({ starringId: star })) ?? [],
         poster: formData,
      }

      console.log('values: ', values);
      console.log('newMovie: ', newMovie);


      if (finish || !uploadFiles) {
         await dispatch(createMovie(formData));
      }
   };

   useEffect(() => {
      if (createSuccess) {
         setOpen(false);
         dispatch(fetchMovies(pagination));
         form.resetFields();
      }
   }, [createSuccess])

   const handleCancel = () => {
      setOpen(false);
   };

   const [fileList, setFileList] = useState([]);
   const [finish, setFinish] = useState(false);

   return (
      <>
         <Button onClick={showModal}>
            <FileAddOutlined /> create a new movie
         </Button>
         <Modal
            title="Create a movie"
            open={open}
            onOk={handleSubmit}
            confirmLoading={createLoading}
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
                  <UploadPoster setPoster={setPoster} />
                  {/* <Upload
                     maxCount={uploadCharacters.maxCount}
                     customRequest={(info) => {
                        setFileList([info.file]);
                     }}
                     showUploadList={false}
                     accept={uploadCharacters.accept}
                  >
                     <Button>Upload</Button>
                     {fileList[0]?.name}
                  </Upload> */}
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

               <Form.Item name="starring" label="Starring"
               /* rules={[
                  {
                     validator(_, value) {
                        return new Promise((resolve, reject) => {
                           starring.find((star) => star.firstName + " " + star.secondName === value) ?
                              resolve("Success!") :
                              reject("The star is not correct");
                        })
                     }
                  }
               ]} */
               >
                  {/* <AutoComplete
                     options={starring.map((star) => ({ value: star.firstName + " " + star.secondName }))}
                     placeholder="Please enter the topic"
                     filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                     }
                  /> */}
                  <Select
                     mode="multiple"
                     allowClear
                     placeholder="Please select"
                     onChange={handleChange}
                     options={options}
                  />
               </Form.Item>
               {/* <div style={{ display: "flex", justifyContent: "right", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ display: "flex" }}>
                     {data?.map(starring => <Tag color={"volcano"} key={starring.firstName + starring.secondName}>{starring.firstName + " " + starring.secondName}</Tag>)}
                  </div>
                  <Button type="link" onClick={addData} ><PlusOutlined /></Button>
               </div> */}



               <Form.Item style={{ display: "flex", justifyContent: "right" }}>
                  <Button htmlType='submit' loading={createLoading || loading}><SaveOutlined /> Save movie</Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default CreateMovie;