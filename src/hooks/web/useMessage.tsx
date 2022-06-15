/*
 * @Author: bugdr
 * @Date: 2022-06-15 15:06:49
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 15:46:36
 * @FilePath: \react-blog-admin\src\hooks\web\useMessage.tsx
 * @Description:消息提示封装的hooks
 */

import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { Modal, message as Message, notification } from 'antd';
import { ModalFunc } from 'antd/lib/modal/confirm';
import type { ModalFuncProps } from 'antd/lib/modal/Modal';
import { ConfigProps, NotificationApi } from 'antd/lib/notification';
import { isString } from 'lodash-es';

export interface NotifyApi {
  info(config: NotificationApi): void;
  success(config: NotificationApi): void;
  error(config: NotificationApi): void;
  warn(config: NotificationApi): void;
  warning(config: NotificationApi): void;
  open(args: NotificationApi): void;
  close(key: string): void;
  config(options: ConfigProps): void;
  destroy(): void;
}

export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare type IconType = 'success' | 'info' | 'error' | 'warning';

// 配置验证
export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: 'warning' | 'success' | 'error' | 'info';
}

export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>;

// 提示框的配置
interface ConfirmOptions {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
}

// 获取icon
function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoCircleFilled className="modal-icon-warning" />;
  } else if (iconType === 'success') {
    return <CheckCircleFilled className="modal-icon-success" />;
  } else if (iconType === 'info') {
    return <InfoCircleFilled className="modal-icon-info" />;
  } else {
    return <CloseCircleFilled className="modal-icon-error" />;
  }
}

// 渲染内容
function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (isString(content)) {
    return <div dangerouslySetInnerHTML={createContent(content)} />;
  } else {
    return content;
  }
}

function createContent(content: any) {
  return { __html: `<div>${content as string}</div>` };
}

// 气泡确认框
function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.iconType || 'warning';
  Reflect.deleteProperty(options, 'iconType');
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options),
  };
  return Modal.confirm(opt) as unknown as ConfirmOptions;
}

// 基础的配置
const getBaseOptions = () => {
  return {
    okText: '确认',
    centered: true,
  };
};

function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon),
  };
}

function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, 'success'));
}

function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, 'close'));
}

function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, 'info'));
}

function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, 'warning'));
}

notification.config({
  placement: 'topRight',
  duration: 3,
});

// 消息提示的封装
export function useMessage() {
  return {
    createMessage: Message,
    notification: notification as NotifyApi,
    createConfirm: createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  };
}
