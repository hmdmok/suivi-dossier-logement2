import React from "react";

const EditableRow = ({
  noteElement,
  handleEditTableNote,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="ادخل اسم الوضعية ..."
          name="nom"
          value={noteElement.nom}
          onChange={handleEditTableNote}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="ادخل النقاط الموافقة ..."
          name="notes"
          value={noteElement.notes}
          onChange={handleEditTableNote}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
