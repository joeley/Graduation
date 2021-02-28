/**
 * Created by joeley on 2020/2/26.
 */

import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

function getBase64(img: any, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type.startsWith('image/') || file.type.startsWith('video/');
  if (!isJpgOrPng) {
    message.error('You can only upload Image or Video file!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Image must smaller than 10MB!');
  }
  return isJpgOrPng && isLt10M;
}


/**
 * @param imageUrl
 * @param sendURL function
 */
class SingleImgUp extends React.PureComponent<{ sendURL: Function, imageUrl?: string }> {
  // static defaultProps = {
  //     sendImgSrc: () =>{}
  // };

  state: {
    loading: boolean;
    imageUrl?: string;
  } = {
      loading: false,
    };

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.props.sendURL(info.file.response.data);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const props: any = this.props
    return (
      <Upload
        name="img"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="admin/upload"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl || props.imageUrl ? (
          <img src={imageUrl || props.imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
            uploadButton
          )}
      </Upload>
    );
  }
}
export default SingleImgUp;
