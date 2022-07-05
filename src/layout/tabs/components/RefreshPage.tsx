/*
 * @Author: bugdr
 * @Date: 2022-06-23 16:07:18
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 09:48:53
 * @FilePath: \react-blog-admin\src\layout\tabs\components\RefreshPage.tsx
 * @Description:刷新页面组件
 */

import { FC } from 'react';
import { BiRefresh } from 'react-icons/bi';
const RefreshPage: FC = () => {
  return (
    <>
      <div className="cursor-pointer">
        <BiRefresh className="text-2xl" />
      </div>
    </>
  );
};

export default RefreshPage;
