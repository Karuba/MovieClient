import { Button, Modal, Form, Input, AutoComplete, Upload } from 'antd';
import { FileAddOutlined, SaveOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STARRING } from '../../../redux/entitiesConst';
import { uploadCharacters, uploadImgValidator, validateDescription } from '../../../redux/contracts/movieContracts';
import { firstNameValidation, secondNameValidation } from '../../../redux/contracts/starringContracts';
import { createStar, fetchStarring } from '../../../redux/reducers/starringSlice';

const CreateStarring = () => {
   const dispatch = useDispatch();
   const { error, createLoading, pagination } = useSelector(state => state[STARRING])

   const [open, setOpen] = useState(false);


   const showModal = () => {
      setOpen(true);
   };

   const handleSubmit = async (values) => {
      const newStar = {
         ...values
      }

      await dispatch(createStar(newStar));
      setOpen(false);
      dispatch(fetchStarring(pagination));
      values = null;
   };
   const handleCancel = () => {
      setOpen(false);
   };

   return (
      <>
         <Button onClick={showModal}>
            <FileAddOutlined /> create a new star
         </Button>
         <Modal
            title="Create a star"
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
               <Form.Item name="firstName" label="First Name"
                  rules={firstNameValidation}
               >
                  <Input placeholder="enter the star's first name" />
               </Form.Item>

               <Form.Item name="secondName" label="Second Name"
                  rules={secondNameValidation}
               >
                  <Input placeholder="enter the star's second name" />
               </Form.Item>

               <Form.Item name="description" label="Description"
                  rules={validateDescription}
               >
                  <Input.TextArea placeholder='enter the description'
                     autoSize={{ minRows: 3, maxRows: 10 }}
                  />
               </Form.Item>
               <Form.Item style={{ display: "flex", justifyContent: "right" }}>
                  <Button htmlType='submit' loading={createLoading}><SaveOutlined /> save book</Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default CreateStarring;