import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@material-ui/core/Grid";


import Stepper from './Stepper'
import { Divider } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Grid
    container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  >
    <Card sx={{ minWidth: '100%' ,backgroundColor:'#F0f3fb'  }}>
      <CardContent >
        <Typography sx={{ fontSize: 25 }} fontWeight={'Bold'} color="text.secondary" align='center' gutterBottom>
          How it Works?
        </Typography>
        <Divider varient='middle'/>
        <CardContent sx={{ borderSpacing: 10}}>
        <Stepper/>
        </CardContent>
        {/* <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>

      
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    </Grid>
  );
}
