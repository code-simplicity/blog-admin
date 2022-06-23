/*
 * @Author: bugdr
 * @Date: 2022-06-23 16:30:59
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 16:50:12
 * @FilePath: \react-blog-admin\src\layout\tabs\components\SettingTabs.tsx
 * @Description:设置Tabs的组件
 */

import { Icon } from '@iconify/react';
import { FC } from 'react';

const SettingTabs: FC = () => {
  return (
    <>
      <div className="cursor-pointer">
        <Icon className="text-2xl" icon="icon-park-outline:setting" />
      </div>
    </>
  );
};

export default SettingTabs;
