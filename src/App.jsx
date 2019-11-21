import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Homepage from "./Homepage.jsx";
import UploadItem from "./UploadItem.jsx";
import Cart from "./Cart.jsx";
import Marketplace from "./Marketplace.jsx";
import ItemDetails from "./ItemDetails.jsx";
import MyProfile from "./MyProfile.jsx";
import Profile from "./Profile.jsx";
import Search from "./Search.jsx";

class UnconnectedApp extends Component {
  render = () => {
    if (this.props.login) {
      return (
        <div>
          <Homepage />
        </div>
      );
    }
    return (
      <BrowserRouter>
        <div>
          <div>
            <Route exact={true} path="/" component={Homepage} />
            <Route exact={true} path="/signup" component={Signup} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/cart" component={Cart} />
            <Route exact={true} path="/marketplace" component={Marketplace} />
            <Route exact={true} path="/profile" component={Profile} />
            <Route exact={true} path="/myprofile" component={MyProfile} />
            <Route exact={true} path="/search" component={Search} />
            <Route
              exact={true}
              path="/itemdetails/:itemId"
              render={routerData => (
                <ItemDetails itemId={routerData.match.params.itemId} />
              )}
            />
            <Route
              exact={true}
              path="/profile/:username"
              render={routerData => (
                <Profile sellerUsername={routerData.match.params.username} />
              )}
            />
            <div></div>
          </div>
        </div>
      </BrowserRouter>
    );
  };
}

let App = connect()(UnconnectedApp);
export default App;
