/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:52:39
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-21 22:39:30
 * @FilePath: \react-blog-admin\src\layout\content\index.tsx
 * @Description:
 */
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;
import style from './index.module.less';

const LayoutContent: React.FC = () => {
  return (
    <Content className={style['site-layout-background']}>
      {/* 提供路由占位符 */}
      <Outlet />
    </Content>
  );
};
export default LayoutContent;
