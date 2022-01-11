import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  backgroundColor: 'cyan'
}));

export default function CategoryGrid() {
  return (
    <Box sx={{ width: '50%' }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm:1, md: 2 }}>

        <Grid item xs={12}>
          <Item>Category 1</Item>
        </Grid>
        <Grid item xs={12}>
          <Item>Category 2</Item>
        </Grid>
        <Grid item xs={12}>
          <Item>Category 3</Item>
        </Grid>
        <Grid item xs={12}>
          <Item>Category 4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}