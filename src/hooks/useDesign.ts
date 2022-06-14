/*
 * @Author: bugdr
 * @Date: 2022-06-14 23:03:19
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-14 23:04:26
 * @FilePath: \react-blog-admin\src\hooks\useDesign.ts
 * @Description:使用css设计
 */
export function useDesign(scope: string) {
  const values = useAppProviderContext();
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
