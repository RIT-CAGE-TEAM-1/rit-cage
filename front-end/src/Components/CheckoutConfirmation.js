// CheckoutConfirmation.js
// Display the confirmation screen that appears when reserving an item

// React imports
import React from "react";

// Icon Imports
import { IoIosCheckmarkCircle } from "react-icons/io";

// Navigational Imports
import { useNavigate, useParams, useLocation } from "react-router-dom";

// Mantine Core imports
import { Button } from "@mantine/core";

// StudentShell component import
import StudentShell from "./StudentShell";

// CheckoutComfirmation({user})
// Takes in a {user} to determine if page can be displayed
function CheckoutConfiirmation({ user }) {
  // methods to save location
  const navigate = useNavigate();

  // { name, typeN, category }
  // Used to pass the name, typeN, and cateogry to concurrent page

  return (
    <>
      {/* <StudentShell> component */}
      {/* User input for determining the right person is on the right page */}
      <StudentShell user={user}>
        <div style={{ paddingLeft: "1em" }}>
          {/* Checkmark Icon */}
          <IoIosCheckmarkCircle color="#F76902" style={{ fontSize: "60px" }} />
          <h1 style={{ color: "#F76902", marginBottom: "0" }}>
            Reservation Successful
          </h1>
          {/* Reservation Confirmation info */}
          {/* <h1 style={{ color: "#F76902", marginBottom: "0" }}>
            Reservation Confirmation
          </h1>

          <h3> name</h3>
          <h4> 1x</h4>

          {/* Container for type  and value */}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <h4
              style={{
                fontWeight: "350",
                paddingRight: "1em",
                marginBottom: "0",
              }}
            >
              Type:
            </h4>
            <h4 style={{ fontWeight: "600" }}> typeN </h4>
          </div> */}
          {/* Container for Category and value */}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <h4
              style={{ fontWeight: "350", paddingRight: "1em", marginTop: "0" }}
            >
              Category:{" "}
            </h4>
            <h4 style={{ fontWeight: "600", marginTop: "0" }}>category</h4>
          </div>{" "} */}
          {/* Return Date text and value */}
          {/* <h3 style={{ color: "#F76902", marginBottom: "0" }}>
            {" "}
            Return Date:{" "}
          </h3>
          <h4 style={{ marginTop: "0" }}> xxxx </h4> */}
          {/* <Button> that returns the user to the inventory list page */}
          <Button
            color="orange"
            radius="xl"
            type="submit"
            style={{ marginTop: "1.5em" }}
            onClick={() => {
              navigate("/studentList");
            }}
          >
            Back to Home
          </Button>
        </div>
      </StudentShell>
    </>
  );
}

export default CheckoutConfiirmation;
