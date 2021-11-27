import Navigation from "./Components/Navigation/Navigation";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Dossier from "./Components/Dossier/Dossier";
import DisplayForm from "./Components/DisplayForm/DisplayForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectdRoute/ProtectedRoute";
import Utilisateur from "./Components/Utilisateur/Utilisateur";
import Contact from "./Components/Contact/Contact";
import Person from "./Components/Person/Person";
import ScanDossier from "./Components/ScanDossier/ScanDossier";
import SaisiConjoin from "./Components/SaisiConjoin/SaisiConjoin";
import OldRegister from "./Components/OldRegister/OldRegister";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      user_type: "",
      authent: false,
      user: {
        id: "",
        firstname: "",
        lastname: "",
        username: "",
        usertype: "",
        birthday: "",
        lastconnection: "",
      },
    };
  }

  setAuthent = (auth) => {
    this.setState({ authent: auth });
  };

  setUsertype = (type) => {
    this.setState({ user_type: type });
  };

  getAuthent = () => {
    return this.state.authent;
  };

  getUsertype = () => {
    return this.state.user.usertype;
  };

  getUsername = () => {
    return this.state.user.username;
  };

  getUserid = () => {
    return this.state.user.id;
  };

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        firstname: user.first_name,
        lastname: user.last_name,
        username: user.user_name,
        usertype: user.user_type,
        birthday: user.user_birthday,
        lastconnection: user.last_connection,
      },
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route path="/" exact component={Home} />
              {/* <Home /> */}

              <Route
                path="/Login"
                exact
                render={(props) => (
                  <Login
                    {...props}
                    getUsername={this.getUsername}
                    getUsertype={this.getUsertype}
                    loadUser={this.loadUser}
                    setAuthent={this.setAuthent}
                    setUsertype={this.setUsertype}
                    onInputChange={this.onInputChange}
                    getAuthent={this.getAuthent}
                  />
                )}
              />
              {/* <Login /> */}

              {/* <Logo /> */}
              <ProtectedRoute
                path="/DisplayForm"
                component={DisplayForm}
                getUsername={this.getUsername}
                getAuthent={this.getAuthent}
                usertype={this.state.user_type}
                loadUser={this.loadUser}
                setAuthent={this.setAuthent}
                setUsertype={this.setUsertype}
              />
              {/* <DisplayForm /> */}

              <ProtectedRoute
                path="/Demandeur"
                getUserid={this.getUserid}
                component={Person}
                type={true}
                demande_type={true}
                title="الرجاء إدخال بيانات طالب السكن"
                getUsername={this.getUsername}
                getAuthent={this.getAuthent}
                usertype={this.state.user_type}
                loadUser={this.loadUser}
                setAuthent={this.setAuthent}
                setUsertype={this.setUsertype}
              />
              {/* <Demandeur onInputChange={this.onInputChange}/> */}
              <ProtectedRoute
                path="/Conjoin"
                getUserid={this.getUserid}
                component={SaisiConjoin}
                getUsername={this.getUsername}
                getAuthent={this.getAuthent}
                usertype={this.state.user_type}
                loadUser={this.loadUser}
                setAuthent={this.setAuthent}
                setUsertype={this.setUsertype}
              />

              {/* <Route path="/Dossier" component={Dossier} /> */}
              <ProtectedRoute
                path="/Dossier"
                component={Dossier}
                getUsername={this.getUsername}
                getAuthent={this.getAuthent}
                usertype={this.state.user_type}
                getUserid={this.getUserid}
              />
              {/* <Dossier /> */}
              <ProtectedRoute
                path="/ScanDossier"
                component={ScanDossier}
                getUsername={this.getUsername}
                getAuthent={this.getAuthent}
                usertype={this.state.user_type}
                getUserid={this.getUserid}
              />
              <ProtectedRoute
                path="/Utilisateur"
                getUsername={this.getUsername}
                component={Utilisateur}
                getAuthent={this.getAuthent}
                usertype={this.state.user_type}
                loadUser={this.loadUser}
                setAuthent={this.setAuthent}
                setUsertype={this.setUsertype}
              />
              {/* <Utilisateur /> */}
              <ProtectedRoute
                path="/OldRegister"
                getUsername={this.getUsername}
                component={OldRegister}
                getAuthent={this.getAuthent}
                usertype={this.state.user_type}
                loadUser={this.loadUser}
                setAuthent={this.setAuthent}
                setUsertype={this.setUsertype}
              />

              <Route path="/Contact" component={Contact} />
            </Switch>

            {/* <Miseajour /> */}

            {/* <ListDossiers /> */}
            {/* <ListUtilisateurs /> */}
            {/* <DossierNumerique /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
