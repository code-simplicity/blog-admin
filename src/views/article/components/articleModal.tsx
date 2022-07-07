/*
 * @Author: bugdr
 * @Date: 2022-07-05 12:39:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-07 21:30:32
 * @FilePath: \react-blog-admin\src\views\article\components\articleModal.tsx
 * @Description:发布文章的弹窗
 */
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Modal, Select, Tag } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
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
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [form] = Form.useForm();
  // 确认按钮
  // TODO:出现了bug，不能动态监听表单值，后期修复
  const onFinish = (values: any) => {
    console.log('articleForm :>> ', articleForm);
    console.log('form', form);
    setLoadingBtn(true);
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
  // 输入框的ref
  const labelInputRef = useRef<any>();
  // 控制输入框的显示
  const handleInputVisible = () => {
    labelInputRef.current.focus();
  };
  // 添加标签
  const addLabels = (e: any) => {
    // 组合标签
    articleForm.labels.push(e.target.value);
    setArticleForm((prev: any) => ({
      ...prev,
      labels: [...articleForm.labels],
    }));
    // 清除输入框
    labelInputRef.current.input.value = '';
  };
  // 关闭tag
  const handleClose = (removedTag: string) => {
    // 清除表单中的labels值
    const newTags = articleForm.labels.filter((tag) => tag !== removedTag);
    // 设置值
    setArticleForm((prev: any) => ({
      ...prev,
      labels: newTags,
    }));
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
        footer={null}
      >
        <Form
          form={form}
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
          <Form.Item label="封面">
            <Form.Item name="cover" rules={formRules.cover}>
              <div
                className="h-26 w-26 bg-gray-100 cursor-pointer"
                onClick={() => handleImageModalVisible()}
              >
                {articleForm.cover ? (
                  <Image
                    width="100%"
                    height="100%"
                    preview={false}
                    alt="loop"
                    src={articleForm.cover}
                  />
                ) : (
                  <div className="md:flex flex-col items-center justify-center w-26 h-26">
                    <FiPlus />
                    <div className="text-center mt-2">添加封面</div>
                  </div>
                )}
              </div>
            </Form.Item>
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
          <Form.Item label="标签" rules={formRules.labels}>
            <Form.Item name="labels">
              {articleForm.labels && articleForm.labels.length
                ? articleForm.labels.map((item) => {
                    return (
                      <Tag
                        closable
                        key={item}
                        onClose={() => {
                          handleClose(item);
                        }}
                      >
                        {item}
                      </Tag>
                    );
                  })
                : null}
              {articleForm.labels.length < 5 ? (
                <>
                  <Input
                    ref={labelInputRef}
                    placeholder="添加标签"
                    size="small"
                    className="mb-2 mr-2"
                    allowClear
                    style={{ width: '100px' }}
                    onPressEnter={addLabels}
                  />
                  <Button
                    size="small"
                    onClick={() => {
                      handleInputVisible();
                    }}
                  >
                    添加标签
                  </Button>
                </>
              ) : null}
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-end">
              <Button key="back" className="mr-4" onClick={handleCancel}>
                返回
              </Button>
              <Button key="submit" type="primary" htmlType="submit" loading={loadingBtn}>
                发布
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <ImageModal
        imageModalVisible={imageModalVisible}
        setImageModalVisible={setImageModalVisible}
        setArticleForm={setArticleForm}
        articleForm={articleForm}
      />
    </>
  );
};

export default ArticleModal;
