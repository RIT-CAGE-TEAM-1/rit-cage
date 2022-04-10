import { React, useEffect, useState } from "react";

// AdminShell component import
import AdminShell from "./AdminShell";

// Mantine Core imports
import { Table } from "@mantine/core";

import api from "../api/api";

function AllReservations({ user }) {
  const [reserves, setReserves] = useState();

  // getItemTypes call
  // returns all of the item types in the database
  const getAllReservations = async () => {
    try {
      const response = await api.get("/reservations");
      console.log(JSON.stringify("THIS IS RESPONSE" + response.data));
      setReserves(response.data.users);
    } catch (error) {
      console.log("ERROR: " + error);
    }
  };

  useEffect(() => {
    getAllReservations();

    // const responseArray = reserves.users.map((x) => {
    //   return (
    //     <tr>
    //       <td>{x.reservation_id}</td>
    //       <td>{x.item_condition}</td>
    //       <td>{x.reservation_date}</td>
    //     </tr>
    //   );
    // });
    // setReserves(responseArray);
  }, []);

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
          <tbody>{reserves}</tbody>
        </Table>
      </div>
    </AdminShell>
  );
}

export default AllReservations;
