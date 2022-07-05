/*
 * @Author: bugdr
 * @Date: 2022-07-05 16:04:14
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 21:10:49
 * @FilePath: \react-blog-admin\src\components\ImageModal\index.tsx
 * @Description:图片列表弹窗
 */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  message,
  Modal,
  Radio,
  Row,
  Upload,
  UploadProps,
  Image,
  Tabs,
  Pagination,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getImageList } from '/@/api/image';
import { getImageCategoryList } from '/@/api/imageCategory';
import { ResponseCode } from '/@/utils/response';

const { TabPane } = Tabs;

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const ImageModal = (props: any) => {
  const { imageModalVisible, setImageModalVisible } = props;
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
    };
    const { result, code, message } = await getImageList(params);
    if (code === ResponseCode.SUCCESS) {
      // 成功
      setImageList(result.contents);
    } else {
      message.error(message);
    }
  };

  // 获取用户信息
  const { UserInfo } = useSelector((store: any) => store.user);

  // 图片分类
  const [imageCategoryList, setImageCategoryList] = useState([]);
  // 获取图片默认选中的
  const [imageCategoryKey, setImageCategoryKey] = useState(undefined);
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
                />
              </div>
              <Button key="back" onClick={handleCancel}>
                返回
              </Button>
              <Button key="submit" type="primary">
                选择
              </Button>
            </div>
          </>,
        ]}
      >
        <div className="flex justify-between">
          <div className="border-r-1 mr-4  border-black">
            <Tabs
              type="card"
              defaultActiveKey={imageCategoryKey}
              tabPosition="left"
              tabBarGutter={6}
              style={{ height: 430 }}
            >
              {imageCategoryList && imageCategoryList.length
                ? imageCategoryList.map((item: any) => {
                    return <TabPane tab={item.categoryName} key={item.id}></TabPane>;
                  })
                : null}
            </Tabs>
          </div>
          <div className="flex flex-col">
            <div className="md:flex items-center">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传图片</Button>
              </Upload>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className="grid gap-2 md:grid-cols-4 grid-cols-2">
              {imageList &&
                imageList.map((item: any) => {
                  return (
                    <Radio.Group defaultValue="a" key={item.id}>
                      <Radio.Button
                        style={{
                          width: '120px',
                          height: '120px',
                          padding: '2px',
                          borderRadius: '2px',
                        }}
                        value={item}
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
