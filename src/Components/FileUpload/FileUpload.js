import React, { Fragment, useState } from "react";
import Message from "../Message/Message";
import Progress from "../ScanDossier/Progress";

const FileUpload = ({
  titleFilename,
  tosendFilename,
  Num_Dossier,
  setLink,
  scanelement,
}) => {
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState(titleFilename);
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadDone, setuploadDone] = useState(false);

  const onChange = (e) => {
    setUploadPercentage(0);
    if (e.target.files[0].type === "image/jpeg") {
      const myRenamedFile = new File([e.target.files[0]], tosendFilename, {
        type: file.type,
        lastModified: new Date(),
      });
      setFile(myRenamedFile);
      setFilename(tosendFilename);
    } else {
      setMessage("يرجى اختيار صورة");
    }
  };

  const onUpload = async (eve) => {
    eve.preventDefault();
    const formData = new FormData();
    formData.append("username", "test");
    formData.append("photo_link", file);

    if (Num_Dossier)
      try {
        fetch("https://sdl-api.herokuapp.com/PhotoLinkUpload", {
          method: "post",
          body: formData,
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const { path } = data;
            setMessage("File Uploaded");
            setuploadDone(true);
            setLink(`https://sdl-api.herokuapp.com/${path}`, scanelement);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        if (err.response.status === 500) {
          setMessage("يوجد مشكل في الخادم");
        } else {
          setMessage(err.response.data.msg);
        }
        setUploadPercentage(0);
      }
    else setMessage("يجب ادخال اسم المستخدم");
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <div className="my-5" hidden={uploadDone}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <button onClick={onUpload} className="btn btn-primary btn-block mt-4">
          حفظ
        </button>
      </div>
    </Fragment>
  );
};

export default FileUpload;
