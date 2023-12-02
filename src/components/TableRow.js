// TableRow.js
import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const TableRow = ({
  user,
  selectedRows,
  handleCheckboxChange,
  handleEdit,
  handleDelete,
  editingUser,
  setEditingUser,
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
          <div className="delete-all" onClick={handleSaveEdit}>
            Save
          </div>
        ) : (
          <div
            div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <button className="edit" onClick={() => handleEdit(user.id)}>
              <FiEdit color="black" />
            </button>
            <button className="delete" onClick={() => handleDelete(user.id)}>
              <MdDeleteOutline color="red" size={20} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
