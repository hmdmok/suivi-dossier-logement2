import React, { Component } from "react";
import Logo from "../Logo/Logo";
import Apartment from "../Navigation/apartment.png";

class Home extends Component {
  render() {
    return (
      <div className="p-5 d-flex flex-column align-items-center">
        <Logo root={"/Login"} title={"تطبيقة السكن"} pic={Apartment} />
      </div>
    );
  }
}

export default Home;
