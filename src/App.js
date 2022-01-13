import "./App.css";
import {storage} from "./firebase";
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

import CategoryScreen from "./screens/CategoryScreen";

import {storage} from './firebase';
import AddCategoryScreen from "./screens/AddCategoryScreen";

import { ProfileScreen } from "./screens/ProfileScreen";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";
import ProductsScreen from "./screens/ProductsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import { getDownloadURL,ref, uploadBytesResumable } from "@firebase/storage";
import { useState } from "react";




const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  mainContainer:{
    minHeight:"95vh",
  }
}));

function App() {

  const navigate = useNavigate();
  const auth = new Auth(navigate);
  const [progress,setProgress]=useState(0);
  const [product, setProduct]=useState(null);


  const formHandler = (e)=>{
    e.preventDefault();
    const file= e.target[0].files[0];
    uploadFiles(file);
  }
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
  const uploadFiles = (file) => {
    if(!file) return;

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,file);
    uploadTask.on("state_changed",(snapshot)=>{
      const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
    
    setProgress(prog);

    
  },(err)=>console.log(err),
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then(url=>console.log(url))
  });
  };

  const Theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });


  const classes = useStyles();

  return (
    <ThemeProvider theme={Theme}>
      <Container className={classes.mainContainer}>      
        
        <Header auth={auth} />          
        {/* <form onSubmit={formHandler}>
          <input type="file" className="input"></input>
          <button type="submit">Upload</button>
        </form>
        <h3>Uploaded {progress} %</h3>

        <form onSubmit={formHandler}>
          <input type="file" className="input"></input>
          <button type="submit">Upload</button>
        </form>        
        <h3>Uploaded {progress} %</h3> */}
        <Routes>
          <Route exact path='/' element={<HomeScreen/> } />
          <Route  path='/profile' element={<ProfileScreen/> } />

          <Route path='/categories' element={<CategoryScreen />} />
          
          <Route path='/addcategories' element={<AddCategoryScreen />} />



          <Route  path='/editprofile' element={<EditProfileScreen /> } />
          <Route  path='/callback' element={<Callback auth={auth}/> } />
          <Route path='/products' element={<ProductsScreen/>} />       

        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

