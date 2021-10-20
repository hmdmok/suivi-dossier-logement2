import React from "react";
import Person from "../Person/Person";

class Demandeur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getUserid = this.props.getUserid;

  render() {
    return (
      <div>
        <Person
          getuserid={this.getUserid}
          userid={this.props.userid}
          type={true}
          title="الرجاء إدخال بيانات طالب السكن"
        />
      </div>
    );
  }
}

export default Demandeur;
