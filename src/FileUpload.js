import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('pdfFiles', file);
      });
      const response = await axios.post('https://zipserver.zeabur.app/convert', formData, {
        responseType: 'blob' 
      });
  
      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }
  
      const blob = new Blob([response.data]);
  
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'converted.zip';

      link.click();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Convert PDF to ZIP</button>
    </div>
  );
};

export default FileUpload;
