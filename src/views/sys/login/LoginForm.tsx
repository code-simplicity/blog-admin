/*
 * @Author: bugdr
 * @Date: 2022-06-14 23:37:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-19 10:29:32
 * @FilePath: \react-blog-admin\src\views\sys\login\LoginForm.tsx
 * @Description:登录表单
 */
import { Button, Col, Divider, Form, Input, Row } from 'antd';
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
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { Item } = Form;

const LoginForm: FC = () => {
  // 按钮加载
  const [loading, setLoading] = useState<boolean>(false);

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
    checkBox: [{ required: true, message: '请输入图灵验证码密码' }],
  };

  // 登录事件
  const handleLogin = () => {
    // onFinish();
  };

  const onFinish = async (values) => {
    console.log('e :>> ', e);
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
        <Item rules={formRules.checkBox}>
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
          <Button
            type="primary"
            block
            size="large"
            loading={loading}
            htmlType="submit"
            onClick={handleLogin}
          >
            登录
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
