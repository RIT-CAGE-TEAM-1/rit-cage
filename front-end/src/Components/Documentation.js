// Documentation.js
// Displays the documentation provided for each page

// React Import
import { React } from "react";

// AdminShell component import
import AdminShell from "./AdminShell";

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
            The Homepage takes users to the Dashboard, where they can see
            multiple, valuable statistics that not only track and display
            current data, but also provide all-time statistical data. Users can
            expand and collapse different sections, whether that be Upcoming
            Reservations or Overdue Items, the user chooses what information
            they want to see. The current date is displayed on the top of the
            page, so users have convienient access for associating the data with
            the day.
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
            The Inventory page hosts the entire, available inventory of items
            and their available number at the IST Cage. Users can interact with
            the items by selecting their checkbox, or selecting an individual
            item. There are three buttons that exist at the top of the page:
            Create New Item, Report Incident, and Delete. The Create New Button
            allows users to add a new item to the inventory by specifying
            specific information about it. The Report Incident button allows
            user to report about an event that happened with an item or items.
            The Delete button allows user to remove an item from the IST Cage
            Inventory.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Condimentum vitae sapien pellentesque habitant morbi tristique
            senectus et. Arcu odio ut sem nulla pharetra diam sit amet. Faucibus
            turpis in eu mi bibendum neque. Pretium aenean pharetra magna ac
            placerat vestibulum lectus mauris. Est ullamcorper eget nulla
            facilisi. Varius quam quisque id diam vel quam elementum pulvinar.
            Odio ut enim blandit volutpat maecenas volutpat blandit aliquam
            etiam. Nam aliquam sem et tortor. Diam quis enim lobortis
            scelerisque fermentum. Suspendisse ultrices gravida dictum fusce.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Condimentum vitae sapien pellentesque habitant morbi tristique
            senectus et. Arcu odio ut sem nulla pharetra diam sit amet. Faucibus
            turpis in eu mi bibendum neque. Pretium aenean pharetra magna ac
            placerat vestibulum lectus mauris. Est ullamcorper eget nulla
            facilisi. Varius quam quisque id diam vel quam elementum pulvinar.
            Odio ut enim blandit volutpat maecenas volutpat blandit aliquam
            etiam. Nam aliquam sem et tortor. Diam quis enim lobortis
            scelerisque fermentum. Suspendisse ultrices gravida dictum fusce.
          </p>
        </div>
      </AdminShell>
    </>
  );
}

export default Documentation;
