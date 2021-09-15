import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import Apartment from '../Navigation/apartment.png';
import { Link } from 'react-router-dom';

class Home extends Component {
       render() {
        return (
            <div  className="p-5 d-flex flex-column align-items-center">
              <Logo  title={"تطبيقة السكن"} pic={Apartment}/>
              <Link to='/Login'>
                <h1>{"Login"}</h1>
              </Link>
            </div>
        );
    }
}

export default Home;