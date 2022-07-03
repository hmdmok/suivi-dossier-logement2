import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function Person(props) {
  const { title, getUserid, demande_type, gender_conj, type, id_dossier } =
    props;
  const [person, setperson] = useState({
    id: 0,
    prenom: "",
    prenom_fr: "",
    nom: "",
    nom_fr: "",
    gender: "",
    num_act: "",
    date_n: "",
    lieu_n: "",
    lieu_n_fr: "",
    wil_n: "",
    com_n: "",
    prenom_p: "",
    prenom_p_fr: "",
    prenom_m: "",
    prenom_m_fr: "",
    nom_m: "",
    nom_m_fr: "",
    num_i_n: "",
    stuation_f: "",
    type: "",
    situation_p: "",
    profession: "",
    salaire: "",
    creator: "",
    remark: "",
  });
  const [wilayas, setwilayas] = useState([]);
  const [communes, setcommunes] = useState([]);
  const [hide_situation_p, sethide_situation_p] = useState(true);
  const [dossierToFetch, setdossierToFetch] = useState({
    id_demandeur: 0,
    creator: 0,
    id_conjoin: 0,
    id_scan_dossier: 0,
    num_dos: "",
    date_depo: "",
    num_enf: 0,
    stuation_s_avec_d: false,
    stuation_s_andicap: false,
    stuation_d: "",
    numb_p: 0,
    type: "",
    gender_conj: "",
    saisi_conj: "",
    scan_dossier: "",
    remark: "",
  });
  const [userID, setuserID] = useState(0);

  useEffect(() => {
    setuserID(getUserid());
    fetch("https://sdl-api.herokuapp.com/Wilaya")
      .then((response) => response.json())
      .then((data) => setwilayas(data))
      .catch((err) => console.log(err));
    if (demande_type) {
      setperson({ ...person, type: "dema" });
      setdossierToFetch({ ...dossierToFetch, type: "dema" });
    } else {
      setperson({
        ...person,
        type: "conj",
        stuation_f: "m",
        gender: gender_conj,
      });
    }
  }, []);

  useEffect(() => {
    setperson({
      ...person,
      creator: userID,
      remark: "add new person",
    });
    setdossierToFetch({
      ...dossierToFetch,
      creator: userID,
      remark: "add new dossier",
    });
  }, [userID]);

  const onHandleChange = (event) => {
    if (event.target.name === "date_depo" || event.target.name === "num_dos")
      setdossierToFetch({
        ...dossierToFetch,
        [event.target.name]: event.target.value,
      });
    else
      setperson({
        ...person,
        [event.target.name]: event.target.value,
      });
    if (event.target.name === "wil_n") {
      const code_wilaya = event.target.value;
      const url = "https://sdl-api.herokuapp.com/Communes/" + code_wilaya;
      fetch(url)
        .then((response) => response.json())
        .then((communes) => setcommunes(communes))
        .catch((err) => console.log(err));
    }
    if (event.target.name === "hide_situation_p") {
      if (event.target.value === "autre") {
        sethide_situation_p(false);
        setperson({ ...person, situation_p: "autre" });
      } else {
        sethide_situation_p(true);
        setperson({ ...person, situation_p: "chomeur" });
      }
    }
  };

  useEffect(() => {
    if (!(person.id === 0))
      if (!demande_type) {
        fetch("https://sdl-api.herokuapp.com/Dossier/Conjoin", {
          method: "put",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id_dossier,
            creator: userID,
            id_conjoin: person.id,
            type: type + "_2",
            saisi_conj: "oui",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.user_id) props.history.push("/DisplayForm");
          });
      } else {
        setdossierToFetch({
          ...dossierToFetch,
          id_demandeur: person.id,
        });
      }
  }, [person]);

  useEffect(() => {
    if (!(dossierToFetch.id_demandeur === 0)) {
      fetch("https://sdl-api.herokuapp.com/Dossier", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dossierToFetch),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user.user_id) {
            props.history.push("/DisplayForm");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [dossierToFetch]);

  const onSubmitPerson = (event) => {
    event.preventDefault();
    // console.log(person);
    // console.log(dossierToFetch);
    fetch("https://sdl-api.herokuapp.com/Person", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(person),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.user_id) {
          setperson({
            ...person,
            id: user.person_id,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded">
      <h1>{title}</h1>

      <form onSubmit={onSubmitPerson}>
        <div className="row text-right">
          <div className="col-sm order-sm-last">
            <label htmlFor="prenom">الاسم</label>
            <input
              type="text"
              id="prenom"
              className="form-control text-right"
              name="prenom"
              placeholder="الاسم"
              onChange={onHandleChange}
            />
            <input
              onChange={onHandleChange}
              type="text"
              id="prenom_fr"
              name="prenom_fr"
              className="form-control text-right"
              placeholder="الاسم باللاتينية"
            />
            <br />
          </div>
          <div className="col-sm order-sm-first">
            <label htmlFor="nom">اللقب</label>
            <input
              onChange={onHandleChange}
              type="text"
              id="nom"
              className="form-control text-right"
              name="nom"
              placeholder="اللقب"
            />
            <input
              onChange={onHandleChange}
              type="text"
              id="nom_fr"
              name="nom_fr"
              className="form-control text-right"
              placeholder="اللقب باللاتينية"
            />
            <br />
          </div>
        </div>
        <div className="row text-right">
          <div className="col-sm order-sm-last">
            <div hidden={!demande_type} name="gender" onChange={onHandleChange}>
              <label>الجنس</label>
              <br />
              <input type="radio" id="male" name="gender" value="m" />
              <label htmlFor="male" className="form-control text-right">
                ذكر
              </label>
              <br />
              <input type="radio" id="female" name="gender" value="f" />
              <label htmlFor="female" className="form-control text-right">
                أنثى
              </label>
              <br />
            </div>

            <label htmlFor="num_act">رقم عقد الميلاد</label>
            <input
              onChange={onHandleChange}
              type="text"
              className="form-control text-right"
              name="num_act"
              required
            />
            <br />

            <label htmlFor="date_n">تاريخ الميلاد </label>
            <input
              onChange={onHandleChange}
              type="date"
              id="date_n"
              className="form-control text-right"
              name="date_n"
              defaultValue="01-01-1900"
              required
            />
            <br />
          </div>
          <div className="col-sm order-sm-first">
            <label htmlFor="wil_n">ولاية الميلاد</label>
            <select
              onChange={onHandleChange}
              id="wil_n"
              className="form-control text-right"
              name="wil_n"
              defaultValue="-1"
              required
            >
              <option value="-1" disabled hidden>
                اختر ولاية الميلاد
              </option>
              {wilayas.map((wilaya) => (
                <option key={wilaya.id} value={wilaya.code}>
                  {wilaya.nom_wilaya}
                </option>
              ))}
            </select>
            <br />

            <label htmlFor="lieu_n">مكان الميلاد</label>
            <input
              onChange={onHandleChange}
              type="text"
              id="lieu_n"
              className="form-control text-right"
              name="lieu_n"
            />
            <input
              onChange={onHandleChange}
              type="text"
              id="lieu_n_fr"
              className="form-control text-right"
              name="lieu_n_fr"
              placeholder="مكان الميلاد باللاتينية"
            />
            <br />

            <label htmlFor="com_n">بلدية الميلاد</label>
            <select
              onChange={onHandleChange}
              id="com_n"
              className="form-control text-right"
              name="com_n"
              defaultValue="-1"
              required
            >
              <option value="-1" disabled hidden>
                اختر بلدية الميلاد
              </option>
              {communes.map((commune) => (
                <option key={commune.id} value={commune.code_commune}>
                  {commune.nom_commune}
                </option>
              ))}
            </select>
            <br />

            <label htmlFor="prenom_p"> اسم الاب</label>
            <input
              onChange={onHandleChange}
              type="text"
              id="prenom_p"
              className="form-control text-right"
              name="prenom_p"
            />
            <input
              onChange={onHandleChange}
              type="text"
              id="prenom_p_fr"
              className="form-control text-right"
              name="prenom_p_fr"
              placeholder="اسم الاب باللاتينية"
            />
            <br />
          </div>
        </div>

        <div className="row text-right">
          <div className="col-sm order-sm-last">
            <label htmlFor="prenom_m"> اسم الأم</label>
            <input
              onChange={onHandleChange}
              type="text"
              id="prenom_m"
              className="form-control text-right"
              name="prenom_m"
            />
            <input
              onChange={onHandleChange}
              type="text"
              id="prenom_m_fr"
              className="form-control text-right"
              name="prenom_m_fr"
              placeholder="اسم الأم باللاتينية"
            />
            <br />
          </div>
          <div className="col-sm order-sm-first">
            <label htmlFor="nom_m">لقب الأم</label>
            <input
              onChange={onHandleChange}
              type="text"
              id="nom_m"
              className="form-control text-right"
              name="nom_m"
            />
            <input
              onChange={onHandleChange}
              type="text"
              id="nom_m_fr"
              className="form-control text-right"
              name="nom_m_fr"
              placeholder="لقب الأم باللاتينية"
            />
            <br />
          </div>
        </div>
        <div className="text-right">
          <label htmlFor="num_i_n"> رقم التعريف الوطني</label>
          <input
            onChange={onHandleChange}
            type="text"
            id="num_i_n"
            className="form-control text-right"
            name="num_i_n"
          />

          <label>الوضعية المهنية</label>
          <br />
          <select
            className="form-control text-right"
            onChange={onHandleChange}
            id="hide_situation_p"
            defaultValue="non"
            name="hide_situation_p"
          >
            <option name="situation_p" value="chomeur">
              بطال
            </option>
            <option name="situation_p" value="autre">
              أخر
            </option>
          </select>
          <br />
          <div hidden={hide_situation_p}>
            <label htmlFor="profession">المهنة</label>
            <br />
            <input
              className="form-control text-right"
              onChange={onHandleChange}
              type="text"
              name="profession"
            />
            <br />
            <label htmlFor="salaire">الدخل</label>
            <br />
            <input
              className="form-control text-right"
              onChange={onHandleChange}
              type="text"
              name="salaire"
            />
            <br />
          </div>

          <label htmlFor="remark"> ملاحظات</label>
          <input
            onChange={onHandleChange}
            type="text"
            id="remark"
            className="form-control text-right"
            name="remark"
          />
        </div>

        <div
          name="stuation_f"
          onChange={onHandleChange}
          hidden={!demande_type}
          className="text-right"
        >
          <div className="intro">
            <label>الحالة العائلية</label>{" "}
          </div>{" "}
          <br />
          <input type="radio" id="cilib" name="stuation_f" value="c" />
          <label htmlFor="cilib" className="form-control text-right">
            أعزب\عزباء{" "}
          </label>
          <br />
          <input type="radio" id="marie" name="stuation_f" value="m" />
          <label htmlFor="marie" className="form-control text-right">
            متزوج\ة
          </label>
          <br />
          <input type="radio" id="divor" name="stuation_f" value="d" />
          <label htmlFor="divor" className="form-control text-right">
            مطلق\ة
          </label>
          <br />
          <input type="radio" id="veuf" name="stuation_f" value="v" />
          <label htmlFor="veuf" className="form-control text-right">
            أرمل\ة
          </label>
          <br />
        </div>
        <hr />
        {demande_type ? (
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
          </div>
        ) : null}
        <hr />
        <div className="row text-right">
          <div className="col-sm order-sm-last my-2">
            <input
              type="submit"
              className="btn btn-lg btn-primary btn-block"
              value="حفظ"
            />
          </div>
          <div className="col-sm order-sm-first my-2">
            <input
              type="reset"
              className="btn btn-lg btn-primary btn-block"
              value="إلغاء"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Person;
