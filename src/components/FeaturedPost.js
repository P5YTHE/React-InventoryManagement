import {  
  Card,  
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  cover: {
    backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/react-app-fca28.appspot.com/o/files%2Ffavicon.ico?alt=media&token=9c4b4a34-55de-414c-90f6-851a8edac93d) `,
    backgroundPosition: "center",   
    height: "100%",
    backgroundPosition: "center",        
    padding: "35px 25px",
    whiteSpace: "nowrap",
    height: "20vw",   
  },
  title: {
    fontSize: 50,
    fontFamily: "Russo One",
    color:"black",
  },
  textContainer: {
    color: "Black",
    alignContent:"center",    
    textShadow:"2px 0px grey",
  },
  innerBlock : {
    backgroundColor:"white",
    fontSize: 50,
    fontFamily: "Russo One",
    boxShadow: "4px 4px white"
  },
  innerContent: {
    fontSize: 25,
    fontFamily: "Roboto",
    color:"black",
  }
});

const FeaturedPost = () => {
  const classes = useStyles();  

  return (
    <>    
    <Card className={classes.cover}>
      <CardContent className={classes.textContainer} >
        <div></div>
        <Typography className={classes.title} gutterBottom>
        <Card>
          <CardContent className={classes.innerBlock} gutterBottom>
          <Typography className={classes.title} gutterBottom>
          INVENTORY MANAGEMENT 
          </Typography>
        <Typography className={classes.innerContent}>
         Inventory management system helps to keep track of the product inventory          
        </Typography>
        <Typography className={classes.innerContent}>         
         in your warehouse/factory with an interactive Ui and 
        </Typography>
        <Typography className={classes.innerContent}>         
        ease of access to the database.
        </Typography>
          </CardContent>
        </Card>
        </Typography>       
      </CardContent>      
    </Card>
    </>
  );
};

export default FeaturedPost;
