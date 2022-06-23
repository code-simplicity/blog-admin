/*
 * @Author: bugdr
 * @Date: 2022-06-23 16:29:09
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 23:52:31
 * @FilePath: \react-blog-admin\src\layout\tabs\components\OpenFold.tsx
 * @Description:折叠和展开
 */
import { Icon } from '@iconify/react';
import { FC, useState } from 'react';
import screenfull from 'screenfull';

const OpenFold: FC = () => {
  const [isFold, setIsFold] = useState<boolean>(false);
  // 控制是否收缩还是全屏
  const handleFold = () => {
    // 传递dom，如果是dom存在那么就是该页面全屏，如果不存在那就是整个页面全屏
    // if (screenfull.isEnabled) {
    screenfull.toggle();
    // } else {
    // 全屏
    // }
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
