/*
 * @Author: bugdr
 * @Date: 2022-06-23 16:29:09
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 16:48:08
 * @FilePath: \react-blog-admin\src\layout\tabs\components\OpenFold.tsx
 * @Description:折叠和展开
 */

import { Icon } from '@iconify/react';
import { FC } from 'react';

const OpenFold: FC = () => {
  return (
    <>
      <div className="cursor-pointer">
        <Icon className="text-3xl" icon="codicon:screen-normal" />
        <Icon className="text-3xl" icon="codicon:screen-full" />
      </div>
    </>
  );
};

export default OpenFold;
