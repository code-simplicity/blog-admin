import React, { useState } from 'react';
import { Drawer } from 'antd';
import LayoutSider from './LayoutSider';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuDrawerVisible } from '/@/store/modules/appSlice';

const DrawerLayoutSider: React.FC = (props) => {
  const { routeMenuList } = props;
  // 获取弹出层菜单是否可以显示
  const { menuDrawerVisible } = useSelector((store: any) => store.app);
  // 触发更新的方法
  const dispatch = useDispatch();
  // 控制显示，点击关闭
  const handleClose = () => {
    dispatch(setMenuDrawerVisible(!menuDrawerVisible));
  };
  return (
    <Drawer
      onClose={handleClose}
      visible={menuDrawerVisible}
      bodyStyle={{ padding: '0' }}
      width={200}
      closable={false}
      placement="left"
      mask={true}
    >
      <LayoutSider routeMenuList={routeMenuList} />
    </Drawer>
  );
};

export default DrawerLayoutSider;
