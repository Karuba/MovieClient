import { Button, Modal, Form, Input, AutoComplete, Upload, Space, Tag } from 'antd';
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

const CreateMovie = () => {
   const dispatch = useDispatch();
   const { error, createLoading } = useSelector(state => state[MOVIES])
   const { [STARRING]: starring, loading, defaultPagination } = useSelector(state => state[STARRING])

   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const [form] = Form.useForm();

   const addData = () => {
      const field = form.getFieldValue("starring")
      const star = field.split(' ')
      console.log('star: ', star, "res: ", starring.find(s => s.firstName === star[0] && s.secondName === star[1]));
      const add = starring.find(s => s.firstName === star[0] && s.secondName === star[1]);
      console.log('add: ', add);
      if (add)
         setData([...data, add]);
      console.log('data: ', data);

      form.resetFields();
   }

   const showModal = () => {
      setOpen(true);
      if (starring)
         dispatch(fetchStarring(defaultPagination));
   };

   const handleSubmit = async (values) => {
      /* const newBook = {
         ...values,
         topicId: topics.find(topic => topic.name === values.topic).id,
         userId: userInfo.id,
         fileList: fileList,
      }

      if (finish) {
         await dispatch(postBook(newBook));
         setOpen(false);
         dispatch(fetchBooksByUserId({ userId: userInfo.id, pageParams }));
      } */
   };
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
               labelCol={{ span: 6 }}
               onFinish={(values => {
                  handleSubmit(values);
               })}
            >
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
                  rules={[
                     {
                        validator(_, value) {
                           return new Promise((resolve, reject) => {
                              starring.find((star) => star.firstName + " " + star.secondName === value) ?
                                 resolve("Success!") :
                                 reject("The star is not correct");
                           })
                        }
                     }
                  ]}
               >
                  <AutoComplete
                     options={starring.map((star) => ({ value: star.firstName + " " + star.secondName }))}
                     placeholder="Please enter the topic"
                     filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                     }
                  />
               </Form.Item>
               <div style={{ display: "flex", justifyContent: "right", justifyContent: "space-between" }}>
                  <div style={{ display: "flex" }}>
                     {data?.map(starring => <Tag color={"volcano"} key={starring.firstName + starring.secondName}>{starring.firstName + " " + starring.secondName}</Tag>)}
                  </div>
                  <Button type="link" onClick={addData} ><PlusOutlined /></Button>
               </div>

               <Form.Item name="uploadFiles" label="Your File"
                  valuePropName='fileList'
                  getValueFromEvent={(event) => {
                     return event?.fileList
                  }}
                  rules={uploadImgValidator(setFinish)}
               >
                  <Upload
                     maxCount={uploadCharacters.maxCount}
                     customRequest={(info) => {
                        setFileList([info.file]);
                     }}
                     showUploadList={false}
                     accept={uploadCharacters.accept}
                  >
                     <Button>Upload</Button>
                     {fileList[0]?.name}
                  </Upload>
               </Form.Item>
               <Form.Item style={{ display: "flex", justifyContent: "right" }}>
                  <Button htmlType='submit' loading={createLoading || loading}><SaveOutlined /> save book</Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default CreateMovie;