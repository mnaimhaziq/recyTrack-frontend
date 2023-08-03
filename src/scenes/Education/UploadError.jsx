import {  LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { FileHeader } from './FileHeader';



export function UploadError({ file, onDeleteError, errors }) {
  return (
    <React.Fragment>
      <FileHeader file={file} onDelete={onDeleteError} />
      <LinearProgress variant="determinate" value={100} />
      {errors.map((error, index) => (
        <div key={index}>
          <Typography color="error">{error.message}</Typography>
        </div>
      ))}
    </React.Fragment>
  );
}