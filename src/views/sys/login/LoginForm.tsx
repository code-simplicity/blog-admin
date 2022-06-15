/*
 * @Author: bugdr
 * @Date: 2022-06-14 23:37:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 11:11:13
 * @FilePath: \react-blog-admin\src\views\sys\login\LoginForm.tsx
 * @Description:登录表单
 */
import { Button, Col, Form, Input, Row } from 'antd';
import React, { FC } from 'react';
import LoginFormTitle from './LoginFormTitle';
import CaptchaImage from '../../../components/CaptchaImage/CaptchaImage';
import { LockOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { Item } = Form;

const LoginForm: FC = () => {
  return (
    <div>
      <LoginFormTitle />
      <Form className="p-4" size="large">
        <Item name="userName">
          <Input prefix={<UserOutlined />} allowClear placeholder="请输入用户名" />
        </Item>
        <Item name="password">
          <Input.Password prefix={<LockOutlined />} allowClear placeholder="请输入密码" />
        </Item>
        <Item name="captcha">
          <Row gutter={24} align="middle" justify="space-between">
            <Col span={16}>
              <Input prefix={<UnlockOutlined />} allowClear placeholder="请输入图灵验证码" />
            </Col>
            <Col span={8} className="text-right">
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
          <Button type="primary" block size="large">
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
      </Form>
    </div>
  );
};

export default LoginForm;
