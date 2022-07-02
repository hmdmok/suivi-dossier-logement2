import React from "react";
import Person from "../Person/Person";

class Demandeur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getUserid = this.props.getUserid;
  onHandleChange = () => {console.log("change")};

  render() {
    return (
      <div>
        <Person
          getuserid={this.getUserid}
          userid={this.props.userid}
          type={true}
          title="الرجاء إدخال بيانات طالب السكن"
        />
        <div className="col-sm order-sm-last">
          <label htmlFor="date_depo"> تاريخ الإيداع </label>
          <input
            type="date"
            id="date_depo"
            name="date_depo"
            className="form-control text-right"
            onChange={this.onHandleChange}
            required
          />
          <br />

          <label htmlFor="num_dos"> رقم الملف</label>
          <input
            type="text"
            id="num_dos"
            name="num_dos"
            className="form-control text-right"
            onChange={this.onHandleChange}
            required
          />
          <br />
        </div>
      </div>
    );
  }
}

export default Demandeur;
