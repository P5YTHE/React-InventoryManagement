import React, {use,useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import { getAuthorizationHeader } from '../utilities';
import ViewCategoryProducts from "./ViewCategoryProducts";

const CategoryGrid = () => {
const urlGetCategory='https://localhost:7157/api/Categories';

const[categories,setCategory] = useState([]);
const[selectCategory,setSelectCategory]=useState(0);

const useStyles = makeStyles((theme) => ({
    lists: { width : '100%',
             maxWidth: 250,
             bgcolor: 'secondary',

    },
 }));

 const classes = useStyles();

 useEffect(()=>{
        axios.get(urlGetCategory,getAuthorizationHeader()).then(response=>{
           setCategory(response.data);
        });       
   },[urlGetCategory]);  

   
   console.log(categories);

  return (
    <>
    <Grid container>
      <Grid item xs={3}>
      <List className={classes.lists} component="nav" aria-label="mailbox folders">
          {categories.map(categories =>(<>
          
          <ListItem button>
        <ListItemText onClick={()=>setSelectCategory(categories.categoryId)}>{categories.categoryName}</ListItemText>
      </ListItem>
      <Divider /> 
          
          </>
              ))}
    </List>
      </Grid>
      <Grid item xs={9}>
      <ViewCategoryProducts categoryId={selectCategory}/>
      </Grid>
      
    </Grid>
   
   
    </>
  );
}

export default CategoryGrid;

