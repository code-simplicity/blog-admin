/*
 * @Author: bugdr
 * @Date: 2022-05-18 10:16:44
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-18 10:20:33
 * @FilePath: \blog-admin\src\views\operation\looperManage\components\model\looperForm.ts
 * @Description:轮播图的表单
 */

export function LooperSelectOption() {
  return [
    { value: '0', label: '已删除' },
    { value: '1', label: '存在' },
  ];
}

export interface FormState {
  title?: string;
  order: string | number;
  state?: string;
  targetUrl?: string;
  imageUrl?: string;
  imageCategoryId?: string;
}
