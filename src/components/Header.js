import {
  Badge,
  Divider,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";
import SideDrawer from "./SideDrawer";
import { useNavigate } from "react-router";


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  tagline: {
    fontSize: 20,
    textTransform: "uppercase",
    justifyContent: "center",
    fontFamily: "Montserrat",
  },
  icon: {    
    color:"black",
  }
}));

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Toolbar >
        <SideDrawer>
          <IconButton>
            <MenuIcon className={classes.icon}/>
          </IconButton>
        </SideDrawer>
        <Typography variant="h6" className={classes.title}>
          
        </Typography>        
        <IconButton color="inherit" onClick={() => navigate("/profile")}>
          <AccountCircle />
        </IconButton>
      </Toolbar>

      <Divider />

      <Toolbar className={classes.tagline}>
        
      </Toolbar>
    </>
  );
}

export default Header;
