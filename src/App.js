import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import Traffic from "./pages/traffic/Traffic";
import Environment from "./pages/environment/Environment";
import Correlation from "./pages/correlation/Correlation";
import AutoCorrelation from "./pages/correlation/AutoCorrelation";
import CrossCorrelation from "./pages/correlation/CrossCorrelation";
import Power from "./pages/power/Power";
import GeoLocation from "./pages/geoLocation/GeoLocation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import ProductList from "./pages/productList/ProductList";
// import Product from "./pages/product/Product";
// import NewProduct from "./pages/newProduct/NewProduct";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          {/* <Route exact path="/">
            <Home />
          </Route> */}
          <Route exact path="/">
            <Traffic />
          </Route>
          <Route path="/environment">
            <Environment />
          </Route>
          <Route path="/correlation">
            <Correlation />
          </Route>
          <Route path="/autoCorrelation">
            <AutoCorrelation />
          </Route>
          <Route path="/crossCorrelation">
            <CrossCorrelation />
          </Route>
          <Route path="/power">
            <Power />
          </Route>
          <Route path="/geoLocation">
            <GeoLocation />
          </Route>
          {/* <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
