import { Col, Row } from 'antd';
import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import {Navigate} from "react-router-dom"
import {useAuth} from '../../store/useAuth'
import './Navbar.css'

const Navbar = () => {
  const {authUser,logOut} = useAuth()
  

  const onClick = ({ key }) => {
   switch(key){
    case '4' : 
      logOut()
      break
    default:
      console.log('click')

   };
  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
    },
    {
      key: '4',
      danger: true,
      label: 'Log Out'
    
    },
  ];

  console.log('authUser ',authUser)
  return (
    <>  
    
      <div className='navbar-body'>
          <Row>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
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