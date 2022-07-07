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
