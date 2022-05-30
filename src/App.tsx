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
    <div className="p-4">
      <Button className="m-4">添加</Button>
      <div className="bg-dark-300">加油</div>
    </div>
  );
}

export default App;
