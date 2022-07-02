import React from "react";

const ReadOnlyRow = ({ tableN, handleEditClick }) => {
  return (
    <tr className={tableN.id} key={tableN.id}>
      <th className={tableN.id} scope="row">
        {tableN.nom}
      </th>
      <td className={tableN.id}>{tableN.notes}</td>

      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, tableN)}
        >
          تعديل
        </button>
        
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
