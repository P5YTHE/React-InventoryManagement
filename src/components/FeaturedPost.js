import {  
  Card,  
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  cover: {
    // backgroundImage: `url(https://i.ibb.co/YDpcKCg/Dark-Warehouses-1.jpg) `,
    backgroundColor:"#379bff",
    backgroundPosition: "center",   
    height: "200%",
    backgroundPosition: "center",        
    padding: "35px 25px",
    whiteSpace: "nowrap",
    height: "125vw", 
    width: "90%"  
  },
  title: {
    fontSize: 50,
    fontFamily: "Russo One",
    color:"white",
    textAlign:"center",
    textShadow:"2px 0px grey",
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
    textAlign:"center",
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
        <Typography className={classes.title} gutterBottom>
          INVENTORY TRACK
          </Typography>
        <Card>
          <CardContent className={classes.innerBlock} gutterBottom>
          
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
        <img src=""></img>
        </Typography>       
      </CardContent>      
    </Card>
    </>
  );
};

export default FeaturedPost;
