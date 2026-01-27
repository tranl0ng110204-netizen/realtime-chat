import React, { useState } from 'react'
import { Button,Form, Input,Row,Col } from 'antd';
import  toast,{Toaster} from 'react-hot-toast'
import { useAuth } from '../store/useAuth';
import { useNavigate} from 'react-router-dom'

  const SignupPage = () => {
    
    const {isSigningUp,signUp}  = useAuth()
    const notify = ()  => toast
    const navigate = useNavigate()

    const navigateLogin = () => navigate('/login')
    const onFinish = values => {

      signUp(values)
      toast.success("Sign Up success")
      navigate('/')
      
      
      console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
      if(errorInfo){
        toast.error("Error Sign Up")
        console.log('Failed:', errorInfo);

      }
      
    };

    return (
      <Row justify='center'>
        <Col span={2}></Col>
        <Col  xs={24}   // Trên mobile: chiếm 24/24
              sm={20}   // Trên tablet nhỏ: chiếm 20/24
              md={16}   // Trên tablet lớn: chiếm 16/24
              lg={12}   // Trên desktop: chiếm 12/24
              xl={10}  className='left-side'
              >
            <Form 
              name="basic"
             labelCol={{ 
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 8 }
              }}
              wrapperCol={{ 
                xs: { span: 24 },
                sm: { span: 16 },
                md: { span: 16 }
              }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className='form'
            > 
              <h1>SIGN UP PAGE</h1>
              <Form.Item
                name="fullName"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder='Enter your fullName'/>
              </Form.Item>
              
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder='Email'/>
              </Form.Item>

              <Form.Item
              
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder='Password' />
              </Form.Item>
              <Form.Item label={null} 
                 labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                >
                <Button style={{width:'100%'}}   type="primary" htmlType="submit" onClick={notify}>
                  Submit
                </Button>
                <Toaster/>
                <p style={{display:'flex',justifyContent:'center'}}>You already have an account ,
                    <span style={{cursor:'pointer',color:"red"}} onClick={navigateLogin}>
                       log in here !!!
                    </span>
                  
                   </p>
              </Form.Item>
                
            </Form>



                
        
        
        
        
        
        
        </Col>
        <Col xs={24}   // Trên mobile: chiếm 24/24
              sm={20}   // Trên tablet nhỏ: chiếm 20/24
              md={16}   // Trên tablet lớn: chiếm 16/24
              lg={12}   // Trên desktop: chiếm 12/24
              xl={10} className='right-side'>
                  
        </Col>
        <Col span={2}></Col>


      </Row>

   
  )
}

export default SignupPage