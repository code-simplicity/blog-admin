/*
 * @Author: bugdr
 * @Date: 2022-07-06 07:12:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-06 07:12:28
 * @FilePath: \react-blog-admin\src\utils\upload.ts
 * @Description:上传图片
 */
import { message } from 'antd';

// 图片最大的支持4m
export const imageSize = 4 * 1024 * 1024;
// 上传图片的验证规则
export function uploadBeforeImageValid(file: any): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const isJapOrPngOrGif =
      file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif';
    const isImageSize = file.size > imageSize ? true : false;
    if (!isJapOrPngOrGif) {
      message.error('只能上传png/jpg/gif格式文件');
      return reject(false);
    }
    if (isImageSize) {
      message.error('图片过大，最多只能是4M，请压缩重新上传');
      return reject(false);
    }
    return resolve(true);
  });
}
