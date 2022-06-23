/*
 * @Author: bugdr
 * @Date: 2022-06-22 13:52:03
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-23 10:05:06
 * @FilePath: \react-blog-admin\src\layout\tabs\components\TabsList.tsx
 * @Description:
 */
import { Tabs, Tag } from 'antd';
import { FC, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
const { TabPane } = Tabs;

const TabsList: FC = () => {
  const menuList = () => {
    const arr = [];
    for (let i = 0; i <= 12; i++) {
      const item = `菜单${i}`;
      arr.push(item);
    }
    return arr;
  };

  const horizontalScroll = (event) => {
    event.preventDefault();
    const delta = Math.max(
      -1,
      Math.min(1, event.nativeEvent.wheelDelta || -event.nativeEvent.detail),
    );
    event.currentTarget.scrollLeft -= delta * 100;
  };
  return (
    <>
      <div className="flex h-12 md:w-full md:w-full items-center">
        <div className="flex-1 mr-4 min-w-36">
          <Scrollbars
            onWheel={horizontalScroll}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            hideTracksWhenNotNeeded={true}
            renderView={(props) => <div {...props} className="!overflow-y-hidden" />}
            renderTrackVertical={(props) => <div {...props} className="!invisible" />}
            style={{ height: 48 }}
          >
            <div className="p-2 flex items-center">
              <Tabs hideAdd={true} tabBarGutter={3} size="small" type="editable-card">
                {menuList().map((item) => (
                  <TabPane tab={item} key={item}></TabPane>
                ))}
              </Tabs>
            </div>
          </Scrollbars>
        </div>
        <div className="flex items-center">
          <div>重置</div>
          <div className="mx-4">局部放大</div>
          <div>卡片选项</div>
        </div>
      </div>
    </>
  );
};

export default TabsList;
