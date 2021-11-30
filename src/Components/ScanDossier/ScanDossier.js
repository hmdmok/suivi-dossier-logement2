import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";

function ScanDossier(props) {
  const [hide_new, setHide_new] = useState(false);
  const [hide_scan, setHide_scan] = useState(true);
  const [newdossier, setNewdossier] = useState([]);
  const [creator, setcreator] = useState(0);
  const [id_dossier, setid_dossier] = useState(0);
  const [dossier, setdossier] = useState({});
  const [persone, setpersone] = useState({});
  const [scandossier, setscandossier] = useState({
    id: "",
    id_dossier: "",
    photo_link: "",
    CIN_link: "",
    cert_nes_link: "",
    cert_res_link: "",
    cert_negatif_link: "",
    cert_chomage_link: "",
    cert_travail_link: "",
    id_user: "",
    fiche_paie_3_link: "",
    rest_dossier: "",
  });

  useEffect(() => {
    if (creator === 0) {
      const userID = props.getUserid();
      setcreator(userID);
    }
    if (id_dossier === 0) {
      fetch("http://localhost:3005/Dossier/NoScan")
        .then((response) => response.json())
        .then((data) => setNewdossier(data))
        .catch((err) => console.log(err));
    }
  }, []);

  const onDossierSelected = (event) => {
    const dossier_id = event.target.className;
    setdossier(newdossier[dossier_id]);
    setHide_new(true);
    setHide_scan(false);
    
  };
  return (
    <div
      className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded"
      hidden={props.hidden}
    >
      {!hide_new ? (
        <div>
          <h1 className="my-5">الرجاء إختيار ملف الشخص المراد مسحه</h1>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">رقم الملف</th>
                <th scope="col">تاريخ الايداع</th>
                <th scope="col">الاسم</th>
                <th scope="col">اللقب</th>
                <th scope="col">تاريخ الميلاد</th>
              </tr>
            </thead>
            <tbody onClick={onDossierSelected}>
              {newdossier.map((dossier, i) => (
                <tr className={i} key={dossier.id_dossier}>
                  <th className={i} scope="row">
                    {dossier.num_dos}
                  </th>
                  <td className={i}>{dossier.date_depo}</td>
                  <td className={i}>{dossier.prenom}</td>
                  <td className={i}>{dossier.nom}</td>
                  <td className={i}>{dossier.date_n}</td>
                </tr>
                // <option key={wilaya.id} value={wilaya.code} >{wilaya.nom_wilaya}</option>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {!hide_scan ? (
        <div>
          <h1 className="my-3">الرجاء مسح ملف </h1>
          <h2>{"السيد(ة): " + dossier.nom + " " + dossier.prenom}</h2>
          <br />
          <FileUpload
            Num_Dossier={dossier.num_dos}
            titleFilename="الصورة الشمسية"
            tosendFilename={"photo_" + dossier.id_demandeur + ".jpg"}
          />
          <FileUpload
            Num_Dossier={dossier.num_dos}
            titleFilename="بطاقة التعريف"
            tosendFilename={"CIN_" + dossier.id_demandeur + ".jpg"}
          />

          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="certif_nais"
              name="certif_nais"
            />
            <label className="custom-file-label" htmlFor="certif_nais">
              شهادة الميلاد
            </label>
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="residance"
              name="residance"
            />
            <label className="custom-file-label" htmlFor="residance">
              شهادة الاقامة
            </label>
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="prop_negatif"
              name="prop_negatif"
            />
            <label className="custom-file-label" htmlFor="prop_negatif">
              شهادة السلبية
            </label>
          </div>
          <div className="custom-file" hidden={props.hide_scan_situation_p}>
            <input
              type="file"
              className="custom-file-input"
              id="certif_chomage"
              name="certif_chomage"
            />
            <label className="custom-file-label" htmlFor="certif_chomage">
              شهادة البطالة
            </label>
          </div>
          <div className="custom-file" hidden={!props.hide_scan_situation_p}>
            <input
              type="file"
              className="custom-file-input"
              id="certif_travail"
              name="certif_travail"
            />
            <label className="custom-file-label" htmlFor="certif_travail">
              شهادة العمل
            </label>
          </div>
          <div className="custom-file" hidden={!props.hide_scan_situation_p}>
            <input
              type="file"
              className="custom-file-input"
              id="fiche_paie"
              name="fiche_paie"
            />
            <label className="custom-file-label" htmlFor="fiche_paie">
              بيان الدخل
            </label>
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="autre"
              name="autre"
            />
            <label className="custom-file-label" htmlFor="autre">
              باقي الملف
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ScanDossier;
