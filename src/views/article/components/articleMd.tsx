/*
 * @Author: bugdr
 * @Date: 2022-07-05 10:37:17
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 12:28:04
 * @FilePath: \react-blog-admin\src\views\article\components\articleMd.tsx
 * @Description:markdown编辑器
 */
import { FC, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const ArticleMd: FC = () => {
  const [value, setValue] = useState('**Hello world!!!**');
  return (
    <>
      <div className="">
        <MDEditor value={value} onChange={setValue} height={530} />
      </div>
    </>
  );
};
export default ArticleMd;
