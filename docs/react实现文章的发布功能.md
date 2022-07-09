<a name="df368884"></a>
# 前言
当我使用`React.js`和`Next.js`重新编写自己的博客系统的时候，对于两种不同的框架以及实现的原理有了一定的认识，React和Vue的开发存在很大的差别。React的自顶向下的数据流和Vue的双向数据流存在很大的开发差别，上手体验也不相同，不过感觉React更加灵活，通过编写`jsx`语法或者`tsx`语法，使得书写更加方便，Vue编写的是模板语法，写起来更加容易，上手比较快。
<a name="ac8506d9"></a>
## 开发页面预览
下图是在我本次项目开发中的页面布局。<br />![](https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/dayImage/20220708221727.png#crop=0&crop=0&crop=1&crop=1&id=z0pHL&originHeight=973&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />涉及的相关技术有

- bytemd：这是一款掘金正在使用的markdown编辑器--地址[bytemd](https://github.com/bytedance/bytemd)
- @bytemd/react：这是bytemd的react版本，主要在项目中使用的就是这个组件--地址[@bytemd/react](https://github.com/bytedance/bytemd/tree/main/packages/react)
- @bytemd/plugin-gfm：这是对该markdown编辑器的插件支持，包括自动链接文字、删除线、表格等--地址[@bytemd/plugin-gfm](https://github.com/bytedance/bytemd/tree/main/packages/plugin-gfm)
- ...这系列的插件就不再一一介绍，当然你可以自己拓展插件
- highlight.js：一个集成多个不同主题的代码高亮库--地址[highlightjs](https://highlightjs.org/download/)
- 其他的就是React的周边生态

上面的相关工具介绍完成之后，我们来看一下需要实现的一个具体效果，如下面的动图所示。<br />![](https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/dayImage/%E5%8F%91%E8%A1%A8%E6%96%87%E7%AB%A0%E7%9A%84%E6%B5%81%E7%A8%8Bgif%E5%9B%BE.gif#crop=0&crop=0&crop=1&crop=1&id=oTluA&originHeight=946&originWidth=1915&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
<a name="xmDMW"></a>
## 功能分析

1. 头部存在一个输入框和按钮，分别是输入文章标题的title，其次就是一个草稿箱保存的按钮，然后就是发布文章的按钮，这里做的是一个弹窗。
1. 然后就是一个markdown文本编辑的区域。
1. 需要做的就是收集title和markdown的value值，然后点击发布之后就可以将值传递给弹窗组件。
1. 选择对应的文章分类、选择图片、然后摘要、文章标签等。
<a name="A0wqG"></a>
### 相关目录介绍
![](https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/dayImage/20220709090537.png#crop=0&crop=0&crop=1&crop=1&id=HSmeE&originHeight=1020&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
<a name="ThFbA"></a>
### 组件代码拆分
相关代码都有注释
<a name="LzktH"></a>
#### 文章发布的组件页面(index.tsx)
```tsx
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
```
<a name="xCJsH"></a>
#### markdown编辑器（articleMd.tsx）
```tsx
/*
 * @Author: bugdr
 * @Date: 2022-07-05 10:37:17
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-08 21:52:10
 * @FilePath: \react-blog-admin\src\views\article\components\articleMd.tsx
 * @Description:markdown编辑器
 */

import { FC, useState } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import math from '@bytemd/plugin-math';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import zhHans from 'bytemd/locales/zh_Hans.json';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/hybrid.css';
import './index.module.css';

// 配置插件
const plugins = [gfm(), highlight(), breaks(), frontmatter(), gemoji(), math(), mediumZoom()];
const ArticleMd: FC = (props: any) => {
  const { articleForm, setArticleForm } = props;
  const [value, setValue] = useState('');
  return (
    <>
      <Editor
        value={value}
        locale={zhHans} // 配置语言
        plugins={plugins} //markdown中用到的插件，如表格、数学公式、流程图
        onChange={(v) => {
          setValue(v);
          // 设置值
          setArticleForm({
            ...articleForm,
            content: v,
          });
        }}
        placeholder="请尽情的创作吧，我的朋友"
      />
    </>
  );
};
export default ArticleMd;
```
<a name="CAjsM"></a>
#### 当前markdown编辑器你的高度的css样式
```css
:global(.bytemd) {
    height: calc(100vh - 210px); // 高度
}
```
<a name="s3H6v"></a>
#### 文章发布的弹窗组件（articleModal.tsx）
```tsx
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
```
<a name="aXxGG"></a>
#### 图片弹窗选择的组件（ImageModal.tsx）
```tsx
/*
 * @Author: bugdr
 * @Date: 2022-07-05 16:04:14
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-07 20:25:15
 * @FilePath: \react-blog-admin\src\components\ImageModal\index.tsx
 * @Description:图片列表弹窗
 */
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  message,
  Modal,
  Radio,
  Upload,
  UploadProps,
  Image,
  Tabs,
  Pagination,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getImageList, uploadImage } from '/@/api/image';
import { getImageCategoryList } from '/@/api/imageCategory';
import { ResponseCode } from '/@/utils/response';
import { uploadBeforeImageValid } from '/@/utils/upload';

const { TabPane } = Tabs;

const ImageModal = (props: any) => {
  const { imageModalVisible, setImageModalVisible, articleForm, setArticleForm } = props;
  // 取消弹窗
  const handleCancel = () => {
    setImageModalVisible(false);
  };
  // 图片列表的封装
  const [imageList, setImageList] = useState([]);
  // 获取分页参数
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 50,
    showQuickJumper: true, // 快熟跳转到某一页
    showSizeChanger: true, // 是否展示pagesize的切换器
    pageSizeOptions: ['10', '20', '50', '100'], // 是否展示pagesize的切换器
    showTotal: (total: number) => `总共拥有${total}张图片`, // 总和
  });
  // 获取图片列表
  const initImageList = async (args: any) => {
    const params = {
      page: args.current,
      size: args.pageSize,
      categoryId: args.categoryId !== 'null' ? args.categoryId : undefined,
      userId: args.userId ? args.userId : null,
    };
    const { result, code, message } = await getImageList(params);
    if (code === ResponseCode.SUCCESS) {
      const { contents, currentPage, pageSize, totalCount } = result;
      setPagination({
        ...pagination,
        current: currentPage,
        pageSize: pageSize,
        total: totalCount,
      });
      // 成功
      setImageList(contents);
    } else {
      message.error(message);
    }
  };

  // 获取用户信息
  const { UserInfo } = useSelector((store: any) => store.user);

  // 图片分类
  const [imageCategoryList, setImageCategoryList] = useState([]);
  // 获取图片默认选中的
  const [imageCategoryKey, setImageCategoryKey] = useState<string>();
  // 获取图片分类列表
  const initImageCategoryList = async () => {
    const params = {
      page: 1,
      size: 100,
      userId: UserInfo.id ? UserInfo.id : undefined,
    };
    const { result, code, message } = await getImageCategoryList(params);
    if (code === ResponseCode.SUCCESS) {
      const firstCategoryList = {
        id: undefined,
        categoryName: '全部图片',
      };
      result.contents.unshift(firstCategoryList);
      setImageCategoryList(result.contents);
    } else {
      message.error(message);
    }
  };

  // 自定义上传图片的状态
  const [imageUploadState, setImageUploadState] = useState(false);

  // 上传图片
  const uploadProps: UploadProps = {
    name: 'file',
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: async (file) => {
      //上传之前的验证
      const valid = await uploadBeforeImageValid(file);
      if (!valid) return;
    },
    customRequest: async (file) => {
      // 自定义上传
      setImageUploadState(true);
      const params = {
        original: 'article',
        imageCategoryId: imageCategoryKey ? imageCategoryKey : null,
        file: file,
      };
      const { data } = await uploadImage(params);
      if (data.code === ResponseCode.SUCCESS) {
        // 上传成功
        message.success(data.message);
        // 更新获取图片的接口
        const params = {
          ...pagination,
          categoryId: imageCategoryKey,
        };
        await initImageList(params);
        setImageUploadState(false);
      } else {
        message.error(data.message);
        setImageUploadState(false);
      }
    },
  };

  // 点击tabs
  const changeImageCategory = async (activeKey: string) => {
    // 激活tabs赋值
    setImageCategoryKey(activeKey);
    // 触发图片页面搜索
    const params = {
      ...pagination,
      categoryId: activeKey,
    };
    await initImageList(params);
  };

  // 改变页码
  const pageChange = async (page: number, pageSize: number) => {
    const params = {
      current: page,
      pageSize: pageSize,
    };
    await initImageList(params);
  };

  // 选中图片
  const [checkImageUrl, setCheckImageUrl] = useState();
  // 选中图片
  const handleSubmit = (data: any) => {
    setCheckImageUrl(data.url);
  };

  // 提交选中的图片
  const submitSelectImage = () => {
    // 提交
    if (!checkImageUrl) return message.error('请选择一张图片吧');
    setArticleForm({
      ...articleForm,
      cover: checkImageUrl,
    });
    // 关闭弹窗
    handleCancel();
  };

  useEffect(() => {
    initImageList(pagination);
    initImageCategoryList();
  }, []);

  return (
    <>
      <Modal
        title="图片列表"
        maskClosable={false}
        onCancel={handleCancel}
        visible={imageModalVisible}
        width="680px"
        footer={[
          <>
            <div key="footer" className="flex items-center justify-end">
              <div key="pagination" className="flex-1 mr-4">
                <Pagination
                  size="small"
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  showSizeChanger={pagination.showSizeChanger}
                  showTotal={pagination.showTotal}
                  onChange={pageChange}
                />
              </div>
              <Button key="back" onClick={handleCancel}>
                返回
              </Button>
              <Button key="submit" type="primary" htmlType="submit" onClick={submitSelectImage}>
                选择
              </Button>
            </div>
          </>,
        ]}
      >
        <div className="flex w-full">
          <div className="border-r-1 mr-4 border-black">
            <Tabs
              defaultActiveKey={imageCategoryKey}
              tabBarGutter={6}
              type="card"
              tabPosition="left"
              onChange={changeImageCategory}
              style={{ height: 420, overflow: 'auto' }}
            >
              {imageCategoryList && imageCategoryList.length
                ? imageCategoryList.map((item: any) => (
                    <TabPane tab={item.categoryName} key={item.id} forceRender={true}></TabPane>
                  ))
                : null}
            </Tabs>
          </div>
          <div className="flex flex-col">
            <div className="md:flex items-center">
              <Upload {...uploadProps}>
                <Button icon={imageUploadState ? <LoadingOutlined /> : <UploadOutlined />}>
                  {imageUploadState ? `图片上传中` : `上传图片`}
                </Button>
              </Upload>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className="grid gap-2 md:grid-cols-4 grid-cols-2">
              {imageList &&
                imageList.map((item: any) => {
                  return (
                    <Radio.Group
                      value={checkImageUrl}
                      key={item.id}
                      onChange={() => handleSubmit(item)}
                    >
                      <Radio.Button
                        key={item.id}
                        style={{
                          width: '120px',
                          height: '120px',
                          padding: '2px',
                          borderRadius: '2px',
                        }}
                        value={item}
                        autoFocus={true}
                      >
                        <Image
                          className="rounded-lg object-cover"
                          width="100%"
                          height="100%"
                          preview={false}
                          src={item.url}
                          alt={item.name}
                          placeholder="true"
                        />
                      </Radio.Button>
                    </Radio.Group>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
```
以上就是整个发布文章构建的组件。
<a name="LFnaz"></a>
### 配合接口联调
接口联调这块就不展示出来了。<br />以上就是整个发布文章的项目代码。
