import { PlusOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Upload, message } from 'antd';
import { useState } from 'react';
import { DARK_COLOR } from '../../../common/designConst'

const getBase64 = (img, setPoster, callback) => {
   const reader = new FileReader();
   reader.addEventListener('load', () => callback(reader.result));
   reader.readAsDataURL(img);
   setPoster(img);
};

const beforeUpload = (file) => {
   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
   if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG/WEBP file!');

   }
   const isLt2M = file.size / 1024 / 1024 < 2;
   if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
   }
   return isJpgOrPng && isLt2M;
};

const UploadPoster = ({ setPoster, previousPoster }) => {
   const [loading, setLoading] = useState(false);
   const [imageUrl, setImageUrl] = useState(previousPoster);
   const handleChange = (info) => {
      if (info.file.status === 'uploading') {
         setLoading(true);
      }

      // Get this url from response in real world.
      getBase64(info.file.originFileObj, setPoster, (url) => {
         setLoading(false);
         setImageUrl(url);
      });
   };
   const uploadButton = (
      <div>
         {loading ? <LoadingOutlined /> : <PlusOutlined />}
         <div
            style={{
               marginTop: 8,
            }}
         >
            Upload
         </div>
      </div>
   );
   return (
      <>
         <Upload
            name="poster"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            accept=".png,.jpg,.jpeg,.webp"
            customRequest={() => null}
         >
            {imageUrl ? (
               <Avatar
                  shape="square"
                  src={imageUrl}
                  size={150}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: DARK_COLOR }}
               />
            ) : (
               uploadButton
            )}
         </Upload>
      </>
   );
};
export default UploadPoster;