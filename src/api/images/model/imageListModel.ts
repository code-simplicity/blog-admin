// 获取用户列表的接口
export interface GetImageListParams {
  original?: string;
  page: string | number;
  size: string | number;
}

// 上传图片的接口验证
export interface UploadImageParams {
  original?: string;
  imageCategoryId?: string;
  file?: any;
}
