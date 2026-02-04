import { Col, Row } from 'antd';
import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate} from "react-router-dom"
import {useAuth} from '../../store/useAuth'


import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const {authUser,logOut} = useAuth()


  const onClick = ({ key }) => {
   switch(key){
    case '1':
      navigate('/')
      break


    case '2':
      navigate('/profile')
      break
    case '3' : 
      logOut()
      break
    default:
      console.log('click')

   };
  };

  const items = [
    {
      key: '1',
      label:'Home Page' 
    },
  {
      key:'2',
      label: 'Profile Page',
    },
    {
      key: '3',
      danger: true,
      label: 'Log Out'
    
    },
    
  ];

  console.log('authUser ',authUser)
  return (
    <>  
    
      <div className='navbar-body'>
          <Row>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}>
            {authUser ? 
              (
              <Dropdown menu={{ items,onClick }}>
                <a onClick={e => e.preventDefault()}>
                  <Space>
                  {authUser ?  (authUser.fullName):"no user"}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>

              ) : (
                <p>col-6</p>
              )  
            }
              
            </Col>
        </Row>


      </div>
        
    </>
  )
}

export default Navbar