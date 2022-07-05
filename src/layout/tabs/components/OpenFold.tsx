/*
 * @Author: bugdr
 * @Date: 2022-06-23 16:29:09
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 09:51:59
 * @FilePath: \react-blog-admin\src\layout\tabs\components\OpenFold.tsx
 * @Description:折叠和展开
 */
import { VscScreenFull, VscScreenNormal } from 'react-icons/vsc';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHeaderVisible,
  setMenuDrawerVisible,
  setMenuSiderCollapsed,
} from '/@/store/modules/appSlice';

const OpenFold: FC = () => {
  const { headerVisible, menuDrawerVisible, menuSiderCollapsed } = useSelector(
    (store: any) => store.app,
  );
  // react-redux的对应hooks,触发对应的方法
  const dispatch = useDispatch();

  const [isFold, setIsFold] = useState<boolean>(false);
  // 控制是否收缩还是全屏
  const handleFold = () => {
    // 隐藏头部
    dispatch(setHeaderVisible(!headerVisible));
    // 隐藏侧栏
    dispatch(setMenuDrawerVisible(!menuDrawerVisible));
    dispatch(setMenuSiderCollapsed(!menuSiderCollapsed));
    // 取反就行
    setIsFold(!isFold);
  };
  return (
    <>
      <div className="cursor-pointer" onClick={handleFold}>
        {isFold ? <VscScreenFull className="text-2xl" /> : <VscScreenNormal className="text-2xl" />}
      </div>
    </>
  );
};

export default OpenFold;
