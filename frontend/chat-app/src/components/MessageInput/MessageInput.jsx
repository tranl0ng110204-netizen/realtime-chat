import React, { useRef, useState } from 'react'
import {useChatStore} from '../../store/useChatStore'
import { SendOutlined,PictureOutlined,CloseOutlined } from '@ant-design/icons';
import './MessageInput.css'
import { getBase64 } from '../../lib/getBase64';
import { Input,Button, Upload, Image } from 'antd';

const MessageInput = () => {
    const [text,setText] = useState('')
    const [imagePreview,setImagePreview] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [fileList, setFileList] = useState([])

    const fileInputRef = useRef(null)
    const {sendMessage} = useChatStore()

    const MessagePreview = (e) =>{
        setText(e)
    }
   
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

  


    const handleSendMessage = async() =>{
        if (!text.trim() && !imageFile) return
        try{
            
            await sendMessage({
                text:text.trim(),
                image:imageFile

            })
            setText('')
            setImagePreview('')
            setImageFile('')
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
        catch(err){
            console.log('error :',err)
        }
    }

  return (
    <>     
         {imagePreview && (
            <div className="preview-wrapper">
            
            <Image
                className="preview-img"
                src={imagePreview}
                width={120}
            />
             <CloseOutlined
                className="remove-img"
                onClick={() => {
                setImagePreview('')
                setImageFile(null)
                }}
            />   
            
            </div>
      )}

        <Input value={text} placeholder="Basic usage"  
            className='message-input' 
            onChange={(e) => MessagePreview(e.target.value)}/>
        <div className='send-text'>
            <Button onClick={handleSendMessage}>
                <SendOutlined />
            </Button>
        </div>
        <div >
        <Upload
             maxCount={1}
            fileList={fileList}
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleChange}
            accept="image/*"
            >
            <Button className='send-img'>
                <PictureOutlined />
            </Button>
        </Upload>
        </div>
        
    </>
  )
}

export default MessageInput