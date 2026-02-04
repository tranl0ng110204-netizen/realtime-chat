import React from 'react'
import { useChatStore } from '../../store/useChatStore'
import { CloseOutlined } from '@ant-design/icons';
import MessageInput from '../MessageInput/MessageInput';
import {useAuth} from '../../store/useAuth'
import './ChatContainer.css'
import { useEffect,useRef } from 'react'
import { message } from 'antd';

const ChatContainer = () => {

  const {messages,isMessagesLoading,selectedUser,getMessages,ListenMessage,UnlistenMessage} = useChatStore()
  const {authUser} = useAuth()
  const messageEndRef = useRef(null)
  useEffect(() =>{
    if(selectedUser){
      getMessages(selectedUser._id)
      ListenMessage()
    }      
    
    return () => UnlistenMessage()
  },[selectedUser,getMessages,ListenMessage,UnlistenMessage])

  useEffect(() =>{
    if(messageEndRef.current && messages){
       messageEndRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])

 

 

  if(isMessagesLoading && selectedUser) return (<div>Message Loading ...</div>)
  
  return (
    <>
        <div className='chat-header'>
          <div className='user-info'>
            {selectedUser ? (
             <div style={{display:'flex',gap:"2vw"}}>
        
                <p>{selectedUser.fullName}</p>
             </div>
            ) : <p>No info</p>}
          </div>
          <div className='exit-chat'>
              <CloseOutlined />
          </div>
        </div>
        
        <div className='chat-box'>
            {messages && messages.length >0 ? (
            <div >
              {messages.map((message,index) =>(
                <div className='message-send' key={message._id} ref={messageEndRef}>
                  {
                    authUser._id === message.senderID ? (
                      <div className='user-side'>
                        {
                            message.text && (
                              <p>{message.text}</p>
                            )
                        }
                        {
                          message.image && (
                            <img src={message.image} alt="" />
                          )
                        }
  
                      </div>
                    ):
                    (
                      <div className='sender-side'>
                        {
                          message.text && (
                              <p>{message.text}</p>
                            )
                        }
                        {
                          message.image && (
                            <img src={message.image} alt="" />
                          )
                        }
                      </div>
                    )
                  }
                
                </div>
              ))}
            </div>):
            ( <div>
                <p>No message has found</p>
              </div>)}
   
           
          
        </div>
        <div className='chat-input'>
          <MessageInput />
        </div>
    </>
  )
}

export default ChatContainer