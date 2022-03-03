import React, { useState } from "react";
import Message from "../Message/Message";
import XLSX from "xlsx";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function OldRegister() {
  const [tableOutput, setTableOutput] = useState([]);
  const [message, setMessage] = useState("");
  const [fileName, setfileName] = useState(" اختر الملف");
  const onChange = (event) => {
    setMessage("");
    setTableOutput([]);
    if (
      event.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      event.target.files[0].type === "application/vnd.ms-excel"
    ) {
      setfileName(event.target.files[0].name);
      const excel_file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsArrayBuffer(excel_file);
      reader.onload = function (event) {
        var data = new Uint8Array(reader.result);
        var work_book = XLSX.read(data, { type: "array" });
        var sheet_name = work_book.SheetNames;
        var sheet_data = XLSX.utils.sheet_to_json(
          work_book.Sheets[sheet_name[0]],
          { header: 1 }
        );
        if (sheet_data.length > 0) {
          var table_output = [];
          var error = false;
          for (var row = 0; row < sheet_data.length; row++) {
            if (sheet_data[row].length < 5) {
              setMessage("الملف غير مطابق يرجى تحميل المثال");
              error = true;
            }
            if (row === 0) {
              for (var cell = 0; cell < sheet_data[row].length; cell++) {
                if (cell === 0)
                  if (!(sheet_data[row][cell] === "البلدية")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 1)
                  if (!(sheet_data[row][cell] === "رقم السجل")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 2)
                  if (!(sheet_data[row][cell] === "رقم الملف")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 3)
                  if (!(sheet_data[row][cell] === "تاريخ ايداع الملف")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 4)
                  if (!(sheet_data[row][cell] === "الاسم")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 5)
                  if (!(sheet_data[row][cell] === "اللقب")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 6)
                  if (!(sheet_data[row][cell] === "تاريخ الميلاد")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 7)
                  if (!(sheet_data[row][cell] === "مكان الميلاد")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 8)
                  if (!(sheet_data[row][cell] === "العنوان")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 9)
                  if (!(sheet_data[row][cell] === "اسم الاب")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 10)
                  if (!(sheet_data[row][cell] === "لقب الام")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 11)
                  if (!(sheet_data[row][cell] === "اسم الام")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 12)
                  if (!(sheet_data[row][cell] === "حالة الملف")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 13)
                  if (!(sheet_data[row][cell] === "رقم الحصة")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 14)
                  if (!(sheet_data[row][cell] === "تاريخ الاستفادة")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 15)
                  if (!(sheet_data[row][cell] === "ملاحضات")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
              }
            } else if (!error) {
              table_output.push(sheet_data[row]);
            }
          }
        }
        setTableOutput(table_output);
      };
    } else setMessage("الملف ليس كما يجب");
  };

  return (
    <div className="container">
      <div className="card my-5">
        <div className="card-header">
          <b>اختار ملف</b>
        </div>
        {message ? (
          <div>
            <Message msg={message} />
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button  btn btn-primary mb-3"
              table="data-table"
              filename="tamplate"
              sheet="data"
              buttonText="تحميل المثال"
            />
          </div>
        ) : null}
        <div className="card-body">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFileLang"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="customFileLang">
              {fileName}
            </label>
          </div>

          <div>
            <h1 className="my-5">ملفات السجل</h1>
            <table className="table table-hover" id="data-table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">البلدية</th>
                  <th scope="col">رقم السجل</th>
                  <th scope="col">رقم الملف</th>
                  <th scope="col">تاريخ ايداع الملف</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">اللقب</th>
                  <th scope="col">تاريخ الميلاد</th>
                  <th scope="col">مكان الميلاد</th>
                  <th scope="col">العنوان</th>
                  <th scope="col">اسم الاب</th>
                  <th scope="col">لقب الام</th>
                  <th scope="col">اسم الام</th>
                  <th scope="col">حالة الملف</th>
                  <th scope="col">رقم الحصة</th>
                  <th scope="col">تاريخ الاستفادة</th>
                  <th scope="col">ملاحضات</th>
                </tr>
              </thead>
              <tbody>
                {tableOutput.map((rowMap, x) => (
                  <tr className={x} key={x}>
                    {rowMap.map(
                      (cell, i) => (
                        <td className={i} key={cell + i}>
                          {cell}
                        </td>
                      )
                      // <option key={wilaya.id} value={wilaya.code} >{wilaya.nom_wilaya}</option>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OldRegister;
