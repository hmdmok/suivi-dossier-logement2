import React, { useState, useEffect } from "react";
import FileUpload from "../FileUpload/FileUpload";
import ScanedImage from "../ScanedImage/ScanedImage";

function ScanDossier(props) {
  const initScandossier = {
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
    remark: "",
  };
  const [hide_scan_situation_p, sethide_scan_situation_p] = useState(false);
  const { getUserid, hidden } = props;
  const [hide_new, setHide_new] = useState(false);
  const [hide_scan, setHide_scan] = useState(true);
  const [newdossier, setNewdossier] = useState([]);
  const [creator, setcreator] = useState(0);
  const [id_dossier, setid_dossier] = useState(0);
  const [dossier, setdossier] = useState({});
  const [scandossier, setscandossier] = useState(initScandossier);
  const [linkScan, setlinkScan] = useState("");
  const [element, setelement] = useState("");

  const userID = getUserid();

  useEffect(() => {
    if (creator === 0) {
      setcreator(userID);
    }
    if (id_dossier === 0) {
      fetch("https://sdl-api.herokuapp.com/Dossier/NoScan")
        .then((response) => response.json())
        .then((data) => setNewdossier(data))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    // console.log(scandossier);
    // console.log(dossier);
    // console.log(linkScan);
    if (!(id_dossier === 0) && scandossier === "no scan_dossier found") {
      setscandossier({
        ...initScandossier,
        id_dossier: dossier.id_dossier,
        id_user: userID,
        remark: "ADD new ScanDossier",
      });
    }
  }, [dossier, scandossier]);
  useEffect(() => {
    if (scandossier.remark === "ADD new ScanDossier") {
      fetch("https://sdl-api.herokuapp.com/ScanDossier/Add", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(scandossier),
      })
        .then((response) => response.json())
        .then((scaned) => {
          if (scaned.id) {
            setscandossier(scaned);
          }
        })
        .catch((err) => console.log(err));
    } else if (scandossier.remark === "UPDATE ScanDossier") {
      fetch("https://sdl-api.herokuapp.com/ScanDossier/UpdateNew", {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(scandossier),
      })
        .then((response) => response.json())
        .then((scaned) => {
          if (scaned.id) {
            setscandossier(scaned);
          }
        })
        .catch((err) => console.log(err));
    }
    if (
      !(scandossier === "no scan_dossier found") &&
      !(
        scandossier.photo_link === "" ||
        scandossier.CIN_link === "" ||
        scandossier.cert_nes_link === "" ||
        scandossier.cert_res_link === "" ||
        scandossier.cert_negatif_link === "" ||
        (scandossier.cert_chomage_link === "" &&
          (scandossier.cert_travail_link === "" ||
            scandossier.fiche_paie_3_link === "")) ||
        scandossier.rest_dossier === ""
      ) &&
      dossier.scan_dossier === "non"
    ) {
      // console.log(scandossier);
      setdossier({
        ...dossier,
        scan_dossier: "oui",
      });
      fetch("https://sdl-api.herokuapp.com/Dossier/ScanStatus", {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id_dossier,
          creator: userID,
          scan_dossier: "oui",
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          props.history.push("/DisplayForm");
        })
        .catch((err) => console.log(err));
    }
  }, [scandossier]);
  const setlink = (link, elem) => {
    setelement(elem);
    setlinkScan(link);
  };
  useEffect(() => {
    if (!(scandossier.id_dossier === "")) toScan(element);
  }, [linkScan]);
  const toScan = (elem) => {
    if (!(elem === ""))
      setscandossier({
        ...scandossier,
        [elem]: linkScan,
        remark: "UPDATE ScanDossier",
      });
  };
  const onDossierSelected = (event) => {
    const dossier_id = event.target.className;
    fetch(
      "https://sdl-api.herokuapp.com/ScanDossier/" + newdossier[dossier_id].id_dossier
    )
      .then((response) => response.json())
      .then((data) => {
        setscandossier(data);
      })
      .catch((err) => console.log(err));
    setdossier(newdossier[dossier_id]);
    setHide_new(true);
    setHide_scan(false);
    setid_dossier(newdossier[dossier_id].id_dossier);
    if (newdossier[dossier_id].situation_p === "autre") {
      sethide_scan_situation_p(true);
    }
  };
  return (
    <div
      className="container form-signin border shadow my-5 bg-light bg-gradient rounded"
      hidden={hidden}
    >
      {!hide_new ? (
        <div>
          <h1 className="my-5">الرجاء إختيار ملف الشخص المراد مسح ملفه</h1>
          <table className="table table-hover table-bordered">
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
          {scandossier.photo_link === "" ? (
            <FileUpload
              Num_Dossier={dossier.id_dossier}
              titleFilename="الصورة الشمسية"
              tosendFilename={"photo_" + dossier.id_demandeur + ".jpg"}
              setLink={setlink}
              scanelement={"photo_link"}
            />
          ) : (
            <ScanedImage
              imageLink={scandossier.photo_link}
              title="الصورة الشمسية"
            />
          )}
          {scandossier.CIN_link === "" ? (
            <FileUpload
              Num_Dossier={dossier.id_dossier}
              titleFilename="بطاقة التعريف"
              tosendFilename={"CIN_" + dossier.id_demandeur + ".jpg"}
              setLink={setlink}
              scanelement={"CIN_link"}
            />
          ) : (
            <ScanedImage
              imageLink={scandossier.CIN_link}
              title="بطاقة التعريف"
            />
          )}

          {scandossier.cert_nes_link === "" ? (
            <FileUpload
              Num_Dossier={dossier.id_dossier}
              titleFilename="شهادة الميلاد"
              tosendFilename={"certif_nais_" + dossier.id_demandeur + ".jpg"}
              setLink={setlink}
              scanelement={"cert_nes_link"}
            />
          ) : (
            <ScanedImage
              imageLink={scandossier.cert_nes_link}
              title="شهادة الميلاد"
            />
          )}

          {scandossier.cert_res_link === "" ? (
            <FileUpload
              Num_Dossier={dossier.id_dossier}
              titleFilename="شهادة الاقامة"
              tosendFilename={"certif_resi_" + dossier.id_demandeur + ".jpg"}
              setLink={setlink}
              scanelement={"cert_res_link"}
            />
          ) : (
            <ScanedImage
              imageLink={scandossier.cert_res_link}
              title="شهادة الاقامة"
            />
          )}

          {scandossier.cert_negatif_link === "" ? (
            <FileUpload
              Num_Dossier={dossier.id_dossier}
              titleFilename="شهادة السلبية"
              tosendFilename={"prop_negatif_" + dossier.id_demandeur + ".jpg"}
              setLink={setlink}
              scanelement={"cert_negatif_link"}
            />
          ) : (
            <ScanedImage
              imageLink={scandossier.cert_negatif_link}
              title="شهادة السلبية"
            />
          )}

          {!hide_scan_situation_p ? 
            
              scandossier.cert_chomage_link === "" ? (
                <FileUpload
                  Num_Dossier={dossier.id_dossier}
                  titleFilename="شهادة البطالة"
                  tosendFilename={
                    "certif_chomage_" + dossier.id_demandeur + ".jpg"
                  }
                  setLink={setlink}
                  scanelement={"cert_chomage_link"}
                />
              ) : (
                <ScanedImage
                  imageLink={scandossier.cert_chomage_link}
                  title="شهادة البطالة"
                />
              )
          
           : null}

          <div hidden={!hide_scan_situation_p}>
            {scandossier.cert_travail_link === "" ? (
              <FileUpload
                Num_Dossier={dossier.id_dossier}
                titleFilename="شهادة العمل"
                tosendFilename={
                  "certif_travail_" + dossier.id_demandeur + ".jpg"
                }
                setLink={setlink}
                scanelement={"cert_travail_link"}
              />
            ) : (
              <ScanedImage
                imageLink={scandossier.cert_travail_link}
                title="شهادة العمل"
              />
            )}

            {scandossier.fiche_paie_3_link === "" ? (
              <FileUpload
                Num_Dossier={dossier.id_dossier}
                titleFilename="بيان الدخل"
                tosendFilename={"fiche_paie_" + dossier.id_demandeur + ".jpg"}
                setLink={setlink}
                scanelement={"fiche_paie_3_link"}
              />
            ) : (
              <ScanedImage
                imageLink={scandossier.fiche_paie_3_link}
                title="بيان الدخل"
              />
            )}
          </div>

          {scandossier.rest_dossier === "" ? (
            <FileUpload
              Num_Dossier={dossier.id_dossier}
              titleFilename="باقي الملف"
              tosendFilename={"autre_" + dossier.id_demandeur + ".jpg"}
              setLink={setlink}
              scanelement={"rest_dossier"}
            />
          ) : (
            <ScanedImage
              imageLink={scandossier.rest_dossier}
              title="باقي الملف"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ScanDossier;
