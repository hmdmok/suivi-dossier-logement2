import React, { useState, useEffect } from "react";
import Message from "../Message/Message";
import XLSX from "xlsx";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Table } from "react-bootstrap";
import { getJsDateFromExcel } from "excel-date-to-js";

function OldRegister() {
  const [tableOutput, setTableOutput] = useState([]);
  const [tableErrors, setTableErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [messageTable, setMessageTable] = useState("");
  const [fileName, setfileName] = useState(" اختر الملف");
  const [systemCommunes, setSystemCommunes] = useState([]);

  const onChange = (event) => {
    setMessage("");
    setTableOutput([]);
    setMessageTable("");
    setTableErrors([]);
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
          var table_output = [],
            table_errors = [];
          var error = false;
          var newMessage = messageTable;
          for (var row = 0; row < sheet_data.length; row++) {
            if (sheet_data[row].length < 15) {
              setMessage("الملف غير مطابق يرجى تحميل المثال");
              error = true;
            }
            if (row === 0) {
              for (var cell = 0; cell < sheet_data[row].length; cell++) {
                if (cell === 0)
                  if (!(sheet_data[row][cell] === "السطر")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 1)
                  if (!(sheet_data[row][cell] === "البلدية")) {
                    setMessage("1الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 2)
                  if (!(sheet_data[row][cell] === "رقم السجل")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال2");
                    error = true;
                  }
                if (cell === 3)
                  if (!(sheet_data[row][cell] === "رقم الملف")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال3");
                    error = true;
                  }
                if (cell === 4)
                  if (!(sheet_data[row][cell] === "تاريخ ايداع الملف")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال4");
                    error = true;
                  }
                if (cell === 5)
                  if (!(sheet_data[row][cell] === "الاسم")) {
                    setMessage(" ");
                    error = true;
                  }
                if (cell === 6)
                  if (!(sheet_data[row][cell] === "اللقب")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال6");
                    error = true;
                  }
                if (cell === 7)
                  if (!(sheet_data[row][cell] === "تاريخ الميلاد")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال7");
                    error = true;
                  }
                if (cell === 8)
                  if (!(sheet_data[row][cell] === "مكان الميلاد")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال8");
                    error = true;
                  }
                if (cell === 9)
                  if (!(sheet_data[row][cell] === "العنوان")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال9");
                    error = true;
                  }
                if (cell === 10)
                  if (!(sheet_data[row][cell] === "اسم الاب")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال10");
                    error = true;
                  }
                if (cell === 11)
                  if (!(sheet_data[row][cell] === "لقب الام")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال11");
                    error = true;
                  }
                if (cell === 12)
                  if (!(sheet_data[row][cell] === "اسم الام")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 13)
                  if (!(sheet_data[row][cell] === "حالة الملف")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 14)
                  if (!(sheet_data[row][cell] === "رقم الحصة")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 15)
                  if (!(sheet_data[row][cell] === "تاريخ الاستفادة")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
                if (cell === 16)
                  if (!(sheet_data[row][cell] === "ملاحضات")) {
                    setMessage("الملف غير مطابق يرجى تحميل المثال");
                    error = true;
                  }
              }
            } else if (!error) {
              var newRow = [];
              var errorTable = false;

              newRow = sheet_data[row];
              var newDate;
              var data = newRow[0];

              if (data !== parseInt(data, 10)) {
                errorTable = true;

                newMessage += "خطء في السطر " + row + " في العمود " + 1 + " . ";
                setMessageTable(newMessage);
              }
              try {
                newDate = new Date(
                  (newRow[4] - (25567 + 1)) * 86400 * 1000
                ).toISOString();
                newRow[4] = newDate.split("T")[0];
              } catch {
                errorTable = true;

                newMessage += "خطء في السطر " + row + " في العمود " + 5 + " . ";
                setMessageTable(newMessage);
              }
              try {
                newDate = new Date(
                  (newRow[7] - (25567 + 1)) * 86400 * 1000
                ).toISOString();
                newRow[7] = newDate.split("T")[0];
              } catch {
                errorTable = true;

                newMessage += "خطء في السطر " + row + " في العمود " + 8 + " . ";
                setMessageTable(newMessage);
              }
              if (!errorTable) table_output.push(newRow);
              else {
                table_errors.push(newRow);
              }
            }
          }
        }
        if (table_output) setTableOutput(table_output);
        if (table_errors) setTableErrors(table_errors);
      };
    } else setMessage("الملف ليس كما يجب");
  };

  useEffect(() => {
    if (systemCommunes.length === 0) {
      fetch("https://sdl-api.herokuapp.com/SystemCommunes")
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setSystemCommunes(data);
          }
        })
        .catch((err) => setMessage(toString(err)));
    }
  }, []);

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
            {messageTable ? (
              <div>
                <Message msg={messageTable} />
                <h1 className="my-5">جدول الاخطاء</h1>
                <Table striped bordered responsive id="error-table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">السطر</th>
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
                  {tableErrors.length !== 0 ? (
                    <tbody>
                      {tableErrors.map((rowMap1, x) => (
                        <tr className={x} key={x + 1234}>
                          {rowMap1.map(
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
                  ) : null}
                </Table>
              </div>
            ) : null}

            <h1 className="my-5">ملفات السجل</h1>
            {tableOutput.length !== 0 ? (
              <div>
                <button>اظافة الملفات الى قاعدة البيانات</button>
              </div>
            ) : null}
            <Table striped bordered responsive id="data-table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">السطر</th>
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
              {tableOutput.length !== 0 ? (
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
              ) : null}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OldRegister;
