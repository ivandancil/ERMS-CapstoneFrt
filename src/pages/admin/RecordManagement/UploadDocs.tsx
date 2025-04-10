import React, { useState } from 'react';
import { Button, Input, Table, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadDocs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  // Function to handle file upload
  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  // Function to open modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle the form submit
  const handleSubmit = () => {
    // Here, you would typically upload the file to your backend.
    // For now, let's just update the documents list for illustration.
    if (fileList.length > 0) {
      const uploadedDocuments = fileList.map((file: any) => ({
        fileName: file.name,
        fileUrl: file.url || 'sampleFileUrl',
        uploadedAt: new Date().toLocaleDateString(),
      }));
      setDocuments([...documents, ...uploadedDocuments]);
      setFileList([]);
      message.success('Documents uploaded successfully!');
      setIsModalVisible(false);
    } else {
      message.error('Please select a file to upload.');
    }
  };

  // Columns for the uploaded documents table
  const columns = [
    {
      title: 'Document Name',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: 'Uploaded On',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Button
          type="link"
          onClick={() => window.open(record.fileUrl, '_blank')}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Upload Document
      </Button>

      <Modal
        title="Upload Documents"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Upload
          </Button>,
        ]}
      >
        <Input
          type="file"
          onChange={handleFileChange}
          multiple
          accept=".pdf,.docx,.png,.jpg,.jpeg"
        />
      </Modal>

      <Table
        columns={columns}
        dataSource={documents}
        pagination={false}
        rowKey="fileName"
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default UploadDocs;
