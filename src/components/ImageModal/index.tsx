/*
 * @Author: bugdr
 * @Date: 2022-07-05 16:04:14
 * @LastEditors: bugdr
 * @LastEditTime: 2022-07-05 17:50:53
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
} from 'antd';

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
  return (
    <>
      <Modal
        title="图片列表"
        maskClosable={false}
        onCancel={handleCancel}
        visible={imageModalVisible}
        width="800px"
      >
        <div className="flex items-center">
          <div className="border-r-1 mr-4 border-black">
            <Tabs type="card" defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
              {[...Array.from({ length: 30 }, (_, i) => i)].map((i) => (
                <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}></TabPane>
              ))}
            </Tabs>
          </div>
          <div className="flex flex-col">
            <div className="md:flex items-center">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传图片</Button>
              </Upload>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className="grid gap-1 md:grid-cols-4 grid-cols-2">
              <Radio.Group defaultValue="a">
                <Radio.Button
                  style={{
                    width: '120px',
                    height: '120px',
                    padding: '2px',
                    borderRadius: '2px',
                  }}
                  value="a"
                >
                  <Image
                    className="rounded-lg"
                    width="100%"
                    height="100%"
                    preview={false}
                    src="https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/blog-images/app/blog-app.jpg"
                  />
                </Radio.Button>
              </Radio.Group>
              <Radio.Group defaultValue="a">
                <Radio.Button
                  style={{
                    width: '120px',
                    height: '120px',
                    padding: '2px',
                    borderRadius: '2px',
                  }}
                  value="a"
                >
                  <Image
                    className="rounded-lg"
                    width="100%"
                    height="100%"
                    preview={false}
                    src="https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/blog-images/app/blog-app.jpg"
                  />
                </Radio.Button>
              </Radio.Group>
              <Radio.Group defaultValue="a">
                <Radio.Button
                  style={{
                    width: '120px',
                    height: '120px',
                    padding: '2px',
                    borderRadius: '2px',
                  }}
                  value="a"
                >
                  <Image
                    className="rounded-lg"
                    width="100%"
                    height="100%"
                    preview={false}
                    src="https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/blog-images/app/blog-app.jpg"
                  />
                </Radio.Button>
              </Radio.Group>
              <Radio.Group defaultValue="a">
                <Radio.Button
                  style={{
                    width: '120px',
                    height: '120px',
                    padding: '2px',
                    borderRadius: '2px',
                  }}
                  value="a"
                >
                  <Image
                    className="rounded-lg"
                    width="100%"
                    height="100%"
                    preview={false}
                    src="https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/blog-images/app/blog-app.jpg"
                  />
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
