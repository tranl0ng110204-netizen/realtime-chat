import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const FOOTER = () => {
  return (
    <Footer style={{
      textAlign: 'center',
      backgroundColor: '#f0f2f5',
      padding: '16px 50px',
      position: 'relative',
      bottom: 0,
      width: '100%'
    }}>
      <Text type="secondary">
        © {new Date().getFullYear()} Your Company Name • 
        <a href="/privacy" style={{ margin: '0 8px' }}>Privacy Policy</a> • 
        <a href="/terms" style={{ margin: '0 8px' }}>Terms of Service</a>
      </Text>
    </Footer>
  );
};

export default FOOTER