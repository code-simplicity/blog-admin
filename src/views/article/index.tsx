/*
 * @Author: bugdr
 * @Date: 2022-07-04 08:22:40
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-08 20:50:03
 * @FilePath: \react-blog-admin\src\views\article\index.tsx
 * @Description:
 */
import { Button, Input } from 'antd';
import { FC, useRef, useState } from 'react';
import ArticleMd from './components/articleMd';
import { BsMarkdown } from 'react-icons/bs';
import { RiDraftLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import ArticleModal from './components/articleModal';

const Article: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 标题的ref
  const articleTitleRef = useRef<any>();
  const showArticleModal = () => {
    setIsModalVisible(true);
    const { input } = articleTitleRef.current;
    // 将标题的title赋值给
    setArticleForm({
      ...articleForm,
      title: input.value,
    });
    console.log('articleForm.content', articleForm.content);
  };
  const [articleForm, setArticleForm] = useState({
    id: '', // 文章id
    categoryId: undefined, // 文章分类
    categorized: '', // 被选中的文章分类
    summary: '', // 摘要
    cover: null, // 轮播图背景
    labels: [], // 文章标签数组
    label: '', // 文章标签
    labelInputVisible: false, // 标签输入框是否显示
    inputLabel: '', // 输入框label
    categories: [], // 文章分类
    confirmLoading: false, // 确认按钮loading
    state: '1', // 文章状态 0表示删除、1表示已经发布、2表示草稿、3、表示置顶
    title: '', // 文章title
    type: '1', // 文章类型0或者1
    userId: '', // 用户id
    viewCount: 0, // 浏览量
    content: undefined, // 内容
  });
  return (
    <>
      <div className="bg-white">
        <div className="flex items-center p-2">
          <Input
            ref={articleTitleRef}
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
          <ArticleMd articleForm={articleForm} setArticleForm={setArticleForm} />
        </div>
        <ArticleModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          articleForm={articleForm}
          setArticleForm={setArticleForm}
        />
      </div>
    </>
  );
};

export default Article;
