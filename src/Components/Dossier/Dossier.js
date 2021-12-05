import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function Dossier(props) {
  const [newpersons, setnewpersons] = useState([]);
  const [person, setperson] = useState({ id: 0, type: "" });
  const [hide_new, sethide_new] = useState(false);
  // const [hide_dossier, sethide_dossier] = useState(false);
  const [hide_saisi, sethide_saisi] = useState(true);
  const [hide_tutele, sethide_tutele] = useState(true);
  // const [hide_scan, sethide_scan] = useState(true);
  
  const [creator, setcreator] = useState(0);
  const [id_demandeur, setid_demandeur] = useState(0);
  const [id_conjoin, setid_conjoin] = useState(0);
  // const [date_depo, setdate_depo] = useState("");
  // const [num_dos, setnum_dos] = useState("");
  // const [num_enf, setnum_enf] = useState(0);
  // const [stuation_s_neant, setstuation_s_neant] = useState(true);
  // const [stuation_s_avec_d, setstuation_s_avec_d] = useState(false);
  // const [stuation_s_andicap, setstuation_s_andicap] = useState(false);
  // const [stuation_d, setstuation_d] = useState("");
  // const [numb_p, setnumb_p] = useState(0);
  // const [saisi_info, setsaisi_info] = useState("non");
  const [saisi_conj, setsaisi_conj] = useState("neant");
  const [scan_dossier, setscan_dossier] = useState("non");
  const [type, settype] = useState("");
  const [gender_conj, setgender_conj] = useState("");
  // const [remark, setremark] = useState("");
  const [id_scan_dossier, setid_scan_dossier] = useState(0);
  const [dossierInputs, setdossierInputs] = useState({
    date_depo: "",
    num_dos: "",
    num_enf: 0,
    stuation_s_neant: true,
    stuation_s_avec_d: false,
    stuation_s_andicap: false,
    stuation_d: "",
    numb_p: 0,
    remark: "",
  });

  const setId_conjoin = (id_p) => {
    setid_conjoin(id_p);
    setsaisi_conj("oui");
    settype(type + "_2");
  };

  useEffect(() => {
    if (creator === 0) {
      const userID = props.getUserid();
      setcreator(userID);
    }
    if (id_demandeur === 0) {
      fetch("http://localhost:3005/Person")
        .then((response) => response.json())
        .then((data) => setnewpersons(data))
        .catch((err) => console.log(err));
    }
  }, []);

  const onPersonSelected = (event) => {
    const person_id = event.target.className;
    fetch("http://localhost:3005/Person/" + person_id)
      .then((response) => response.json())
      .then((data) => {
        setperson(data);
        sethide_new(true);
        sethide_saisi(false);
        // sethide_scan(false);
        settype(data.type + "_1");
        setscan_dossier("non");
        setid_demandeur(data.id);
        if (data.stuation_f === "m") {
          setsaisi_conj("non");
        }
        if (data.gender === "m") {
          setgender_conj("f");
        } else {
          setgender_conj("m");
        }
        
      })
      .catch((err) => console.log(err));
  };

  const onSubmitDossier = (event) => {
    event.preventDefault();
    // setsaisi_info("oui");
    settype(type + "_1");
    fetch("http://localhost:3005/Dossier", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        person,
        id_demandeur: id_demandeur,
        creator,
        id_conjoin,
        id_scan_dossier,
        num_dos: dossierInputs.num_dos,
        date_depo: dossierInputs.date_depo,
        num_enf: dossierInputs.num_enf,
        stuation_s_avec_d: dossierInputs.stuation_s_avec_d,
        stuation_s_andicap: dossierInputs.stuation_s_andicap,
        stuation_d: dossierInputs.stuation_d,
        numb_p: dossierInputs.numb_p,
        type,
        gender_conj,
        saisi_conj,
        scan_dossier,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.user_id) {
          props.history.push("/DisplayForm");
        }
      })
      .catch((err) => console.log(err));
  };

  const onHandleChange = (event) => {
    setdossierInputs({
      ...dossierInputs,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "stuation_s_neant") {
      setdossierInputs({
        ...dossierInputs,
        stuation_s_neant: !dossierInputs.stuation_s_neant,
      });
      if (!dossierInputs.stuation_s_neant) {
        setdossierInputs({ ...dossierInputs, stuation_s_avec_d: false });
        setdossierInputs({ ...dossierInputs, stuation_s_andicap: false });
      }
    }
    if (event.target.name === "stuation_s_avec_d") {
      setdossierInputs({ ...dossierInputs, stuation_s_neant: false });
      setdossierInputs({ ...dossierInputs, stuation_s_avec_d: true });
    }
    if (event.target.name === "stuation_s_andicap") {
      setdossierInputs({ ...dossierInputs, stuation_s_neant: false });
      setdossierInputs({ ...dossierInputs, stuation_s_andicap: true });
    }
    if (event.target.name === "hide_tutele") {
      if (event.target.value === "oui") sethide_tutele(false);
      else sethide_tutele(true);
    }
  };

  const { usertype } = props;
  if (usertype !== "") {
    // console.log(usertype);
    return (
      <div className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded">
        {!hide_new ? (
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
              <tbody onClick={onPersonSelected}>
                {newpersons.map((person) => (
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

        {!hide_saisi ? (
          <form
            onSubmit={onSubmitDossier}
            className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded"
          >
            <h1>الرجاء إدخال بيانات ملف طلب السكن</h1>
            <h2>{"السيد(ة): " + person.nom + " " + person.prenom}</h2>
            <br />
            <div>
              <div className="row text-right">
                <div className="col-sm order-sm-last">
                  <label htmlFor="date_depo"> تاريخ الإيداع </label>
                  <input
                    type="date"
                    id="date_depo"
                    name="date_depo"
                    className="form-control text-right"
                    onChange={onHandleChange}
                    required
                  />
                  <br />

                  <label htmlFor="num_dos"> رقم الملف</label>
                  <input
                    type="text"
                    id="num_dos"
                    name="num_dos"
                    className="form-control text-right"
                    onChange={onHandleChange}
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
                    onChange={onHandleChange}
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
                    onChange={onHandleChange}
                  />
                  <label className="form-control text-right" htmlFor="legem_1">
                    سكن خطر مهدد بالانهيار ملك جماعي
                  </label>
                  <br />

                  <input
                    type="radio"
                    id="legem_2"
                    name="stuation_d"
                    value="legem_2"
                    onChange={onHandleChange}
                  />
                  <label className="form-control text-right" htmlFor="legem_2">
                    سكن خطر مهدد بالانهيار ملك فردي
                  </label>
                  <br />

                  <input
                    type="radio"
                    id="legem_3"
                    name="stuation_d"
                    value="legem_3"
                    onChange={onHandleChange}
                  />
                  <label className="form-control text-right" htmlFor="legem_3">
                    سكن عند الأقارب او مستأجر
                  </label>
                  <br />

                  <input
                    type="radio"
                    id="leg_f"
                    name="stuation_d"
                    value="leg_f"
                    onChange={onHandleChange}
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
                    onChange={onHandleChange}
                  />
                  <br />
                  <label>الحالة الشخصية</label>
                  <br />

                  <input
                    type="checkbox"
                    checked={dossierInputs.stuation_s_neant}
                    id="stuation_s_neant"
                    name="stuation_s_neant"
                    onChange={onHandleChange}
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
                    checked={dossierInputs.stuation_s_avec_d}
                    id="stuation_s_avec_d"
                    name="stuation_s_avec_d"
                    onChange={onHandleChange}
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
                    checked={dossierInputs.stuation_s_andicap}
                    id="stuation_s_andicap"
                    name="stuation_s_andicap"
                    onChange={onHandleChange}
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
                    onChange={onHandleChange}
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
                  <div hidden={hide_tutele}>
                    <label htmlFor="numb_p_t">عدد الأشخاص المتكفل بهم</label>
                    <br />
                    <input
                      className="form-control text-right"
                      onChange={onHandleChange}
                      type="text"
                      name="numb_p"
                    />
                    <br />
                  </div>
                </div>
              </div>
              <div className="row text-right">
                <div className="col-sm order-sm-last my-2">
                  <label htmlFor="remark">ملاحظات حول الملف</label>
                  <input
                    type="text"
                    id="remark"
                    name="remark"
                    className="form-control text-right"
                    onChange={onHandleChange}
                  />
                  <br />
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

export default Dossier;
