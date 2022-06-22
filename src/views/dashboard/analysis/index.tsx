/*
 * @Author: bugdr
 * @Date: 2022-06-20 14:40:37
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-22 08:19:47
 * @FilePath: \react-blog-admin\src\views\dashboard\analysis\index.tsx
 * @Description:分析太
 */

import { FC, useEffect, useState } from 'react';

const Analysis: FC = () => {
  const [value, setValue] = useState('这是分析页');
  return (
    <div>
      <div>{value}</div>
    </div>
  );
};

export default Analysis;
