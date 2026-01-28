import React from 'react'
import { Col, Row } from 'antd';
import { Avatar, Badge, Button, Space, Switch } from 'antd';
import { useState } from 'react';
const ProfilePage = () => {

  const [show, setShow] = useState(true);
  let badge
  if(show === true){
    badge = "success"
  }
  else if(show === false){
    badge = "default"
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
          <Badge  status={badge} dot={show}>
           <img src="" alt="profile-pic" />
          </Badge>
        </div>  
        <div className='profile-info'>
          <p>Name : <span>Long</span></p>
          <p>Email : <span>abc@gmail.com</span></p>
          <p>isActive : <span>{show ? 'Active' : "No active"}</span></p>
        </div>
   
        
        
      </Col>
    </Row>
  </>
  )
}

export default ProfilePage