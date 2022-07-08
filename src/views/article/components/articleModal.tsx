/*
 * @Author: bugdr
 * @Date: 2022-07-05 12:39:24
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-08 21:53:48
 * @FilePath: \react-blog-admin\src\views\article\components\articleModal.tsx
 * @Description:发布文章的弹窗
 */
import { Button, Form, Image, Input, message as Message, Modal, Select, Tag } from 'antd';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { postArticle } from '/@/api/article';
import { getCategoryList } from '/@/api/category';
import ImageModal from '/@/components/ImageModal';
import { ResponseCode } from '/@/utils/response';

const { TextArea } = Input;

const ArticleModal: FC = (props: any) => {
  const { isModalVisible, setIsModalVisible, articleForm, setArticleForm } = props;
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [form] = Form.useForm();
  // 确认按钮
  const onFinish = async (values: any) => {
    // 解构代码
    const { labels, cover, summary, categoryId, content, state, type, title, label, id } =
      articleForm;
    // 提交按钮加载
    setLoadingBtn(true);
    // 组合数据，验证title
    if (title === undefined || title === null || title === '') {
      Message.error('文章标题忘记了吧');
      return;
    }
    // 处理标签
    let tempLabels = '';
    labels.forEach((item: string, index: number) => {
      tempLabels += item;
      if (index !== labels.length - 1) {
        tempLabels += '-';
      }
    });
    const params = {
      title: title,
      content: content,
      categoryId: values.categoryId,
      summary: values.summary,
      cover: cover,
      label: tempLabels,
      id: id ? id : null,
      type: type,
    };
    // 判断文章是添加还是更新
    if (id === '') {
      // 添加
      const data = {
        ...params,
        state: state,
      };
      const { code, message } = await postArticle(data);
      if (code === ResponseCode.SUCCESS) {
        // 添加成功
        Message.success(message);
        setLoadingBtn(false);
      } else {
        Message.error(message);
        setLoadingBtn(false);
      }
    } else {
      console.log('更新 :>> ');
    }
    // 关闭弹窗并且销毁数据
    // TODO：后面开发的时候询问是跳转连接还是
    // 取消弹窗
    handleCancel();
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
    const { result, code, message } = await getCategoryList(params);

    if (code === ResponseCode.SUCCESS) {
      setArticleForm({
        ...articleForm,
        categories: result.contents,
      });
    } else {
      // 获取失败
      message.error(message);
    }
  };

  // 图片弹窗的
  const [imageModalVisible, setImageModalVisible] = useState(false);
  // 控制图片弹窗显示
  const handleImageModalVisible = () => {
    setImageModalVisible(true);
  };
  // 动态监听表单的图片cover值是否改变
  useMemo(() => {
    form.setFieldsValue({
      cover: articleForm.cover,
    });
  }, [imageModalVisible]);
  // 输入框的ref
  const labelInputRef = useRef<any>();
  // 是否可以显示输入框和按钮
  const [showLabelInput, setShowLabelInput] = useState(false);
  // 控制输入框的显示
  const handleInputVisible = () => {
    setShowLabelInput(true);
    labelInputRef.current.focus();
  };
  // 添加标签
  const addLabels = () => {
    const { current } = labelInputRef;
    // 组合标签
    articleForm.labels.push(current.input.value);
    setArticleForm((prev: any) => ({
      ...prev,
      labels: [...articleForm.labels],
    }));
    form.setFieldsValue({
      labels: [...articleForm.labels],
    });
    // 清除输入框
    // labelInputRef.clear();
    // console.log('labelInputRef :>> ', labelInputRef);
  };
  // 关闭tag
  const handleClose = (removedTag: string) => {
    // 清除表单中的labels值
    const newTags = articleForm.labels.filter((tag: string) => tag !== removedTag);
    // 设置值
    setArticleForm((prev: any) => ({
      ...prev,
      labels: newTags,
    }));
    // 更新表单label的值
    form.setFieldsValue({
      labels: newTags,
    });
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
          <Form.Item label="封面" rules={formRules.cover}>
            <Form.Item noStyle name="cover">
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
          <Form.Item label="标签">
            <Form.Item noStyle name="labels" rules={formRules.labels}>
              {articleForm.labels && articleForm.labels.length
                ? articleForm.labels.map((item: string) => (
                    <Tag
                      closable
                      key={item}
                      onClose={() => {
                        handleClose(item);
                      }}
                    >
                      {item}
                    </Tag>
                  ))
                : null}
            </Form.Item>
            {articleForm.labels.length < 5 && showLabelInput ? (
              <Input
                ref={labelInputRef}
                placeholder="添加标签"
                size="small"
                className="mb-2 mr-2"
                allowClear
                style={{ width: '100px' }}
              />
            ) : null}
            {showLabelInput ? (
              <Button size="small" onClick={addLabels}>
                添加
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() => {
                  handleInputVisible();
                }}
              >
                添加标签
              </Button>
            )}
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
