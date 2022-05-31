import React from 'react';
import { Drawer } from 'antd';
import LayoutSider from './LayoutSider';

const DrawerLayoutSider: React.FC = () => {
  let drawerVisible = true;
  const handleClose = () => {
    drawerVisible = false;
  };
  return (
    <Drawer
      onClose={handleClose}
      visible={drawerVisible}
      placement="left"
      title="sider"
      mask={false}
    >
      <LayoutSider />
    </Drawer>
  );
};

export default DrawerLayoutSider;
