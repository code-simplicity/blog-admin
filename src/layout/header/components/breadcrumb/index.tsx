/*
 * @Author: bugdr
 * @Date: 2022-06-13 13:46:09
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-13 15:07:01
 * @FilePath: \react-blog-admin\src\layout\header\components\Breadcrumb.tsx
 * @Description:面包屑
 */
import { Breadcrumb } from 'antd';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderBreadcrumb: FC = (props: any) => {
  const { routeMenuList } = props;
  // 获取当前路由的名称匹配
  const { pathname } = useLocation();
  const routeMatched = (menuList: any, pathname: string) => {
    const template: any[] = [];
    try {
      const getNodePath = (node: any) => {
        template.push(node);
        //找到符合条件的节点，通过throw终止掉递归
        if (node.key === pathname) {
          throw new Error('匹配成功');
        }
        if (node.children && node.children.length > 0) {
          node.children.map((item: any) => {
            getNodePath(item);
          });
          //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
          template.pop();
        } else {
          //找到叶子节点时，删除路径当中的该叶子节点
          template.pop();
        }
      };
      menuList.map((item: any) => {
        getNodePath(item);
      });
    } catch (e) {
      return template;
    }
  };
  const breadcrumbList = routeMatched(routeMenuList, pathname);
  return (
    <>
      <Breadcrumb className="text-base">
        {breadcrumbList &&
          breadcrumbList.length &&
          breadcrumbList.map((item: any) => {
            return (
              <Breadcrumb.Item key={item.key}>
                <Link to={item.key}>{item.label}</Link>
              </Breadcrumb.Item>
            );
          })}
      </Breadcrumb>
    </>
  );
};

export default HeaderBreadcrumb;
