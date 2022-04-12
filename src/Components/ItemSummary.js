// ItemSummary.js
// Displays the summary information for items that the user clicks on

// React Imports
import React, { useState, useEffect } from "react";

// Icon Imports
import { AiOutlineArrowLeft, AiFillInfoCircle } from "react-icons/ai";

// Navigational Imports
import { useNavigate, useParams, useLocation } from "react-router-dom";

// Mantine Component Imports
import { Table } from "@mantine/core";

// API Import
import { ItemAPI } from "../api/Items";

// AdminShell Component Import
import AdminShell from "./AdminShell";

import api from "../api/api";

// ItemSummary({user})
// ItemSummary takes in user to ensure correct display for appropriate user
function ItemSummary({ user }) {
  // Consts for navigation throughout the site
  const navigate = useNavigate();
  const temp = useLocation();
  const location = temp.state.idNum;

  let [item, setItem] = useState();
  let [eventsLogsList, setEventsLogsList] = useState();

  useEffect(() => {
    getItem(location);
    getItemData(location);
  }, []);

  useEffect(() => {
    console.log("State item");
    console.log("SET ME" + JSON.stringify(item));
    setItem(item);

    const rows = item?.events_and_logs.map((x) => {
      return (
        <tr>
          <td>{x.status}</td>
          <td>{x.serial}</td>
          <td>{x.item_condition}</td>
          <td>{x.reservation_date}</td>
        </tr>
      );
    });
    setEventsLogsList(rows);
  }, [item]);

  const [itemInformation, setItemInformation] = useState();

  const getItem = async (modelId) => {
    try {
      const items = await ItemAPI.getItemModel(modelId).then();
      setItem(items);
    } catch (err) {
      console.log(err);
    }
  };

  const getItemData = async (modelId) => {
    try {
      const endpoint = `/items/${modelId}`;
      const response = await api.get(endpoint);
      console.log("SWAG ATTACK: " + JSON.stringify(response.data));
      setItemInformation(response.data);
      console.log(JSON.stringify(itemInformation));
    } catch (error) {
      console.log("ERROR: " + error);
    }
  };

  // const rows = [];
  // const rows = item.events_and_logs.map((x) => {
  // <tr>
  //   <td>{x.status}</td>
  //   <td>{x.serial}</td>
  //   <td>{x.item_condition}</td>
  //   <td>{x.reservation_date}</td>
  // </tr>;
  // });

  return (
    <>
      <AdminShell user={user}>
        {/* Left side buttons and title */}
        <div>
          <AiOutlineArrowLeft
            style={{
              paddingLeft: ".5em",
              fontSize: "1.5em",
              color: "#F76902",
            }}
            onClick={() => {
              navigate("/inventory");
            }}
            cursor="pointer"
          />

          {/* container for title */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "3em",
              alignItems: "center",
              paddingBottom: ".5em",
            }}
          >
            <h1
              style={{
                color: "#F76902",
                margin: 0,
                paddingLeft: ".5em",
              }}
            >
              {item?.model_name ?? ""}
            </h1>
          </div>
        </div>
        {/* Container for Type and Category */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            paddingLeft: "1em",
            paddingBottom: "1em",
          }}
        >
          {/* Container for type */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingRight: "1em",
              borderRight: "1px solid #333333",
            }}
          >
            <h2 style={{ marginTop: "0", marginBottom: "0" }}>
              {itemInformation?.item.category_name ?? ""}
            </h2>
            <AiFillInfoCircle color="#F76902" style={{ paddingLeft: ".5em" }} />
          </div>

          {/* Container for category */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: "1em",
            }}
          >
            <h2 style={{ marginTop: "0", marginBottom: "0" }}>
              {" "}
              {itemInformation?.item.type_name ?? ""}
            </h2>
            <AiFillInfoCircle color="#F76902" style={{ paddingLeft: ".5em" }} />
          </div>
        </div>
        {/* Container for left side descritions (Location, Count) and right side checkboxes (Available, Active) */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Container for left side descriptions */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1.5em",
            }}
          >
            <h3
              style={{
                fontWeight: "300",
                marginTop: "0",
                paddingTop: ".5em",
                marginBottom: "0",
              }}
            >
              {itemInformation?.item.available ?? ""}
            </h3>
          </div>

          {/* Container for right side checkboxes */}
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingRight: "3em",
              paddingTop: "1.3em",
            }}
          >
            <Checkbox
              label="Available"
              color="orange"
              checked
              style={{ marginBottom: "0" }}
            />
            <Checkbox
              label="Active"
              checked
              color="orange"
              style={{ marginTop: "0", paddingTop: ".5em" }}
            />
          </div> */}
        </div>
        {/* <hr
          style={{
            width: "96.5%",
            color: "#F3F3F3",
            opacity: "40%",
            marginRight: "2.5em",
          }}
        />

        {/* Model Description section */}
        {/* <h2
          style={{ paddingTop: ".3em", paddingLeft: ".7em", marginBottom: "0" }}
        >
          Model Description
        </h2>
        <h4
          style={{
            paddingLeft: "1em",
            fontWeight: "100",
            marginTop: "0",
            paddingTop: ".5em",
            width: "96.5%",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a
          arcu cursus vitae congue mauris. Aenean pharetra magna ac placerat
          vestibulum lectus mauris ultrices eros. Dictum varius duis at
          consectetur lorem donec massa. Elit sed vulputate mi sit amet.
          Tincidunt vitae semper quis lectus. Purus non enim praesent elementum
          facilisis leo. Vitae tempus quam pellentesque nec. Gravida in
          fermentum et sollicitudin ac orci phasellus egestas. Sollicitudin ac
          orci phasellus egestas tellus rutrum tellus pellentesque eu. Lobortis
          scelerisque fermentum dui faucibus in ornare quam. Duis at consectetur
          lorem donec massa sapien faucibus et. Eget magna fermentum iaculis eu.
          Purus non enim praesent elementum facilisis leo vel fringilla.
        </h4> */}

        {/* Container for Keywords and Comments Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            paddingBottom: ".7em",
          }}
        >
          {/* Container for keywords title and items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "1.5em",
            }}
          >
            <h3
              style={{
                fontWeight: "600",
                marginTop: "0",
                paddingTop: ".5em",
                marginBottom: "0",
                paddingBottom: ".2em",
              }}
            >
              Tags:
            </h3>
            <h4
              style={{
                fontWeight: "100",
                marginTop: "0",
                paddingRight: "1em",
                width: "100%",
              }}
            >
              {itemInformation?.item.tags ?? "No Tags"}
            </h4>
          </div>

          {/* Container for keywords title and items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1em",
              width: "50%",
            }}
          >
            <h3
              style={{
                fontWeight: "600",
                marginTop: "0",
                paddingTop: ".5em",
                marginBottom: "0",
                paddingBottom: ".2em",
                width: "100%",
              }}
            >
              Comments:
            </h3>
            <h4
              style={{
                fontWeight: "100",
                marginTop: "0",
                width: "96.5%",
              }}
            >
              {itemInformation?.item.comments ?? "No Comments"}
            </h4>
          </div>
        </div>
        <hr
          style={{
            width: "96.5%",
            color: "#F3F3F3",
            opacity: "40%",
            marginRight: "2.5em",
          }}
        />
        <h2
          style={{ paddingTop: ".3em", paddingLeft: "1em", marginBottom: "0" }}
        >
          Events and Logs
        </h2>
        <Table
          highlightOnHover
          style={{ marginTop: ".5em", marginLeft: "1em", width: "95%" }}
        >
          <thead>
            <tr>
              <th>Status</th>
              <th>Serial Number</th>
              <th>Item Condition</th>
              <th>Reservation Date</th>
            </tr>
          </thead>
          <tbody>{eventsLogsList}</tbody>
        </Table>
      </AdminShell>
    </>
  );
}

export default ItemSummary;
