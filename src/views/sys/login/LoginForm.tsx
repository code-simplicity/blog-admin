/*
 * @Author: bugdr
 * @Date: 2022-06-14 23:37:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-03 22:11:25
 * @FilePath: \react-blog-admin\src\views\sys\login\LoginForm.tsx
 * @Description:登录表单
 */
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import React, { FC, useState } from 'react';
import LoginFormTitle from './LoginFormTitle';
import CaptchaImage from '../../../components/CaptchaImage/CaptchaImage';
import {
  LockOutlined,
  UnlockOutlined,
  UserOutlined,
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled,
  KeyOutlined,
} from '@ant-design/icons';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

import { login } from '/@/api/user/user';
import { ResponseCode } from '/@/utils/response';
import { useDispatch } from 'react-redux';
import { checkUserInfoByToken, setToken } from '/@/store/modules/userSlice';
import { useNavigate } from 'react-router-dom';

const { Item } = Form;

const LoginForm: FC = () => {
  // 按钮加载
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  // 登录按钮的文字
  const [textBtn, setTextBtn] = useState<string>('登录');

  // 表单默认值
  const [initialValues, setInitialValues] = useState({
    userName: 'bugdr',
    password: '123456',
  });

  // 表单验证的规则
  const formRules = {
    userName: [{ required: true, message: '请输入独一无二的用户名' }],
    password: [{ required: true, message: '请输入密码' }],
    captcha: [{ required: true, message: '请输入图灵验证码密码' }],
  };

  // 触发store的dispatch的hooks
  const dispatch = useDispatch();
  // 路由跳转的hooks
  const navigate = useNavigate();

  // 触发登录的方法
  const onFinish = async (values: CommonObjectType<string>) => {
    setLoadingBtn(true);
    setTextBtn('正在登录中');
    // 组装数据进行登录接口的联调
    const data = { ...values };
    const { result, code } = await login(data);
    // 触发按钮加载，并且加载文字
    if (code === ResponseCode.SUCCESS) {
      setLoadingBtn(false);
      setTextBtn('登录成功');
      // 设置用户信息
      dispatch(checkUserInfoByToken());
      // 设置token
      dispatch(setToken(result));
      // 跳转路由到首页
      navigate('/');
    } else {
      setLoadingBtn(false);
      setTextBtn('登录');
    }
  };
  return (
    <div>
      <LoginFormTitle />
      <Form
        className="p-4"
        size="large"
        initialValues={initialValues}
        scrollToFirstError={true}
        onFinish={onFinish}
      >
        <Item name="userName" rules={formRules.userName}>
          <Input prefix={<UserOutlined />} allowClear placeholder="请输入用户名" />
        </Item>
        <Item name="password" rules={formRules.password}>
          <Input.Password prefix={<LockOutlined />} allowClear placeholder="请输入密码" />
        </Item>
        <Item name="captcha" rules={formRules.captcha}>
          <Row gutter={12} align="middle" justify="space-between">
            <Col span={14}>
              <Input prefix={<UnlockOutlined />} allowClear placeholder="请输入图灵验证码" />
            </Col>
            <Col span={10} className="text-right">
              <CaptchaImage />
            </Col>
          </Row>
        </Item>
        <Item>
          <Row gutter={24} align="middle" justify="space-between">
            <Col span={12}>
              {/* 记住我 */}
              <Checkbox>记住我</Checkbox>
            </Col>
            <Col span={12} className="text-right">
              {/* 忘记密码 */}
              <Button type="link" size="small">
                忘记密码？
              </Button>
            </Col>
          </Row>
        </Item>
        <Item>
          <Button type="primary" block size="large" loading={loadingBtn} htmlType="submit">
            {textBtn}
          </Button>
        </Item>
        <Item>
          <div className="grid grid-cols-3 gap-2">
            <Button>手机登录</Button>
            <Button>二维码登录</Button>
            <Button>注册</Button>
          </div>
        </Item>
        {/* 分割线 */}
        <Divider>其他登录方式</Divider>
        <div className="flex justify-between text-2xl">
          <GithubFilled />
          <WechatFilled />
          <AlipayCircleFilled />
          <GoogleCircleFilled />
          <TwitterCircleFilled />
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
