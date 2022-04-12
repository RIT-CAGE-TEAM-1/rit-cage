import { React, useEffect, useState } from "react";

// Icon Imports
import { AiOutlineArrowLeft } from "react-icons/ai";

// Navigational Imports
import { useNavigate, useParams, useLocation } from "react-router-dom";

// AdminShell component import
import AdminShell from "./AdminShell";

// Mantine Core imports
import { Table } from "@mantine/core";

import api from "../api/api";

function UserList({ user }) {
  const navigate = useNavigate();

  const [users, setUsers] = useState();

  useEffect(() => {
    getAllUsers();
  }, []);

  // getItemTypes call
  // returns all of the item types in the database
  const getAllUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log(JSON.stringify("THIS IS RESPONSE" + response.data));
      const responseArray = response.data.users.map((x) => {
        return (
          <tr>
            <td>{x.name}</td>
            <td>{x.username}</td>
            <td>{x.role}</td>
            <td>{x.email}</td>
            <td>{x.phone}</td>
          </tr>
        );
      });
      setUsers(responseArray);
    } catch (error) {
      console.log("ERROR: " + error);
    }
  };

  return (
    <AdminShell user={user}>
      {/* Containg div for page layout */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          paddingBottom: "1.5em",
          paddingLeft: "1.5em",
        }}
      >
        {/* Title of Page */}
        <div>
          <h1 style={{ color: "#F76902", margin: 0 }}>Users</h1>
        </div>
      </div>

      <div>
        {/* Content of Page */}
        <Table
          highlightOnHover
          style={{
            marginLeft: "1em",
            width: "97%",
            marginBottom: "2em",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </Table>
      </div>
    </AdminShell>
  );
}

export default UserList;
