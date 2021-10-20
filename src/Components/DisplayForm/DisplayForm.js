import React from "react";
import Logo from "../Logo/Logo";
import file from "./file.png";
import demandeur from "./demandeur.png";
import update from "./update.png";
import DefaultImage from "../ScanDossier/DefaultImage.png";

function DisplayForm(props) {
  const username = props.getUsername();
  return (
    <div className="container border shadow p-4 mb-3 mt-3 bg-body rounded">
      <div className="m-2 row d-flex justify-content-center flex-row-reverse">
        <Logo root={"/DisplayForm"} title={username} pic={DefaultImage} />
      </div>
      <div className="d-flex justify-content-center">
        <h1 className="col-12">الصفحة الرئيسة</h1>
      </div>
      <div className="row d-flex justify-content-center flex-row-reverse">
        <div className="m-2">
          <Logo root={"/Dossier"} title={"تحرير ملف"} pic={file} />
        </div>
        <div className="m-2">
          <Logo root={"/ScanDossier"} title={"مسح ملف"} pic={file} />
        </div>
        <div className="m-2">
          <Logo root={"/Demandeur"} title={"تحرير طالب"} pic={demandeur} />
        </div>
        <div className="m-2">
          <Logo root={"/Conjoin"} title={"تحرير زوج(ة) طالب"} pic={demandeur} />
        </div>
        <div className="m-2">
          <Logo root={"/Demandeur"} title={"تحيين ملف"} pic={update} />
        </div>
        <div className="m-2">
          <Logo root={"/Utilisateur"} title={"اظافة مستخدم"} pic={update} />
        </div>
      </div>
    </div>
  );
}

export default DisplayForm;
