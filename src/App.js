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
import { ErrorBoundary } from "react-error-boundary";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";
import ProductsScreen from "./screens/ProductsScreen";
import { CssBaseline } from "@mui/material";
import Checkout from "./components/AddProductUI";
import EditProducts from "./components/EditProduct";
import ErrorPage from "./components/ErrorPage";
import NotFoundPage from "./components/NotFoundPage";

//useStyles used to style components
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  mainContainer: {
    minHeight: "95vh",
  },
  root: {
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgrondSize: "cover",
  },
}));

function App() {
  const navigate = useNavigate();
  const auth = new Auth(navigate);

  const Theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ErrorBoundary onError={() => navigate("/error")}>
        <CssBaseline />
        <ThemeProvider theme={Theme}>
          <Container className={classes.mainContainer}>
            <Header auth={auth} />
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route path="/profile" element={<ProfileScreen auth={auth} />} />
              <Route path="/categories" element={<CategoryScreen />} />
              <Route path="/addcategories" element={<AddCategoryScreen />} />
              <Route path="/callback" element={<Callback auth={auth} />} />
              <Route path="/products" element={<ProductsScreen />} />
              <Route path="/products/AddProductUI" element={<Checkout />} />
              <Route
                path="/products/editProduct/:id"
                element={<EditProducts />}
              />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
          <Footer />
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
