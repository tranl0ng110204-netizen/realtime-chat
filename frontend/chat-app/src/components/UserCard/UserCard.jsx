import React, { use, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import './UserCard.css'
import { useChatStore } from '../../store/useChatStore'

const UserCard = ({users}) => {
    const { setSelectedUser,getMessages,selectedUser} = useChatStore()

    const handleClick = async(user) =>{
        setSelectedUser(user)
        await getMessages(user._id)
    }


    if (!users) {
    return <div>Đang tải dữ liệu...</div>
    }

  // Kiểm tra nếu là mảng rỗng
  if (users.length === 0) {
    return <div>Không có người dùng nào</div>
  }
 
        return (
            <>
                {users.map((user,index) =>(
                    <Row key={index}  onClick={() => handleClick(user)} justify='center' className='user-card-container'>
                        <Col 
                            xs={24}
                            sm={22}
                            md={20}
                            lg={18}
                            xl={16}
                            className='user-card'
                        >
                            <div className='card-content'>
                                <img className='profile-pic' src={user.profilePic} alt="profile-pic" />
                                {user.fullName}
                            </div>
                        </Col>
                    </Row>
                    ))}
            
            </>
  
  )
    

  
}

export default UserCard