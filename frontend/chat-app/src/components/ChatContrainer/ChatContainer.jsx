import React from 'react'
import { useChatStore } from '../../store/useChatStore'
import { CloseOutlined } from '@ant-design/icons';
import MessageInput from '../MessageInput/MessageInput';
import './ChatContainer.css'
import { useEffect } from 'react'
const ChatContainer = () => {
    const {messages,getMessages,isMessagesLoading,selectedUser} = useChatStore()
    if(isMessagesLoading && selectedUser) return (<div>Message Loading ...</div>)
    
  return (
    <>
        <div className='chat-header'>
          <div className='user-info'>
            {selectedUser ? (
             <div style={{display:'flex',gap:"2vw"}}>
                <img src={selectedUser.profilePic || 'user pic'} alt='profile-pic'/>
                <p>{selectedUser.fullName}</p>
             </div>
              
              
            ) : <p>No pic</p>}
          </div>
          <div className='exit-chat'>
              <CloseOutlined />
          </div>
        </div>
        <div className='chat-box'>
          
        </div>
        <div className='chat-input'>
          <MessageInput />
        </div>
    </>
  )
}

export default ChatContainer