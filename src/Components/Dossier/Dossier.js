import React from "react";
import { Redirect } from "react-router-dom";


class Dossier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newpersons: [],
      person: {},
      hide_new: false,
      hide_dossier: false,
      hide_saisi: true,
      hide_tutele: true,
      hide_scan: true,
      hide_scan_situation_p: false,
      root: "new",
      hide_conj: true,
      creator: "",
      id_demandeur: "",
      id_conjoin: 0,
      date_depo: "",
      num_dos: "",
      num_enf: 0,
      stuation_s_neant: true,
      stuation_s_avec_d: false,
      stuation_s_andicap: false,
      stuation_d: "",
      numb_p: 0,
      saisi_info: "non",
      saisi_conj: "neant",
      scan_dossier: "non",
      type: "",
      gender_conj: "",
      remark: ""
    };
  }

  setId_conjoin = (id_p) => {
    this.setState({ id_conjoin: id_p });
    this.setState({ saisi_conj: "oui" });
    this.setState({ type: this.state.type + "_2" });
    this.setState({ hide_conj: true });
  };

  componentDidMount() {
    if (this.state.creator === "") {
      const userID = this.props.getUserid();
      this.setState({ creator: userID });
    }
    if (this.state.id_demandeur === "") {
      fetch("http://localhost:3005/Person")
        .then((response) => response.json())
        .then((data) => this.setState({ newpersons: data }))
        .catch((err) => console.log(err));
    }
  }

  // componentDidUpdate(){
  //     console.log(this.state)
  // }

  onPersonSelected = (event) => {
    const person_id = event.target.className;
    fetch("http://localhost:3005/Person/" + person_id)
      .then((response) => response.json())
      .then((data) => this.setState({ person: data }))
      .then(() => {
        this.setState({ hide_new: true });
        this.setState({ hide_saisi: false });
        this.setState({ hide_scan: false });
        this.setState({ type: this.state.person.type });
        this.setState({ id_demandeur: this.state.person.id });
        if (this.state.person.stuation_f === "m") {
          this.setState({ hide_conj: false });
          this.setState({ saisi_conj: "non" });
        }
        if (this.state.person.gender === "m") {
          this.setState({ gender_conj: "f" });
        } else {
          this.setState({ gender_conj: "m" });
        }
        if (this.state.person.situation_p === "autre") {
          this.setState({ hide_scan_situation_p: true });
        }
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  };

  onSubmitDossier = (event) => {
    event.preventDefault();
    this.setState({ saisi_info: "oui" });
    this.setState({ type: this.state.type + "_1" });
    console.log(this.state);
    fetch("http://localhost:3005/Dossier", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.dossier_id) {
         this.props.history.push("/DisplayForm");
        }
      })
      .catch((err) => console.log(err));
  };

  onHandleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "stuation_s_neant") {
      this.setState({ stuation_s_neant: !this.state.stuation_s_neant });
      if (!this.state.stuation_s_neant) {
        this.setState({ stuation_s_avec_d: false });
        this.setState({ stuation_s_andicap: false });
      }
    }
    if (event.target.name === "stuation_s_avec_d") {
      this.setState({ stuation_s_neant: false });
      this.setState({ stuation_s_avec_d: true });
    }
    if (event.target.name === "stuation_s_andicap") {
      this.setState({ stuation_s_neant: false });
      this.setState({ stuation_s_andicap: true });
    }
    if (event.target.name === "hide_tutele") {
      if (event.target.value === "oui") this.setState({ hide_tutele: false });
      else this.setState({ hide_tutele: true });
    }
  };

  render() {
    const { usertype } = this.props;
    if (usertype !== "") {
      // console.log(usertype);
      return (
        <div className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded">
          {!this.state.hide_new ? (
            <div>
              <h1 className="my-5">الرجاء إختيار الشخص المراد ادخال ملفه</h1>
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">رقم</th>
                    <th scope="col">الاسم</th>
                    <th scope="col">اللقب</th>
                    <th scope="col">تاريخ الميلاد</th>
                  </tr>
                </thead>
                <tbody onClick={this.onPersonSelected}>
                  {this.state.newpersons.map((person, i) => (
                    <tr className={person.id} key={person.id}>
                      <th className={person.id} scope="row">
                        {person.id}
                      </th>
                      <td className={person.id}>{person.prenom}</td>
                      <td className={person.id}>{person.nom}</td>
                      <td className={person.id}>{person.date_n}</td>
                    </tr>
                    // <option key={wilaya.id} value={wilaya.code} >{wilaya.nom_wilaya}</option>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {!this.state.hide_saisi ? (
            <form
              onSubmit={this.onSubmitDossier}
              className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded"
              hidden={this.state.hide_saisi}
            >
              <h1>الرجاء إدخال بيانات ملف طلب السكن</h1>
              <h2>
                {"السيد(ة): " +
                  this.state.person.nom +
                  " " +
                  this.state.person.prenom}
              </h2>
              <br />
              <div hidden={this.state.hide_dossier}>
                <div className="row text-right">
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

                    <label>ظروف السكن</label>
                    <br />

                    <input
                      type="radio"
                      id="garage"
                      name="stuation_d"
                      value="garage"
                      onChange={this.onHandleChange}

                    />
                    <label className="form-control text-right" htmlFor="garage">
                      محل غير مخصص للسكن{" "}
                    </label>
                    <br />

                    <input
                      type="radio"
                      id="legem_1"
                      name="stuation_d"
                      value="legem_1"
                      onChange={this.onHandleChange}
                    />
                    <label
                      className="form-control text-right"
                      htmlFor="legem_1"
                    >
                      سكن خطر مهدد بالانهيار ملك جماعي
                    </label>
                    <br />

                    <input
                      type="radio"
                      id="legem_2"
                      name="stuation_d"
                      value="legem_2"
                      onChange={this.onHandleChange}
                    />
                    <label
                      className="form-control text-right"
                      htmlFor="legem_2"
                    >
                      سكن خطر مهدد بالانهيار ملك فردي
                    </label>
                    <br />

                    <input
                      type="radio"
                      id="legem_3"
                      name="stuation_d"
                      value="legem_3"
                      onChange={this.onHandleChange}
                    />
                    <label
                      className="form-control text-right"
                      htmlFor="legem_3"
                    >
                      سكن عند الأقارب او مستأجر
                    </label>
                    <br />

                    <input
                      type="radio"
                      id="leg_f"
                      name="stuation_d"
                      value="leg_f"
                      onChange={this.onHandleChange}
                    />
                    <label className="form-control text-right" htmlFor="leg_f">
                      سكن وظيفي
                    </label>
                    <br />
                  </div>
                  <div className="col-sm order-sm-first">
                    <label>عدد الأولاد</label>
                    <br />
                    <label htmlFor="num_enf"></label>
                    <input
                      type="text"
                      name="num_enf"
                      className="form-control text-right"
                      onChange={this.onHandleChange}
                    />
                    <br />
                    <label>الحالة الشخصية</label>
                    <br />

                    <input
                      type="checkbox"
                      checked={this.state.stuation_s_neant}
                      id="stuation_s_neant"
                      name="stuation_s_neant"
                      onChange={this.onHandleChange}
                    />
                    <label
                      className="form-control text-right"
                      htmlFor="stuation_s_neant"
                    >
                     لاشيء
                    </label>
                    <br />

                    <input
                      type="checkbox"
                      checked={this.state.stuation_s_avec_d}
                      id="stuation_s_avec_d"
                      name="stuation_s_avec_d"
                      onChange={this.onHandleChange}
                    />
                    <label
                      className="form-control text-right"
                      htmlFor="stuation_s_avec_d"
                    >
                      {" "}
                      ذوي حقوق
                    </label>
                    <br />

                    <input
                      type="checkbox"
                      checked={this.state.stuation_s_andicap}
                      id="stuation_s_andicap"
                      name="stuation_s_andicap"
                      onChange={this.onHandleChange}
                    />
                    <label
                      className="form-control text-right"
                      htmlFor="stuation_s_andicap"
                    >
                      {" "}
                      معاق
                    </label>
                    <br />
                    <br />

                    <label>هل يوجد أشخاص متكفل بهم</label>
                    <br />
                    <select
                      className="form-control text-right"
                      onChange={this.onHandleChange}
                      id="hide_tutele"
                      defaultValue="non"
                      name="hide_tutele"
                    >
                      <option name="hide_tutele" value="non">
                        لا
                      </option>
                      <option name="hide_tutele" value="oui">
                        نعم
                      </option>
                    </select>
                    <br />
                    <div hidden={this.state.hide_tutele}>
                      <label htmlFor="numb_p_t">عدد الأشخاص المتكفل بهم</label>
                      <br />
                      <input
                        className="form-control text-right"
                        onChange={this.onHandleChange}
                        type="text"
                        name="numb_p"
                      />
                      <br />
                    </div>
                  </div>
                </div>
                <div className="row text-right">
                  <div className="col-sm order-sm-last my-2">
                    <input
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                      value="حفظ"
                    />
                  </div>
                  <div className="col-sm order-sm-first my-2">
                    <input
                      className="btn btn-lg btn-primary btn-block"
                      type="reset"
                      value="إلغاء"
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : null}

        </div>
      );
    } else {
      // console.log(usertype);
      return <Redirect to="/Login" />;
    }
  }
}

export default Dossier;
