/*
 * @Author: bugdr
 * @Date: 2022-05-29 11:04:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-29 11:19:12
 * @FilePath: \react-blog-admin\src\App.tsx
 * @Description:
 */
import { useState } from 'react';
import logo from './assets/svg/logo.svg';
import './App.css';
import { Button } from 'antd';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button>添加</Button>
    </div>
  );
}

export default App;

