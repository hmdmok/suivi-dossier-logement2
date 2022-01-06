import React, { useState } from "react";
import FileUpload from "../FileUpload/FileUpload";
import ScanedImage from "../ScanedImage/ScanedImage";
import DefaultImage from "./DefaultImage.jpg";
import Message from "../Message/Message";

function Utilisateur(props) {
  const [message, setMessage] = useState("");
  const [utilisateur, setutilisateur] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    repassword: "",
    usertype: "",
    birthday: "",
    email: "",
    phone: "",
    photo_link: DefaultImage,
    remark: "",
    creator: props.getUsername(),
  });

  const setlink = (link, elem) => {
    setutilisateur({
      ...utilisateur,
      [elem]: link,
    });
  };
  const onHandleChange = (event) => {
    setutilisateur({
      ...utilisateur,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitUtilisateur = (event) => {
    event.preventDefault();
    if (utilisateur.password !== utilisateur.repassword) {
      setMessage("كلمة السر غير متطابقة");
    } else {
      fetch("http://localhost:3005/Utilisateur", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(utilisateur),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user.id) {
            props.loadUser(user);
            props.setAuthent(true);
            props.setUsertype(user.usertype);
            props.history.push("/DisplayForm");
          } else if (user.message === "user alredy exists") {
            setMessage("اسم المستخدم موجود من قبل ... اختر اسم مستخدم مختلف");
          }
        })
        .catch((err) => setMessage(err));
    }
  };

  return (
    <form
      onSubmit={onSubmitUtilisateur}
      className="container form-signin border shadow p-3 my-5 bg-light bg-gradient rounded"
    >
      <h1>الرجاء ادخال معلومات المستخدم</h1>
      {message ? <Message msg={message} /> : null}
      <div className="row text-right">
        <div className="col order-last">
          <label htmlFor="inputFirstName" className="text-right">
            الاسم{" "}
          </label>
          <input
            name="firstname"
            onChange={onHandleChange}
            type="text"
            id="inputFirstName"
            className="form-control text-right"
            placeholder="الاسم "
            autoFocus
          />
        </div>
        <div className="col order-first">
          <label htmlFor="inputLastName" className="text-right">
            اللقب
          </label>
          <input
            name="lastname"
            onChange={onHandleChange}
            type="name"
            id="inputLastName"
            className="form-control text-right"
            placeholder="اللقب"
          />
        </div>
      </div>
      <div className="row text-right">
        <div className="col">
          <label htmlFor="inputBirthday" className="">
            تاريخ الميلاد
          </label>
          <input
            name="birthday"
            onChange={onHandleChange}
            type="date"
            id="inputBirthday"
            className="form-control text-right"
            placeholder="تاريخ الميلاد"
            required
          />
        </div>
        <div className="col order-first">
          <label htmlFor="inputTelephone" className="">
            رقم الهاتف
          </label>
          <input
            name="phone"
            onChange={onHandleChange}
            type="tel"
            id="inputTelephone"
            className="form-control text-right"
            placeholder="رقم الهاتف"
            required
          />
        </div>
      </div>
      <div className="row text-right">
        <div className="col">
          <label htmlFor="inputUsertype" className="">
            وظيفة المستخدم
          </label>
          <select
            name="usertype"
            onChange={onHandleChange}
            id="inputUsertype"
            className="form-control text-right"
            placeholder="وظيفة المستخدم"
            defaultValue="-1"
            required
          >
            <option value="-1" disabled hidden>
              وظيفة المستخدم
            </option>
            <option value="super">مطور</option>
            <option value="admin">مسير</option>
            <option value="agent">عون حجز</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="inputUsername" className="">
            اسم المستخدم
          </label>
          <input
            name="username"
            onChange={onHandleChange}
            type="text"
            id="inputUsername"
            className="form-control text-right"
            placeholder="اسم المستخدم"
            required
          />
        </div>
      </div>
      <div className="row text-right">
        <div className="col order-last">
          <label htmlFor="inputPassword" className="">
            كلمة السر
          </label>
          <input
            name="password"
            onChange={onHandleChange}
            type="password"
            id="inputPassword"
            className="form-control text-right"
            placeholder="كلمة السر"
            required
          />
        </div>
        <div className="col">
          <label htmlFor="inputRepassword" className="">
            تاكيد كلمة السر
          </label>
          <input
            name="repassword"
            onChange={onHandleChange}
            type="password"
            id="inputRepassword"
            className="form-control text-right"
            placeholder="تاكيد كلمة السر"
            required
          />
        </div>
      </div>
      <div className="row text-right">
        <div className="col">
          <label htmlFor="inputEmail" className="">
            ادخل البريد الالكتروني
          </label>
          <input
            name="email"
            onChange={onHandleChange}
            type="email"
            id="inputEmail"
            className="form-control text-right"
            placeholder="البريد الالكتروني"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <ScanedImage
            imageLink={utilisateur.photo_link}
            title="صورة المستخدم"
          />
        </div>
        <div className="col-9">
          {utilisateur.photo_link === DefaultImage ? (
            <FileUpload
              Num_Dossier={utilisateur.username}
              titleFilename="صورة المستخدم"
              tosendFilename={"photo_profile_" + utilisateur.username + ".jpg"}
              setLink={setlink}
              scanelement={"photo_link"}
            />
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="inpuRemark" className="">
            ملاحظات{" "}
          </label>
          <input
            name="remark"
            onChange={onHandleChange}
            type="text"
            id="inputRemark"
            className="form-control text-right"
            placeholder="ملاحظات "
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col order-last">
          <input
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            value="  تسجيل الدخول"
          />
        </div>
        <div className="col">
          <input
            className="btn btn-lg btn-primary btn-block"
            type="reset"
            value="تراجع"
          />
        </div>
      </div>

      <p className="mt-5 mb-3 text-muted">© 2021 hmdmok</p>
    </form>
  );
}

export default Utilisateur;
