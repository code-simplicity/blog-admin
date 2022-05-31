import React from 'react';
import LayoutSider from './LayoutSider';
import DrawerLayoutSider from './DrawerLayoutSider';

const Sider: React.FC = () => {
  // 通过查询屏幕宽度获取设备的值，创建两个组件,第一个组件是抽屉的，用于在移动端显示的
  // 判断设备,返回侧边栏应该显示哪一种
  const Sider = (props) => {
    const isMobile = false;
    return isMobile ? <DrawerLayoutSider /> : <LayoutSider />;
  };
  return <Sider />;
};

export default Sider;
