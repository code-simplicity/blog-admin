/*
 * @Author: bugdr
 * @Date: 2022-07-05 10:37:17
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-08 21:31:09
 * @FilePath: \react-blog-admin\src\views\article\components\articleMd.tsx
 * @Description:markdown编辑器
 */

import { FC, useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import math from '@bytemd/plugin-math';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import zhHans from 'bytemd/locales/zh_Hans.json';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/vs.css';
import './index.module.css';

// 配置插件
const plugins = [gfm(), highlight(), breaks(), frontmatter(), gemoji(), math(), mediumZoom()];
const ArticleMd: FC = (props: any) => {
  const { articleForm, setArticleForm } = props;
  const [value, setValue] = useState('');
  return (
    <>
      <Editor
        value={value}
        locale={zhHans} // 配置语言
        plugins={plugins} //markdown中用到的插件，如表格、数学公式、流程图
        onChange={(v) => {
          setValue(v);
          // 设置值
          setArticleForm({
            ...articleForm,
            content: v,
          });
        }}
        placeholder="请尽情的创作吧，我的朋友"
      />
    </>
  );
};
export default ArticleMd;
