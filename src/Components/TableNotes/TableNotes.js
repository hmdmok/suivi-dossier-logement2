import React, { Fragment, useEffect, useState } from "react";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";

function TableNotes(porps) {
  const [noteElement, setNoteElement] = useState({
    id: "",
    notes: "",
    code: "",
    nom: "",
  });
  const [tableNote, setTableNote] = useState([]);
  const [noteElementId, setNoteElementId] = useState(null);

  useEffect(() => {
    fetch("https://sdl-api.herokuapp.com/TableNotes")
      .then((response) => response.json())
      .then((data) => {
        setTableNote(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditTableNote = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newNoteElement = { ...noteElement };
    newNoteElement[fieldName] = fieldValue;

    setNoteElement(newNoteElement);
  };

  const handleEditClick = (event, tableN) => {
    event.preventDefault();
    setNoteElementId(tableN.id);

    const formValues = {
      id: tableN.id,
      notes: tableN.notes,
      code: tableN.code,
      nom: tableN.nom,
    };

    setNoteElement(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: noteElementId,
      notes: noteElement.notes,
      code: noteElement.code,
      nom: noteElement.nom,
    };

    const editedNoteElement = [...tableNote];

    const index = tableNote.findIndex((tableN) => tableN.id === noteElementId);

    editedNoteElement[index] = editedContact;

    setTableNote(editedNoteElement);
    setNoteElementId(null);

    fetch("https://sdl-api.herokuapp.com/TableNotes", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedContact),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          alert("تم تعديل النقاط");
        }
      })
      .catch((err) => alert(err));
  };

  const handleCancelClick = () => {
    setNoteElementId(null);
  };

  return (
    <div className="container">
      <div>
        <h1 className="my-5">جدول التنقيط</h1>
        <form onSubmit={handleEditFormSubmit}>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">الوضعية</th>
                <th scope="col">التنقيط</th>
                <th scope="col">تغيير</th>
              </tr>
            </thead>
            <tbody>
              {tableNote.map((tableN) => (
                <Fragment>
                  {noteElementId === tableN.id ? (
                    <EditableRow
                      noteElement={noteElement}
                      handleEditTableNote={handleEditTableNote}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      tableN={tableN}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default TableNotes;
