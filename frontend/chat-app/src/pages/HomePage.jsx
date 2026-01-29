import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UserCard from '../components/UserCard/UserCard';
import ChatContainer from '../components/ChatContrainer/ChatContainer';
const HomePage = () => {

  const { selectedUser,getUser,users,isUserLoading } = useChatStore()
  useEffect(() =>{
    getUser()
  },[getUser])

  
  
  return (
    <div className='chat-layout'>
      <div className='user-chat'>
        <UserCard  users={users.filterUsers} />
      </div>
      
      <div className='chat-form'>
        <ChatContainer/>
      </div>
    </div>
  )
}

export default HomePage