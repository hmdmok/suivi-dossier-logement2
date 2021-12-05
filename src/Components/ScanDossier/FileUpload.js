import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";

const FileUpload = ({
  titleFilename,
  tosendFilename,
  Num_Dossier,
  setLink,
  scanelement,
}) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState(titleFilename);
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadDone, setuploadDone] = useState(false);

  const onChange = (e) => {
    setUploadPercentage(0);
    setUploadedFile({});
    if (e.target.files[0].type === "image/jpeg") {
      const myRenamedFile = new File([e.target.files[0]], tosendFilename, {
        type: file.type,
        lastModified: new Date(),
      });
      setFile(myRenamedFile);
      setFilename(tosendFilename);
    } else {
      setMessage("please chose a jpg picture");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      fetch("http://localhost:3005/upload/" + Num_Dossier, {
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
          const { fileName, filePath } = data;

          setUploadedFile({ fileName, filePath });
          setMessage("File Uploaded");
          setuploadDone(true);
          setLink(filePath,scanelement);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit} hidden={uploadDone}>
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

        <input
          type="submit"
          value="حفظ"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
