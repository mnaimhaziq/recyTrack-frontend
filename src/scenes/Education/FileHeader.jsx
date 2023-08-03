import { Button, Grid } from '@mui/material';
import React from 'react';

export function FileHeader({ file, cloudinary,onDelete }) {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>{file.name || file.path}</Grid>
      <Grid item>
        <Button size="small" onClick={() => {onDelete( file, cloudinary?.public_id); }}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
