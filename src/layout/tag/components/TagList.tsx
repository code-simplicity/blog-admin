import { Tag } from 'antd';
import { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const TagList: FC = () => {
  const menuList = () => {
    const arr = [];
    for (let i = 0; i <= 29; i++) {
      const item = `菜单${i}`;
      arr.push(item);
    }
    return arr;
  };
  return (
    <>
      <section className="flex items-center">
        <div className="flex-1 mr-4">
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            hideTracksWhenNotNeeded={true}
            renderView={(props) => <div {...props} className="!overflow-y-hidden" />}
            renderTrackVertical={(props) => <div {...props} className="!invisible" />}
            style={{ height: 36 }}
          >
            <ul className="p-2 flex items-center">
              {menuList().map((item) => (
                <li key={item} className="flex">
                  <Tag className="text-sm">{item}</Tag>
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
        <div className="w-30">侧边工具类</div>
      </section>
    </>
  );
};

export default TagList;
