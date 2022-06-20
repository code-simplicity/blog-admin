/*
 * @Author: bugdr
 * @Date: 2022-06-20 08:43:57
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-20 10:37:33
 * @FilePath: \react-blog-admin\src\views\sys\error\ExceptionError.tsx
 * @Description:错误页面
 */
import { Button, Result } from 'antd';
import { FC } from 'react';
import PropTypes from 'prop-types';

// 接口类型约束
interface ResultMap {
  title: string; // 标题
  status: string; // 状态码
  subTitle: string; // 提示标题
  icon?: string; // 图标
  handler?: Fn; // 控制方法
  btnText?: string; // 按钮文字
}

const ExceptionError: FC = (props) => {
  const status = props;
  return (
    <Result
      className=""
      status="404"
      title="404"
      subTitle=""
      icon=""
      extra={<Button type="primary">Next</Button>}
    ></Result>
  );
};

// 默认的props值
ExceptionError.defaultProps = {
  status: '',
  title: '',
  subTitle: '',
  icon: '',
  btnText: '',
};

// 类型
// ExceptionError.propTypes = {
//   status: PropTypes.string,
//   title: PropTypes.string,
//   subTitle: PropTypes.string,
//   icon: PropTypes.string,
//   btnText: PropTypes.string,
// };

export default ExceptionError;
