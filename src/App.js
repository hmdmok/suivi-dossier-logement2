import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Login from './Components/Login/Login';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      {/* <DisplayForm /> */}
      {/* <Demandeur /> */}
      {/* <Dossier /> */}
      {/* <Miseajour /> */}
      <Login />
      {/* <Utilisateur /> */}
      {/* <ListDossiers /> */}
      {/* <ListUtilisateurs /> */}
    </div>
  );
}

export default App;
