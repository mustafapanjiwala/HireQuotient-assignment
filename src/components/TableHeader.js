// TableHeader.js
import React from "react";

const TableHeader = ({ selectedRows, toggleSelectAll, pageSize }) => {
  return (
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            checked={selectedRows.length === pageSize}
            onChange={toggleSelectAll}
          />
        </th>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Roles</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
