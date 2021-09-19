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

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      route: 'Login',
      user_type: 'super',
      authent: false
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
    return this.state.user_type;
  }

  onInputChange = (event) => {
      console.log(event.target.value);
  }

  onRouteChange = (route) => {
      this.setState({route: route});
  }

  render() {
    
    return (
      <div className="App">
       <Router>
            <div> 
              <Navigation onRouteChange={this.onRouteChange}/>
              <Switch>
                <Route path="/" exact component={Home} />
                {/* <Home /> */}

                <Route path="/Login" exact render={props => (<Login {...props}  getUsertype={ this.getUsertype} setAuthent={this.setAuthent} setUsertype={this.setUsertype} onInputChange={this.onInputChange} getAuthent={this.getAuthent} />)}  />
                {/* <Login /> */}

                {/* <Logo /> */}
                <Route path="/DisplayForm" component={DisplayForm} />
                {/* <DisplayForm /> */}

                <Route path="/Demandeur" component={Demandeur} />
                {/* <Demandeur onInputChange={this.onInputChange}/> */}

                {/* <Route path="/Dossier" component={Dossier} /> */}

                <ProtectedRoute path="/Dossier" component={Dossier} getAuthent={this.getAuthent}  usertype={this.state.user_type } />
              </Switch>
              {/* <Dossier /> */}

              {/* <Miseajour /> */}
              {/* <Utilisateur /> */}
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
