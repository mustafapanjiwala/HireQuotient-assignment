import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import Pagination from "./components/Pagination";
import { MdSearch } from "react-icons/md";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users from the API
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) => a.id - b.id);
        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredSubset = filteredUsers.slice(startIndex, endIndex);
    setUsers(filteredSubset);
  }, [currentPage, pageSize, filteredUsers]);

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = users.filter((user) =>
      Object.values(user).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTermLowerCase)
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleEdit = (userId) => {
    const userToEdit = filteredUsers.find((user) => user.id === userId);
    setEditingUser(userToEdit);
  };

  const handleSaveEdit = () => {
    setFilteredUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === editingUser.id ? editingUser : user
      );
    });
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    setFilteredUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
    setSelectedRows((prevSelected) =>
      prevSelected.filter((id) => id !== userId)
    );
  };

  const handleMultipleDelete = () => {
    const selectedUserIdsOnPage = selectedRows.filter((userId) =>
      users.some((user) => user.id === userId)
    );

    setFilteredUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedUserIdsOnPage.includes(user.id))
    );

    setSelectedRows([]);
  };
  const handleCheckboxChange = (userId) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === pageSize) {
      setSelectedRows([]);
    } else {
      const allUserIds = users.map((user) => user.id);
      setSelectedRows(allUserIds);
    }
  };

  return (
    <div className="user-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-icon" onClick={handleSearch}>
          Search <MdSearch size={15} />
        </button>
      </div>
      <table className="user-table">
        {/* Table header */}
        <TableHeader
          selectedRows={selectedRows}
          toggleSelectAll={toggleSelectAll}
          pageSize={pageSize}
        />
        {/* Table body */}
        <tbody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              selectedRows={selectedRows}
              handleCheckboxChange={handleCheckboxChange}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              editingUser={editingUser}
              setEditingUser={setEditingUser}
              handleSaveEdit={handleSaveEdit}
            />
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <div className="delete-selected">
          <p>{selectedRows.length} of 10 rows selected</p>
          <button
            className="delete-all"
            style={{ marginLeft: "15px" }}
            onClick={handleMultipleDelete}
          >
            Delete all
          </button>
        </div>
        <div>
          <Pagination
            totalPages={Math.ceil(filteredUsers.length / pageSize)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
