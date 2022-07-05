/*
 * @Author: bugdr
 * @Date: 2022-07-04 08:22:40
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 12:55:33
 * @FilePath: \react-blog-admin\src\views\article\index.tsx
 * @Description:
 */
import { Button, Input } from 'antd';
import { FC, useState } from 'react';
import ArticleMd from './components/articleMd';
import { BsMarkdown } from 'react-icons/bs';
import { RiDraftLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import ArticleModal from './components/articleModal';

const Article: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showArticleModal = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <div className="bg-white">
        <div className="flex items-center p-2">
          <Input
            prefix={<BsMarkdown className="text-xl" />}
            allowClear
            className="flex-1"
            size="large"
            bordered={false}
            showCount
            maxLength={30}
            placeholder="请输入你要创作的文章标题吧..."
          />
          <div className="flex items-center justify-end">
            <Button className="mx-4" icon={<RiDraftLine />}>
              草稿箱
            </Button>
            <Button
              icon={<FiSend className="text-cyan-50" />}
              type="primary"
              onClick={() => showArticleModal()}
            >
              发布
            </Button>
          </div>
        </div>
        <div className="p-2">
          <ArticleMd />
        </div>
        <ArticleModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </div>
    </>
  );
};

export default Article;
