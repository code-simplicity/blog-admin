/*
 * @Author: bugdr
 * @Date: 2022-06-23 16:07:18
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 16:50:35
 * @FilePath: \react-blog-admin\src\layout\tabs\components\refreshPage.tsx
 * @Description:刷新页面组件
 */

import { Icon } from '@iconify/react';
import { FC } from 'react';

const RefreshPage: FC = () => {
  return (
    <>
      <div className="cursor-pointer">
        <Icon className="text-3xl" icon="bx:refresh" />
      </div>
    </>
  );
};

export default RefreshPage;
