import { Grid, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FileHeader } from './FileHeader';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

export default function SingleFileUploadWithProgress({
  file,
  onDelete,
  onUpload,
  cloudinary
}) {
  const [progress, setProgress] = useState(0);

  const user = useUser();
  useEffect(() => {
    async function upload() {
      try {
        const uploadedFile = await uploadFile(file, setProgress ,user.token);
        onUpload(file, uploadedFile);
      } catch (error) {
        // Handle any error that occurred during upload
        console.error('Error uploading file:', error);
      }
    }

    upload();
    // eslint-disable-next-line
  }, []);



  return (
    <Grid item>
      <FileHeader file={file} cloudinary={cloudinary}  onDelete={onDelete}  />
      <LinearProgress variant="determinate" value={progress} />
      <div>{progress}%</div>
    </Grid>
  );
}

async function uploadFile(file, onProgress, token) {

  const simulatedDelay = 1000;

  try {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setTimeout(() => {
          onProgress(percentage);
        }, simulatedDelay);
      },
    };

    const response = await axios.post('http://localhost:5000/api/education/upload', formData, config);
    return response.data;
  } catch (error) {
    throw new Error('File upload failed.');
  }
}
