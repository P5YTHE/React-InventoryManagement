import React from "react";
import { CardContent, makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
    cardContent: {
        margin: '10px',
        padding: '0.3em 1em !important',
        border: '2px solid #379bff',
        borderRadius: '5px'
    }
})

const ContentTile = ({ children , value }) => {
    const classes = useStyles();
  return (
    <div>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="subtitle2" component="div">
         {children}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
            {value}
        </Typography>
      </CardContent>
    </div>
  );
};
export default ContentTile
