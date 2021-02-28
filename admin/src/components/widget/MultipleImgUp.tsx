import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
/**
 * @param {number} num
 * @param {Function} sendURLs
 */
class MultipleImgUp extends React.Component< {sendURLs:Function,num:number}> {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  //@ts-ignore
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    // console.log(fileList);
    const newList = fileList.map((ele:any)=>{
      if(ele.status == 'done'){
        return ele.response.data
      }else{
        return false
      }
    })
    if(newList.every((ele:any)=>{
      return ele !== false
    })){
      if(this.props?.sendURLs){
        this.props.sendURLs(newList)
      } 
    }
    // this.props?.sendURLs()
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          name="img"
          action="admin/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= this.props.num ? null : uploadButton}
        </Upload>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default MultipleImgUp