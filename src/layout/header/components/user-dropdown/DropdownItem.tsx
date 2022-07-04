/*
 * @Author: bugdr
 * @Date: 2022-06-13 14:08:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-04 07:56:57
 * @FilePath: \react-blog-admin\src\layout\header\components\user-dropdown\DropdownItem.tsx
 * @Description:下拉菜单的列表
 */
import { Menu } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogout } from '/@/store/modules/userSlice';

const DropdownItem: any = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSelect = (menuList: any) => {
    const { key } = menuList;
    // 判断不同地方key执行不同的方法
    if (key === 'logout') {
      // 跳转登录界面
      navigate('/login');
      dispatch(doLogout());
    } else if (key === 'lock') {
      console.log('lock', key);
    } else if (key === 'doc') {
      // eslint-disable-next-line no-console
      console.log('doc', key);
    }
  };
  return (
    <>
      <Menu
        items={[
          {
            key: 'doc',
            label: '文档',
            icon: <DownOutlined />,
          },
          {
            key: 'lock',
            label: '锁屏',
            icon: <SmileOutlined />,
          },
          {
            key: 'logout',
            label: '退出系统',
            icon: <SmileOutlined />,
          },
        ]}
        onSelect={onSelect}
      />
    </>
  );
};
export default DropdownItem;
