import React from "react";
import FileUpload from "./FileUpload";

function ScanDossier(props) {
  return (
    <div
      className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded"
      hidden={props.hidden}
    >
      <h1 className="my-3">الرجاء ادخل الملف الممسوح</h1>

      <div>
        <FileUpload
          titleFilename="الصورة الشمسية"
          tosendFilename={"photo" + props.id_demandeur}
          nomDossier={ props.id_demandeur}
        />
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="photo"
            name="photo"
          />
          <label className="custom-file-label" htmlFor="photo">
            الصورة الشمسية
          </label>
        </div>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="CIN"
            name="CIN"
          />
          <label className="custom-file-label" htmlFor="CIN">
            بطاقة التعريف
          </label>
        </div>
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
      </div>
    </div>
  );
}

export default ScanDossier;
