import "./App.css";
import {
  Container,
  createMuiTheme,
  Grid,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import Header from "./components/Header";
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
import AddProduct from "./components/AddProduct";
import { CssBaseline } from "@mui/material";
import Checkout from './components/AddProductDesign';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  mainContainer:{
    minHeight:"95vh",
  },
  root: {
    minHeight:"100vh",
    // backgroundImage:'url(https://cdnb.artstation.com/p/assets/images/images/043/059/331/4k/zeto-cg-0001.jpg?1636189610)',
    backgroundRepeat: 'no-repeat',
    backgrondSize:'cover',
  }
}));

function App() {

  const navigate = useNavigate();
  const auth = new Auth(navigate);

  // const [progress,setProgress]=useState(0);
  // const [product, setProduct]=useState(null);


  // const formHandler = (e)=>{
  //   e.preventDefault();
  //   const file= e.target[0].files[0];
  //   uploadFiles(file);
  // }
  
  
  // const uploadFiles = (file) => {
  //   if(!file) return;
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef,file);
  //   uploadTask.on("state_changed",(snapshot)=>{
  //     const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
    
  //   setProgress(prog);

    
  // },(err)=>console.log(err),
  // ()=>{
  //   getDownloadURL(uploadTask.snapshot.ref).then(url=>console.log(url))
  // });
  // };


  const Theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });


  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline/>
        <ThemeProvider theme={Theme}>
          <Container className={classes.mainContainer}>              
            <Header auth={auth} />                 
              <Routes>
                <Route exact path='/' element={<HomeScreen/> } />
                <Route  path='/profile' element={<ProfileScreen/> } />
                <Route path='/categories' element={<CategoryScreen />} />          
                <Route path='/addcategories' element={<AddCategoryScreen />} />
                <Route  path='/editprofile' element={<EditProfileScreen /> } />
                <Route  path='/callback' element={<Callback auth={auth}/> } />
                <Route path='/products' element={<ProductsScreen/>} /> 
                <Route path='/addProduct' element={<AddProduct/>} />
                <Route path='/addProductDesign' element={<Checkout/>}/>
                
              </Routes>
            </Container>
          <Footer />
        </ThemeProvider>
    </div>

  );
}

export default App;

