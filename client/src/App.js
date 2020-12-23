import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MDBContainer, MDBFooter } from "mdbreact";

import Register from "./containers/Auth/Register";
import Login from "./containers/Auth/Login";
import Navbar from "./components/Layout/Navbar/Navbar";
import Ostroy from "./containers/Dashboard/Stories/Ostroy";
import ReadBook from "./containers/Reader/ReadBook";
import BookUpload from "./containers/Dashboard/Upload/BookUpload";
import Library from "./containers/Library/Library";
import Dashboard from "./containers/Dashboard/Dashboard";
import Browser from "./containers/Browser/Browser";
import Profile from "./containers/Profile/Profile";
import ResultPage from "./containers/Result/ResultPage";
import EditProfile from "./containers/Profile/Parts/EditProfile/EditProfile";

import Footer from "./components/Layout/Footer/Footer";
import { store, persistor } from "./store";
// import { Result } from "express-validator";

const App = (props) => {
  console.log(props.history);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <div className="main">
              <Navbar />

              <Route component={Login} exact path="/" />
              <Route component={Register} exact path="/Register" />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Ostroy} />
              <Route exact path="/readbook" component={ReadBook} />
              <Route exact path="/uploadbook" component={BookUpload} />
              <Route exact path="/library/:username" component={Library} />
              <Route exact path="/userdash" component={Dashboard} />
              <Route exact path="/browserbooks" component={Browser} />
              <Switch>
                <Route exact path="/searchresult" component={ResultPage} />
              </Switch>
              <Switch>
                <Route exact path="/profile/:handle" component={Profile} />
              </Switch>
              <Route exact path="/edit-profile" component={EditProfile} />
            </div>
            {/* <MDBFooter className="font-small pt-4 mt-4 Footer"> */}
            <Footer />
            {/* </MDBFooter> */}
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
