import React, {use,useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";

const CategoryGrid = () => {
const url='';
const[categories,setCategory] = useState(null);

const useStyles = makeStyles((theme) => ({
    lists: { width : '100%',
             maxWidth: 250,
             bgcolor: 'secondary',

    },
 }));

 const classes = useStyles();

 useEffect(()=>{
        axios.get(url).then(response=>{
           setCategory(response.data);
        })
   },[url]);  



  return (
    <List className={classes.lists} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Accessories" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Clothing" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Footwear" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="CasualWear" />
      </ListItem>
    </List>
  );
}

export default CategoryGrid;

