import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import calculate from "../CalculeNotesDossier/CalculeNotesDossier";

function Dossier(props) {
  const [newDossiers, setnewDossiers] = useState([]);
  const [person, setperson] = useState({
    id: 0,
    type: "",
    prenom: "",
    prenom_fr: "",
    nom: "",
    nom_fr: "",
    gender: "",
    num_act: "",
    date_n: "",
    lieu_n: "",
    lieu_n_fr: "",
    wil_n: 0,
    com_n: 0,
    prenom_p: "",
    prenom_p_fr: "",
    prenom_m: "",
    prenom_m_fr: "",
    nom_m: "",
    nom_m_fr: "",
    num_i_n: "",
    stuation_f: "",
    situation_p: "",
    profession: "",
    salaire: 0,
    creator: 0,
  });
  const [conjoin, setconjoin] = useState({
    id: 0,
    type: "",
    prenom: "",
    prenom_fr: "",
    nom: "",
    nom_fr: "",
    gender: "",
    num_act: "",
    date_n: "",
    lieu_n: "",
    lieu_n_fr: "",
    wil_n: 0,
    com_n: 0,
    prenom_p: "",
    prenom_p_fr: "",
    prenom_m: "",
    prenom_m_fr: "",
    nom_m: "",
    nom_m_fr: "",
    num_i_n: "",
    stuation_f: "",
    situation_p: "",
    profession: "",
    salaire: 0,
    creator: 0,
  });
  const [hide_new, sethide_new] = useState(false);
  const [hide_saisi, sethide_saisi] = useState(true);
  const [hide_tutele, sethide_tutele] = useState(true);
  const [dossier, setdossier] = useState({
    date_depo: "",
    num_dos: "",
    num_enf: 0,
    stuation_s_neant: true,
    stuation_s_avec_d: false,
    stuation_s_andicap: false,
    stuation_d: "",
    numb_p: 0,
    remark: "",
    id_dossier: 0,
    saisi_conj: "",
    scan_dossier: "",
    type: "",
    gender_conj: "",
    id_demandeur: 0,
    id_user: 0,
    id_conjoin: 0,
    id_scan_dossier: 0,
    note: 0,
  });
  const [userID, setuserID] = useState(0);
  const [tableNote, setTableNote] = useState([]);
  const { getUserid } = props;

  // const setId_conjoin = (id_p) => {
  //   setdossier({
  //     ...dossier,
  //     id_conjoin: id_p,
  //     saisi_conj: "oui",
  //     type: type + "_2",
  //   });
  // };

  useEffect(() => {
    setuserID(getUserid());
    if (dossier.id_user === 0) {
      setdossier({
        ...dossier,
        id_user: userID,
      });
    }
    if (dossier.id_demandeur === 0) {
      fetch("https://sdl-api.herokuapp.com/Dossier/NewDossiers")
        .then((response) => response.json())
        .then((data) => setnewDossiers(data))
        .catch((err) => console.log(err));
    }
    fetch("https://sdl-api.herokuapp.com/TableNotes")
      .then((response) => response.json())
      .then((data) => {
        setTableNote(data);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    if (dossier.type === "dema") {
      fetch("https://sdl-api.herokuapp.com/Person/" + dossier.id_demandeur)
        .then((response) => response.json())
        .then((data) => {
          setperson({ ...data, type: data.type + "_1" });
          if (data.stuation_f === "m") {
            setdossier({
              ...dossier,
              saisi_conj: "non",
            });
          }
          if (data.gender === "m") {
            setdossier({
              ...dossier,
              gender_conj: "f",
            });
          } else {
            setdossier({
              ...dossier,
              gender_conj: "m",
            });
          }
        })
        .then(() => {
          setdossier({
            ...dossier,
            type: dossier.type + "_1",
            scan_dossier: "non",
            stuation_s_andicap: false,
            stuation_s_avec_d: false,
          });
        })
        .catch((err) => console.log(err));
    }

    if (dossier.saisi_conj === "oui") {
      fetch("https://sdl-api.herokuapp.com/Person/" + dossier.id_conjoin)
        .then((response) => response.json())
        .then((data) => {
          setconjoin(data);
        })
        .catch((err) => console.log(err));
    }
  }, [dossier.id_dossier]);

  const onDossierSelected = (event) => {
    const dossier_id = event.target.className;
    fetch("https://sdl-api.herokuapp.com/Dossier/" + dossier_id)
      .then((response) => response.json())
      .then((data) => {
        setdossier(data);

        sethide_new(true);
        sethide_saisi(false);
      })

      .catch((err) => console.log(err));
  };

  const onSubmitDossier = (event) => {
    event.preventDefault();
    const newDossier = { ...dossier };
    const salairDemandeur = person.salaire,
      salairConjoin = conjoin.salaire,
      situationF = person.stuation_f;
    newDossier["note"] = calculate.calculate(
      dossier,
      salairDemandeur,
      salairConjoin,
      situationF,
      tableNote
    );
    setdossier(newDossier);
    fetch("https://sdl-api.herokuapp.com/Dossier/UpdateNew", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newDossier),
    })
      .then((response) => response.json())
      .then((dossier1) => {
        if (dossier1.id_dossier) {
          props.history.push("/DisplayForm");
        }
      })
      .catch((err) => console.log(err));
    // alert(calculate.calculate(dossier));
  };

  const onHandleChange = (event) => {
    if (
      event.target.name === "stuation_s_neant" ||
      event.target.name === "stuation_s_andicap" ||
      event.target.name === "stuation_s_avec_d"
    )
      setdossier({
        ...dossier,
        [event.target.name]: event.target.checked,
      });
    else if (event.target.name === "hide_tutele") {
      if (event.target.value === "oui") sethide_tutele(false);
      else sethide_tutele(true);
    } else
      setdossier({
        ...dossier,
        [event.target.name]: event.target.value,
      });
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
              <tbody onClick={onDossierSelected}>
                {newDossiers.map((dossierMap) => (
                  <tr
                    className={dossierMap.id_dossier}
                    key={dossierMap.id_dossier}
                  >
                    <th className={dossierMap.id_dossier} scope="row">
                      {dossierMap.id_dossier}
                    </th>
                    <td className={dossierMap.id_dossier}>
                      {dossierMap.prenom}
                    </td>
                    <td className={dossierMap.id_dossier}>{dossierMap.nom}</td>
                    <td className={dossierMap.id_dossier}>
                      {dossierMap.date_n.split("T")[0]}
                    </td>
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
                    value={dossier.date_depo.split("T")[0]}
                    disabled={true}
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
                    value={dossier.num_dos}
                    disabled={true}
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
                    checked={dossier.stuation_s_avec_d}
                    id="stuation_s_avec_d"
                    name="stuation_s_avec_d"
                    onChange={onHandleChange}
                  />
                  <label
                    className="form-control text-right"
                    htmlFor="stuation_s_avec_d"
                  >
                    ذوي حقوق
                  </label>
                  <br />

                  <input
                    type="checkbox"
                    checked={dossier.stuation_s_andicap}
                    id="stuation_s_andicap"
                    name="stuation_s_andicap"
                    onChange={onHandleChange}
                  />
                  <label
                    className="form-control text-right"
                    htmlFor="stuation_s_andicap"
                  >
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
