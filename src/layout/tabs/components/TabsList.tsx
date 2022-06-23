/*
 * @Author: bugdr
 * @Date: 2022-06-22 13:52:03
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 16:58:37
 * @FilePath: \react-blog-admin\src\layout\tabs\components\TabsList.tsx
 * @Description:
 */
import { Button, Dropdown, Menu, Tabs } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import BetterScroll from 'better-scroll';
import RefreshPage from './refreshPage';
import OpenFold from './OpenFold';
import SettingTabs from './SettingTabs';
const { TabPane } = Tabs;

interface betterScrollOptionType {
  [x: string]: boolean | undefined | number;
}

const TabsList: FC = () => {
  const menuList = () => {
    const arr = [];
    for (let i = 0; i <= 16; i++) {
      const item = `菜单${i}`;
      arr.push(item);
    }
    return arr;
  };

  /**
   * 这里获取到当前元素的宽度，然后计算出临界值，
   * 之后通过dom的元素获计算每个Tabs的宽度，
   * 然后当这些宽度加起来等于这个临界值之后就可以触发滑动，
   * 滚动的实例才会生效，之后就是超出宽度会有一个[...]功能栏，然后点击出现后面生成的各种Tabs，
   * 当然这个也可以是通过滚动预览全部的
   */
  // 滚动的【配置项
  const [betterScrollOption, setBetterScrollOption] = useState<betterScrollOptionType>({
    scrollX: true, // 是否开启x轴滑动
    mouseWheel: true, // 鼠标滚轮事件
    scrollWidth: 0, // 滚动区域
    clientWidth: 0, // 可视区域
  });
  // 滑块的ref
  const tabScroll: any = useRef();
  // 滚动的实例
  let betterScroll = null;
  // 获取当前的滑块的宽度
  const initBetterScroll = () => {
    if (tabScroll.current !== null) {
      // 设置初始化的值
      setBetterScrollOption({
        ...betterScrollOption,
        scrollWidth: tabScroll.current.clientWidth,
      });
    }
    // 判断滚动宽度是否比可视区域宽
    const { clientWidth, scrollWidth } = tabScroll.current;
    setBetterScrollOption({
      ...betterScrollOption,
      scrollX: scrollWidth >= clientWidth ? true : false,
      mouseWheel: scrollWidth >= clientWidth ? true : false,
      scrollWidth: scrollWidth,
      clientWidth: clientWidth,
    });
  };

  // 初始化屏幕宽度
  const onResizeWidth = () => {
    // 监听屏幕变化
    window.addEventListener('resize', () => {
      initBetterScroll();
    });
  };

  useEffect(() => {
    // 初始化执行
    initBetterScroll();
    onResizeWidth();
    betterScroll = new BetterScroll('.tabScroll', {
      scrollX: betterScrollOption.scrollX,
      probeType: 3,
      mouseWheel: betterScrollOption.mouseWheel,
    });

    // 销毁
    return window.removeEventListener('resize', () => {
      initBetterScroll();
    });
  }, [betterScrollOption.scrollWidth]);

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <>
      <div className="flex relative mt-2 h-12 w-full items-center">
        <div className="w-17/20 md:min-w-32">
          <div className="md:w-full h-12">
            <div className="relative overflow-hidden tabScroll" ref={tabScroll}>
              <Tabs
                className="inline-block"
                hideAdd={true}
                tabBarGutter={8}
                size="small"
                type="editable-card"
              >
                {menuList().map((item) => (
                  <TabPane tab={item} key={item}></TabPane>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
        {betterScrollOption.scrollWidth > betterScrollOption.clientWidth ? (
          <div className="w-8 pl-4 h-12 text-lg text-center cursor-pointer">
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
              <span>...</span>
            </Dropdown>
          </div>
        ) : null}
        <div className="w-3/20 px-4 flex items-center justify-between">
          <RefreshPage />
          <OpenFold />
          <SettingTabs />
        </div>
      </div>
    </>
  );
};

export default TabsList;
