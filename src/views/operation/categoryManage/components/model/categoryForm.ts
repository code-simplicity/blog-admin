/*
 * @Author: bugdr
 * @Date: 2022-05-17 09:20:52
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-17 09:30:17
 * @FilePath: \blog-admin\src\views\operation\categoryManage\components\model\categoryForm.ts
 * @Description:表单的form的select选择配置
 */
export function CategorySelectOption() {
  return [
    { value: '0', label: '已删除' },
    { value: '1', label: '存在' },
  ];
}

export interface FormState {
  name: string;
  pinyin: string;
  status: string;
  order: string;
  description: string;
}
