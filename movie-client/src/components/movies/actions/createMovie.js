import { Button, Modal, Form, Input, AutoComplete, Upload } from 'antd';
import { FileAddOutlined, SaveOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH, MOVIES } from '../../../redux/entitiesConst';
import { movieNameValidation, uploadCharacters, uploadImgValidator, validateDescription } from '../../../redux/contracts/movieContracts';

const CreateMovie = () => {
   const dispatch = useDispatch();
   const { error, createLoading } = useSelector(state => state[MOVIES])
   /* const topics = useSelector(state => state.topics.topics) */
   const { userInfo } = useSelector((state) => state[AUTH])

   const [open, setOpen] = useState(false);


   const showModal = () => {
      setOpen(true);
      /* dispatch(fetchTopics()); */
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
                     autoSize={{ minRows: 3, maxRows: 4 }}
                  />
               </Form.Item>

               {/* <Form.Item name="topic" label="Topic"
                  rules={[
                     {
                        required: true,
                     },
                     {
                        validator(_, value) {
                           return new Promise((resolve, reject) => {
                              topics.find((topic) => topic.name === value) ?
                                 resolve("Success!") :
                                 reject("The topic is not correct");
                           })
                        }
                     }
                  ]}
               >
                  <AutoComplete
                     options={topics.map((topic) => ({ value: topic.name }))}
                     placeholder="Please enter the topic"
                     filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                     }
                  />
               </Form.Item> */}

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
                  <Button htmlType='submit' loading={createLoading}><SaveOutlined /> save book</Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default CreateMovie;