// Documentation.js
// Displays the documentation provided for each page

// React Import
import { React } from "react";

// AdminShell component import
import AdminShell from "./AdminShell";

// Mantine core component imports
import { Text } from "@mantine/core";

// Documentation()
// Displays the documentation provded for each page
function Documentation({ user }) {
  return (
    <>
      {/* <AdminShell> component that is serves as the top and left navigation fields */}
      <AdminShell user={user}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              color: "#F76902",
              margin: 0,
              paddingLeft: ".5em",
              paddingBottom: ".5em",
              width: "96%",
            }}
          >
            Documentation
          </h1>

          {/* Homepage title and text */}
          <h3 style={{ paddingLeft: "1em", marginBottom: ".5em" }}>Homepage</h3>
          <p
            style={{
              paddingLeft: "1.2em",
              paddingRight: "1.em",
              marginTop: "0",
            }}
          >
            <Text>
              - Displays upcoming reservations - time, model name, serial
              number, item condition, and rentee
            </Text>
            <Text>- Displays overdue items</Text>
            <Text>
              - View reports of daily and previous (by hour) orders, active
              rentees, as well as supporting graphs of peak reservation hours
              and frequency reserved items.
            </Text>
          </p>

          <hr
            style={{
              width: "97.5%",
              color: "#F3F3F3",
              opacity: "40%",
            }}
          />

          {/* Inventory title and text */}
          <h3 style={{ paddingLeft: "1em", marginBottom: ".5em" }}>
            Inventory
          </h3>
          <p
            style={{
              paddingLeft: "1.2em",
              paddingRight: "1.em",
              marginTop: "0",
            }}
          >
            <Text>- Displays all items in database</Text>
            <Text>
              - View model information including description, keywords, etc
            </Text>
            <Text>
              - View items in a model including action (status), serial number,
              comments, and time
            </Text>
            <Text>
              - Create new item with its relative category, type, model,
              optional comment, quantity, and serial numbers; specify
              availability, active status and class restriction
            </Text>
            <Text>- For “Walk-ins,” reservation and carting functionality</Text>
          </p>

          <hr
            style={{
              width: "97.5%",
              color: "#F3F3F3",
              opacity: "40%",
            }}
          />

          {/* Orders title and text */}
          <h3 style={{ paddingLeft: "1em", marginBottom: ".5em" }}>Orders</h3>
          <p
            style={{
              paddingLeft: "1.2em",
              paddingRight: "1.em",
              marginTop: "0",
            }}
          >
            <Text>- Lists all upcoming reservations</Text>
          </p>

          <hr
            style={{
              width: "97.5%",
              color: "#F3F3F3",
              opacity: "40%",
            }}
          />

          {/* Users title and text */}
          <h3 style={{ paddingLeft: "1em", marginBottom: ".5em" }}>Users</h3>
          <p
            style={{
              paddingLeft: "1.2em",
              paddingRight: "1.em",
              marginTop: "0",
            }}
          >
            <Text>- Lists all active user information</Text>
            <Text>
              - Displays information regarding role, username, name, email, and
              UID
            </Text>
          </p>
        </div>
      </AdminShell>
    </>
  );
}

export default Documentation;
