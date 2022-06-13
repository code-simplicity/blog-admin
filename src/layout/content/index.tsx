/*
 * @Author: bugdr
 * @Date: 2022-05-31 10:52:39
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-13 13:11:12
 * @FilePath: \react-blog-admin\src\layout\content\index.tsx
 * @Description:
 */
import { Layout } from 'antd';
const { Content } = Layout;
import style from './index.module.less';

const LayoutContent: React.FC = () => {
  return <Content className={style['site-layout-background']}>Content</Content>;
};
export default LayoutContent;
