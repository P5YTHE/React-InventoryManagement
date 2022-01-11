import "./App.css";
import {
  Container,
  createMuiTheme,
  Grid,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import FeaturedPost from "./components/FeaturedPost";
import PostCard from "./components/PostCard";
import Header from "./components/Header";
import { featuredPosts, sidebar } from "./Data/Data";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Route, Routes, useNavigate } from "react-router";
import HomeScreen from "./screens/HomeScreen";
import { ProfileScreen } from "./screens/ProfileScreen/ProfileScreen";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";
import ProductsScreen from "./screens/ProductsScreen";
import {storage} from './firebase';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

function App() {

  const navigate = useNavigate();
  const auth = new Auth(navigate);
  // const auth = new Auth();
  
  // const getDesignTokens = (mode) => ({
  //   palette: {
  //     mode,
  //     ...(mode === 'light'
  //       ? {
  //           // palette values for light mode
  //           primary: amber,
  //           divider: amber[200],
  //           text: {
  //             primary: grey[900],
  //             secondary: grey[800],
  //           },
  //         }
  //       : {
  //           // palette values for dark mode
  //           primary: deepOrange,
  //           divider: deepOrange[700],
  //           background: {
  //             default: deepOrange[900],
  //             paper: deepOrange[900],
  //           },
  //           text: {
  //             primary: '#fff',
  //             secondary: grey[500],
  //           },
  //         }),
  //   },
  // });
  const Theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });


  const classes = useStyles();

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header auth={auth} />
          <></>
        <Routes>
          <Route exact path='/' element={<HomeScreen/> } />
          <Route  path='/profile' element={<ProfileScreen/> } />
          <Route  path='/callback' element={<Callback auth={auth}/> } />
          <Route path='/products' element={<ProductsScreen/>} />

        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
