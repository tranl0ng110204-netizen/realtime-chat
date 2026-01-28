import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UserCard from '../components/UserCard/UserCard';
const HomePage = () => {

  const { selectedUser,getUser,users,isUserLoading } = useChatStore()
  useEffect(() =>{
    getUser()
  },[getUser])

  console.log('users',users.filterUsers)
  return (
    <div className='chat-layout'>
      <div className='user-chat'>
        <UserCard users={users.filterUsers}/>

      </div>
      
      <div className='chat-form'>
        {/* Form nhập tin nhắn ở đây */}
        <textarea 
          placeholder="Nhập tin nhắn..."
          className='message-input'
          rows={3}
        />
        <button className='send-button'>
          Gửi
        </button>
      </div>
    </div>
  )
}

export default HomePage