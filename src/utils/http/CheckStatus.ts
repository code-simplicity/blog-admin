/*
 * @Author: bugdr
 * @Date: 2022-06-15 14:49:57
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-15 16:00:06
 * @FilePath: \react-blog-admin\src\utils\http\CheckStatus.ts
 * @Description:检查状态码
 */
import Sys from '../../locales/lang/zh-CN/sys';
import type { ErrorMessageMode } from '/#/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      // 设置token为undefined
      //   userStore.setToken(undefined);
      errMessage = msg || Sys.api.errMsg401;
      //   if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      //     userStore.setSessionTimeout(true);
      //   } else {
      //     userStore.logout(true);
      //   }
      // 退出登录
      //   userStore.logout(true);

      break;
    case 403:
      errMessage = Sys.api.errMsg403;
      break;
    // 404请求不存在
    case 404:
      errMessage = Sys.api.errMsg404;
      break;
    case 405:
      errMessage = Sys.api.errMsg405;
      break;
    case 408:
      errMessage = Sys.api.errMsg408;
      break;
    case 500:
      errMessage = Sys.api.errMsg500;
      break;
    case 501:
      errMessage = Sys.api.errMsg501;
      break;
    case 502:
      errMessage = Sys.api.errMsg502;
      break;
    case 503:
      errMessage = Sys.api.errMsg503;
      break;
    case 504:
      errMessage = Sys.api.errMsg504;
      break;
    case 505:
      errMessage = Sys.api.errMsg505;
      break;
    default:
  }
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: Sys.api.errorTip, content: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
