/*
 * @Author: bugdr
 * @Date: 2022-06-23 16:30:59
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 09:54:16
 * @FilePath: \react-blog-admin\src\layout\tabs\components\SettingTabs.tsx
 * @Description:设置Tabs的组件
 */

import { GrSettingsOption } from 'react-icons/gr';
import { FC } from 'react';

const SettingTabs: FC = () => {
  return (
    <>
      <div className="cursor-pointer">
        <GrSettingsOption className="text-2xl" />
      </div>
    </>
  );
};

export default SettingTabs;
