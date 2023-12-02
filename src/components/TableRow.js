// TableRow.js
import React from "react";
import { FiEdit, FiDelete } from "react-icons/fi";

const TableRow = ({
  user,
  selectedRows,
  handleCheckboxChange,
  handleEdit,
  handleDelete,
  editingUser, // Receive editingUser as a prop
  setEditingUser, // Receive setEditingUser as a prop
  handleSaveEdit,
}) => {
  return (
    <tr key={user.id}>
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(user.id)}
          onChange={() => handleCheckboxChange(user.id)}
        />
      </td>
      <td>{user.id}</td>
      <td>
        {editingUser && editingUser.id === user.id ? (
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
        ) : (
          user.name
        )}
      </td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        {editingUser && editingUser.id === user.id ? (
          <button className="save" onClick={handleSaveEdit}>
            Save
          </button>
        ) : (
          <>
            <button className="edit" onClick={() => handleEdit(user.id)}>
              <FiEdit />
            </button>
            <button className="delete" onClick={() => handleDelete(user.id)}>
              <FiDelete />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
