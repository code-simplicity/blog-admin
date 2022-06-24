/*
 * @Author: bugdr
 * @Date: 2022-06-23 16:29:09
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 23:52:31
 * @FilePath: \react-blog-admin\src\layout\tabs\components\OpenFold.tsx
 * @Description:折叠和展开
 */
import { Icon } from '@iconify/react';
import { FC, useEffect, useState } from 'react';
import screenfull from 'screenfull';
import eventFn from '/@/utils/event/event';

const OpenFold: FC = () => {
  const [contentRefs, setContentRefs] = useState();
  // const contentRef = (e: any) => {
  //   setContentRefs(e);
  // };
  // const getContent = () => {
  //   eventFn.on('getContentRef', contentRef);
  // };
  useEffect(() => {
    // getContent();
  });
  const [isFold, setIsFold] = useState<boolean>(false);
  // 控制是否收缩还是全屏
  const handleFold = () => {
    // 传递dom，这里做的只是一个局部的全屏，也就是隐藏菜单栏和头部
    if (contentRefs !== undefined) {
      // screenfull.toggle(contentRefs.current);
    } else {
      screenfull.toggle();
    }
    // 取反就行
    setIsFold(!isFold);
  };
  return (
    <>
      <div className="cursor-pointer" onClick={handleFold}>
        {isFold ? (
          <Icon className="text-3xl" icon="codicon:screen-full" />
        ) : (
          <Icon className="text-3xl" icon="codicon:screen-normal" />
        )}
      </div>
    </>
  );
};

export default OpenFold;
