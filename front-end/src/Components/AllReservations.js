import { React, useEffect, useState } from "react";

// AdminShell component import
import AdminShell from "./AdminShell";

// Mantine Core imports
import { Table } from "@mantine/core";

import api from "../api/api";

function AllReservations({ user }) {
  const [reserves, setReserves] = useState();
  const [displayData, setDisplayData] = useState();

  // getItemTypes call
  // returns all of the item types in the database
  const getAllReservations = async () => {
    try {
      const response = await api.get("/reservations");
      console.log("THIS IS RESPONSE" + JSON.stringify(response.data));
      setReserves(response.data.reservations);
      const responseArray = reserves.map((x) => {
        return (
          <tr>
            <td>{x.reservation_id}</td>
            <td>{x.item_condition}</td>
            <td>{x.reservation_date}</td>
          </tr>
        );
      });
      setDisplayData(responseArray);
    } catch (error) {
      console.log("ERROR: " + error);
    }
  };

  useEffect(() => {
    getAllReservations();
  }, [reserves]);

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
          <h1 style={{ color: "#F76902", margin: 0 }}>Reservations</h1>
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
              <th>ID Number</th>
              <th>Item Condition</th>
              <th>Reservation Date</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </Table>
      </div>
    </AdminShell>
  );
}

export default AllReservations;
