import React, { useState, useEffect } from "react";
import Person from "../Person/Person";

function SaisiConjoin(props) {
  const [creator, setcreator] = useState("");
  const [dossierNoConjoin, setdossierNoConjoin] = useState([]);
  const [dossier, setdossier] = useState({});
  const [hide_list_dossier, sethide_list_dossier] = useState(false);
  const [hide_conj, sethide_conj] = useState(true);
  const [gender_conj, setgender_conj] = useState("");
  const [type, settype] = useState("");
  const { getUserid } = props;
  useEffect(() => {
    if (creator === "") {
      const userID = getUserid();
      setcreator(userID);
    }
    if (dossierNoConjoin.length === 0) {
      fetch("http://localhost:3005/Dossier/NoConjoin")
        .then((response) => response.json())
        .then((data) => setdossierNoConjoin(data))
        .catch((err) => console.log(err));
    }
  });

  const onDossierSelected = (event) => {
    const dossier_id = event.target.className;
    fetch("http://localhost:3005/Dossier/" + dossier_id)
      .then((response) => response.json())
      .then((data) => {
        setdossier(data);
        sethide_list_dossier(true);
        setgender_conj(data.gender_conj);
        settype(data.type);
        sethide_conj(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded">
      {!hide_list_dossier ? (
        <div>
          <h1 className="my-5">
            {"الرجاء إختيار ملف الشخص المراد ادخال معلومات الزوج(ة) "}
          </h1>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">{"رقم الملف"}</th>
                <th scope="col">{"الاسم"}</th>
                <th scope="col">{"اللقب"}</th>
                <th scope="col">{"تاريخ الميلاد"}</th>
              </tr>
            </thead>
            <tbody onClick={onDossierSelected}>
              {dossierNoConjoin.map((dossier, i) => (
                <tr className={dossier.id_dossier} key={i}>
                  <th className={dossier.id_dossier} scope="row">
                    {dossier.num_dos}
                  </th>
                  <td className={dossier.id_dossier}>{dossier.prenom}</td>
                  <td className={dossier.id_dossier}>{dossier.nom}</td>
                  <td className={dossier.id_dossier}>{dossier.date_n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {!hide_conj ? (
        <Person
          {...props}
          title="الرجاء إدخال بيانات زوج(ة) طالب(ة) السكن"
          demande_type={false}
          gender_conj={gender_conj}
          getUserid={props.getUserid}
          type={type}
          settype={settype}
          id_dossier={dossier.id_dossier}
        />
      ) : null}
    </div>
  );
}

export default SaisiConjoin;
