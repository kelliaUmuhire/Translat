import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MDBContainer, MDBFooter } from "mdbreact";

import Register from "./containers/Auth/Register";
import Login from "./containers/Auth/Login";
import Navbar from "./components/Layout/Navbar/Navbar";
import Ostroy from "./containers/Dashboard/Stories/Ostroy";
import ReadBook from "./containers/Reader/ReadBook";
import BookUpload from "./containers/Dashboard/Upload/BookUpload";
import Library from "./containers/Dashboard/Library";
import Dashboard from "./containers/Dashboard/Dashboard";
import Browser from "./containers/Browser/Browser";
import Profile from "./containers/Profile/Profile";
import ResultPage from "./containers/Result/ResultPage";

import Footer from "./components/Layout/Footer/Footer";
import { store, persistor } from "./store";
// import { Result } from "express-validator";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <MDBContainer className="App">
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
            <Route exact path="/searchresult" component={ResultPage} />
            <Route exact path="/profile/:handle" component={Profile} />
          </MDBContainer>
          {/* <MDBFooter>
            <Footer /> fixing issues
          </MDBFooter> */}
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
