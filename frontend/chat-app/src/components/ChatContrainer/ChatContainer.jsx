import React from 'react'
import { useChatStore } from '../../store/useChatStore'
import { CloseOutlined } from '@ant-design/icons';
import MessageInput from '../MessageInput/MessageInput';
import './ChatContainer.css'
import { useEffect } from 'react'
import { message } from 'antd';
const ChatContainer = () => {

  const {messages,isMessagesLoading,selectedUser,getMessages} = useChatStore()
  if(isMessagesLoading && selectedUser) return (<div>Message Loading ...</div>)
  console.log('messages : ' ,messages.length)

  return (
    <>
        <div className='chat-header'>
          <div className='user-info'>
            {selectedUser ? (
             <div style={{display:'flex',gap:"2vw"}}>
                <img src={selectedUser.profilePic || 'user pic'} alt='profile-pic'/>
                <p>{selectedUser.fullName}</p>
             </div>
              
              
            ) : <p>No info</p>}
          </div>
          <div className='exit-chat'>
              <CloseOutlined />
          </div>
        </div>
        <div className='chat-box'>
          <div className='sender-side'>

          </div>
          <div className='user-side'>
            {messages && messages.length >0 ? (
            <div >
              {messages.map((message) =>(
                <div className='message-send' key={message._id}>
                  {
                    message.text && (
                      <p>{message.text}</p>
                    )
                  
                  }
                  {
                    message.image && (
                      <img className='image-send' src={message.image}></img>
                    )
                  }
                </div>
              ))}
            </div>
           ):(<div>
            <p>No message has found</p>
           </div>)}
          </div>
           
          
        </div>
        <div className='chat-input'>
          <MessageInput />
        </div>
    </>
  )
}

export default ChatContainer