import Navigation from './Components/Navigation/Navigation';
// import Logo from './Components/Logo/Logo';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Demandeur from './Components/Demandeur/Demandeur';
import Dossier from './Components/Dossier/Dossier';
import DisplayForm from './Components/DisplayForm/DisplayForm';
// import Apartment from './Components/Navigation/apartment.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
// import Logo from './Components/Logo/Logo';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProtectedRoute from './Components/ProtectdRoute/ProtectedRoute';
import Utilisateur from './Components/Utilisateur/Utilisateur';
import Contact from './Components/Contact/Contact';

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      user_type: '',
      authent: false,
      user: {
        id: '',
        firstname: '',
        lastname: '',
        username: '',
        usertype: '',
        birthday: '',
        lastconnection: ''
      }
    }
  }
  
  // componentDidMount() {
  //   fetch('http://localhost:3005')
  //   .then(response => response.json())
  //   .then(console.log);
  // }

  setAuthent = (auth) => {
    this.setState({authent: auth});
  }

  setUsertype = (type) => {
    this.setState({user_type: type});
  }

  getAuthent = () => {
    return this.state.authent;
  }

  getUsertype = () => {
    return this.state.user.usertype;
  }

  getUsername = () => {
    return this.state.user.username;
  }

  onInputChange = (event) => {
      console.log(event.target.value);
  }

  loadUser = (user) => {
    this.setState({user: {
        id: user.id,
        firstname: user.first_name,
        lastname: user.last_name,
        username: user.user_name,
        usertype: user.user_type,
        birthday: user.user_birthday,
        lastconnection: user.last_connection
      }
    });
  }

  render() {
    
    return (
      <div className="App">
       <Router>
            <div> 
              <Navigation />
              <Switch>
                <Route path="/" exact component={Home} />
                {/* <Home /> */}

                <Route path="/Login" exact render={props => (<Login {...props} getUsername={this.getUsername} getUsertype={ this.getUsertype} loadUser={this.loadUser} setAuthent={this.setAuthent} setUsertype={this.setUsertype} onInputChange={this.onInputChange} getAuthent={this.getAuthent} />)}  />
                {/* <Login /> */}

                {/* <Logo /> */}
                <ProtectedRoute path="/DisplayForm" component={DisplayForm} getUsername={this.getUsername} getAuthent={this.getAuthent} usertype={this.state.user_type} loadUser={this.loadUser} setAuthent={this.setAuthent} setUsertype={this.setUsertype} />
                {/* <DisplayForm /> */}

                <ProtectedRoute path="/Demandeur" component={Demandeur} getUsername={this.getUsername} getAuthent={this.getAuthent} usertype={this.state.user_type} loadUser={this.loadUser} setAuthent={this.setAuthent} setUsertype={this.setUsertype}/>
                {/* <Demandeur onInputChange={this.onInputChange}/> */}

                {/* <Route path="/Dossier" component={Dossier} /> */}
                <ProtectedRoute path="/Dossier" component={Dossier} getUsername={this.getUsername} getAuthent={this.getAuthent}  usertype={this.state.user_type } />
                {/* <Dossier /> */}

                <ProtectedRoute path="/Utilisateur" getUsername={this.getUsername} component={Utilisateur} getAuthent={this.getAuthent}  usertype={this.state.user_type} loadUser={this.loadUser} setAuthent={this.setAuthent} setUsertype={this.setUsertype} />
                {/* <Utilisateur /> */}

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
