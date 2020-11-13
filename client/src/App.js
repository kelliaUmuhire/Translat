import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbar/Navbar";
import Ostroy from "./components/Ostroy/Ostroy";
import ReadBook from "./components/Reader/ReadBook";
import BookUpload from "./components/Ostroy/Upload/BookUpload";
import WriteBook from "./components/Ostroy/WriteBook/WriteBook";
import ReadContent from "./components/Reader/ReadContent";
//temp
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Layout/Footer/Footer";
import { store, persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Navbar />
            <Route component={Register} exact path="/" />
            <Route component={Register} exact path="/Register" />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Ostroy} />
            <Route exact path="/readbook" component={ReadBook} />
            <Route exact path="/uploadbook" component={BookUpload} />
            <Route exact path="/writebook" component={WriteBook} />
            <Route exact path="/readcontent" component={ReadContent} />
            <Route exact path="/sidebar" component={Sidebar} />
            {/* <Footer /> solving issues*/}
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
