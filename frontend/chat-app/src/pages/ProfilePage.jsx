import React from 'react'
import { SendOutlined,PictureOutlined,CloseOutlined } from '@ant-design/icons';
import { Col, Row ,Upload, Image,Button  } from 'antd';
import { getBase64 } from '../lib/getBase64';
import { useState } from 'react';
import {useAuth} from "../store/useAuth"

const ProfilePage = () => {
  const {authUser,updateProfile} = useAuth()
  
  const [imagePreview,setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [fileList, setFileList] = useState([])

  const handleChange = async (info) => {
      const file = info.fileList[0]

      console.log('fileList:', info.fileList)

      if (!file || !file.originFileObj) {
          console.log('NO originFileObj')
          return
      }

      const preview = await getBase64(file.originFileObj)

      setImagePreview(preview)
      setImageFile(file.originFileObj)
  }

  const handleUpdateUser = async() =>{
    await updateProfile({
      image:imageFile
    })
    setImagePreview('')
    setImageFile('')
  }


  return (
     <>
    <Row justify='center'>
      <Col xs={24}   // Trên mobile: chiếm 24/24
        sm={20}   // Trên tablet nhỏ: chiếm 20/24
        md={16}   // Trên tablet lớn: chiếm 16/24
        lg={12}   // Trên desktop: chiếm 12/24
        xl={10}
        className='profile'>
        <div className='profile-pic'>
          {authUser && authUser.profilePic ? 
          (<div>
            <Image width={200}
                height={205}  src={authUser.profilePic} alt='user Pic'/>
          </div>) : (<div>
            {imagePreview && (
            <div className="preview-user-image">
            <Image
              className='update-image'
                src={imagePreview}
                width={200}
                height={205}
            />
            


          </div>)}
            
            
            </div>
      )}

        </div>  
        <div className='upload-profile-image'>
             <Upload
              maxCount={1}
              fileList={fileList}
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleChange}
              accept="image/*"
              >
                <Button>
                  Select Image
                </Button>
            </Upload>
        </div>
        <div className='profile-info'>
          <p>Name : <span>{authUser.fullName}</span></p>
          <p>Email : <span>{authUser.email}</span></p>

        </div>


        <div className='update-btn'>
          <Button onClick={handleUpdateUser}>Update</Button>
        </div>
   
        
        
      </Col>
    </Row>
  </>
  )
}

export default ProfilePage