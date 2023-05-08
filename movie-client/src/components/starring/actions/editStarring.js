import { Button, Modal, Form, Input } from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STARRING } from '../../../redux/entitiesConst';
import {
   firstNameValidation,
   secondNameValidation,
   descriptionAutoSize,
   validateDescription
} from '../../../redux/contracts/starringContracts';
import { editStar, fetchStarring } from '../../../redux/reducers/starringSlice';

const EditStarring = ({ record }) => {

   const [form] = Form.useForm();
   useEffect(() => {
      form.setFieldsValue(record);
   }, [record]);


   const dispatch = useDispatch();
   const { error, editLoading, pagination } = useSelector(state => state[STARRING])

   const [open, setOpen] = useState(false);


   const showModal = () => {
      setOpen(true);
   };

   const handleSubmit = async (values) => {
      const newStar = {
         ...values,
         id: record.id
      }

      await dispatch(editStar(newStar));
      setOpen(false);
      dispatch(fetchStarring(pagination));
   };
   const handleCancel = () => {
      setOpen(false);
   };

   return (
      <>
         <Button type='link' onClick={showModal}>
            <EditOutlined />
         </Button>
         <Modal
            title="Edit a star"
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
                     autoSize={descriptionAutoSize}
                  />
               </Form.Item>
               <Form.Item style={{ display: "flex", justifyContent: "right" }}>
                  <Button htmlType='submit' loading={editLoading}><SaveOutlined /> save book</Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default EditStarring;