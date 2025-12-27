import { Flex, Space, Typography } from 'antd';
import { ButtonPrimary } from '../../shared/ui/button/ButtonPrimary/ButtonPrimary';
import { useNavigate } from 'react-router';
import style from './home.module.css';
const { Title } = Typography;

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      align="center"
      justify="space-between"
      className={style.homeContainer}
    >
      <Title level={2} style={{ margin: 0 }}>
        Welcome to Forum
      </Title>
      <Space wrap size="middle">
        <ButtonPrimary
          size="large"
          type="button"
          onClick={() => {
            navigate('/forum');
          }}
        >
          To Forum
        </ButtonPrimary>
        <ButtonPrimary
          size="large"
          type="button"
          onClick={() => {
            navigate('/login');
          }}
        >
          Sign in
        </ButtonPrimary>
      </Space>
    </Flex>
  );
};
