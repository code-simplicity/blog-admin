/*
 * @Author: bugdr
 * @Date: 2022-06-13 14:08:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 08:26:29
 * @FilePath: \react-blog-admin\src\layout\header\components\user-dropdown\DropdownItem.tsx
 * @Description:下拉菜单的列表
 */
import { Menu } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogout } from '/@/store/modules/userSlice';

const DropdownItem: any = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSelect = (menuList: any) => {
    const { key } = menuList;
    // 判断不同地方key执行不同的方法
    if (key === 'logout') return logout();
  };
  // 执行退出登录的hooks
  const logout = () => {
    navigate('/login');
    //TODO: 退出登录或者是触发这个hooks存在问题，以后解决
    // dispatch(doLogout());
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
