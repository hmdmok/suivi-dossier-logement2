import React, { useState } from "react";
import XLSX from "xlsx";

function OldRegister() {
    const [tableOutput, setTableOutput] = useState('')
  const onChange = (event) => {
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
        var table_output =
          '<table class="table table-striped table-bordered">';
        for (var row = 0; row < sheet_data.length; row++) {
          table_output += "<tr>";
          for (var cell = 0; cell < sheet_data[row].length; cell++) {
              table_output += '<td>'+sheet_data[row][cell]+'</td>';
          }
          table_output += "</tr>";
        }
        table_output += "</table>";

        setTableOutput(table_output);
      }
    };
  };

  return (
    <div className="container">
      <div className="card my-5">
        <div className="card-header">
          <b>اختار ملف</b>
        </div>
        <div className="card-body">
          <input type="file" id="excel_file" onChange={onChange} />
        </div>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html: tableOutput}}></div>
    </div>
  );
}

export default OldRegister;
