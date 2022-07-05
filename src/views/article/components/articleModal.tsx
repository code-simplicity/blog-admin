/*
 * @Author: bugdr
 * @Date: 2022-07-05 12:39:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 17:31:55
 * @FilePath: \react-blog-admin\src\views\article\components\articleModal.tsx
 * @Description:发布文章的弹窗
 */
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Modal, Select, Tag } from 'antd';
import { FC, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { getCategoryList } from '/@/api/category';
import ImageModal from '/@/components/ImageModal';
import { ResponseCode } from '/@/utils/response';

const { TextArea } = Input;

const ArticleModal: FC = (props: any) => {
  const { isModalVisible, setIsModalVisible } = props;
  const [articleForm, setArticleForm] = useState({
    id: '', // 文章id
    categoryId: undefined, // 文章分类
    categorized: '', // 被选中的文章分类
    summary: '', // 摘要
    cover: '', // 轮播图背景
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
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  // 确认按钮
  const onFinish = (values: any) => {
    console.log('values', values);
    // setIsModalVisible(false);
  };
  // 取消弹窗
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 表单验证的规则
  const formRules = {
    categoryId: [{ required: true, message: '请选择文章分类' }],
    cover: [{ required: true, message: '请上传文章背景' }],
    summary: [{ required: true, message: '请输入文章摘要' }],
    labels: [{ required: true, message: '请输入文章标签' }],
  };

  // 获取文章分类
  const initCategoryList = async () => {
    const params = {
      page: 1,
      size: 50,
    };
    const { result, code } = await getCategoryList(params);

    if (code === ResponseCode.SUCCESS) {
      setArticleForm({
        ...articleForm,
        categories: result.contents,
      });
    } else {
      // 获取失败
    }
  };

  // 图片弹窗的
  const [imageModalVisible, setImageModalVisible] = useState(false);
  // 控制图片弹窗显示
  const handleImageModalVisible = () => {
    setImageModalVisible(true);
  };
  useEffect(() => {
    initCategoryList();
  }, []);
  return (
    <>
      <Modal
        title="发布文章"
        maskClosable={false}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            返回
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" loading={loadingBtn}>
            发布
          </Button>,
        ]}
      >
        <Form
          labelAlign="left"
          labelCol={{ span: 4 }}
          initialValues={articleForm}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="categoryId" label="文章分类" rules={formRules.categoryId}>
            <Select
              placeholder="请选择文章分类"
              allowClear
              options={articleForm.categories}
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
            />
          </Form.Item>
          <Form.Item name="cover" label="封面" rules={formRules.categoryId}>
            <div
              className="h-26 w-26 bg-gray-100 cursor-pointer"
              onClick={() => handleImageModalVisible()}
            >
              {articleForm.cover ? (
                <Image width="100%" height="100%" alt="loop" src={articleForm.cover} />
              ) : (
                <div className="md:flex flex-col items-center justify-center w-26 h-26">
                  <FiPlus />
                  <LoadingOutlined />
                  <div className="text-center mt-2">添加封面</div>
                </div>
              )}
            </div>
          </Form.Item>
          <Form.Item name="summary" label="文章摘要" rules={formRules.summary}>
            <TextArea
              placeholder="请输入文章分类..."
              maxLength={120}
              showCount
              allowClear
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
          <Form.Item name="labels" label="标签" rules={formRules.labels}>
            <Tag />
            <Button size="small">添加标签</Button>
          </Form.Item>
        </Form>
      </Modal>
      <ImageModal
        imageModalVisible={imageModalVisible}
        setImageModalVisible={setImageModalVisible}
      />
    </>
  );
};

export default ArticleModal;
