/*
 * @Author: bugdr
 * @Date: 2022-05-29 11:04:33
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-13 16:15:54
 * @FilePath: \react-blog-admin\src\App.tsx
 * @Description:
 */
import './App.css';
import LayoutApp from './layout';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      {/* Switch被替换成了Routes */}
      <Routes>
        {/* 公共路由 */}
        <LayoutApp />
      </Routes>
    </Router>
  );
};

export default App;
