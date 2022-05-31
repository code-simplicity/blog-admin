import { Layout } from 'antd';
const { Content } = Layout;
import style from './index.module.less';

const LayoutContent: React.FC = () => {
  return (
    <Content
      className={style['site-layout-background']}
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      Content
    </Content>
  );
};
export default LayoutContent;
