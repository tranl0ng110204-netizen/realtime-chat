import React from 'react'
import { Row, Col } from 'antd'
import './UserCard.css'

const UserCard = ({users}) => {
    console.log('users',users)
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
                    <Row key={user._id || index}  justify='center' className='user-card-container'>
                        <Col 
                            xs={24}
                            sm={22}
                            md={20}
                            lg={18}
                            xl={16}
                            className='user-card'
                        >
                            <div className='card-content'>
                                {user.fullName}
                            </div>
                        </Col>
                    </Row>
                    ))}
            
            </>
  
  )
    

  
}

export default UserCard