import Navigation from './Components/Navigation/Navigation';
// import Logo from './Components/Logo/Logo';
import Login from './Components/Login/Login';
import Demandeur from './Components/Demandeur/Demandeur';
import Dossier from './Components/Dossier/Dossier';
import DisplayForm from './Components/DisplayForm/DisplayForm';
// import Apartment from './Components/Navigation/apartment.png';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      route: 'Login',
      user: 'seper'
    }
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
        
        { this.state.route === 'Login'
          ?  <Login onRouteChange={this.onRouteChange}/>
         :
          <div> 
            <Navigation onRouteChange={this.onRouteChange}/>
            {/* <Logo /> */}
            <DisplayForm />
            <Demandeur onInputChange={this.onInputChange}/>
            <Dossier />
            {/* <Miseajour /> */}
            {/* <Utilisateur /> */}
            {/* <ListDossiers /> */}
            {/* <ListUtilisateurs /> */}
            {/* <DossierNumerique /> */}
          </div>
        }
      </div>
    );
  }  
}

export default App;
