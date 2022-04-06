import { React, useState } from "react";

// StudentShell component
import StudentShell from "./StudentShell";

// Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

// Navigate import for routing to different pages
import { useNavigate } from "react-router-dom";

// mantine core component imports
import { Checkbox, Button } from "@mantine/core";

import { DatePicker } from "@mantine/dates";

function Cart({ user }) {
  const navigate = useNavigate();

  return (
    <>
      <StudentShell user={user}>
        {/* Left side back button and title */}
        <div>
          <AiOutlineArrowLeft
            style={{
              paddingLeft: ".5em",
              fontSize: "1.5em",
              color: "#F76902",
            }}
            onClick={() => {
              navigate("/studentList");
            }}
            cursor="pointer"
          />
          <h1 style={{ color: "#F76902", margin: 0, paddingLeft: ".5em" }}>
            Cart
          </h1>
        </div>

        {/* Reserve/Kit selection for Employees */}
        <div
          style={{
            display: "flex",
            flexDirection: "Column",
            width: "30%",
            paddingLeft: "1em",
          }}
        ></div>

        {/* Section seperator */}
        <hr
          style={{
            width: "97.5%",
            color: "#F3F3F3",
            opacity: "40%",
          }}
        />

        {/* Section for selecting a date */}
        <div
          style={{
            display: "flex",
            flexDirection: "Column",
            width: "30%",
            paddingLeft: "1em",
          }}
        >
          <h3 style={{ color: "#F76902" }}>Reservation:</h3>
          <DatePicker
            placeholder="Pick date"
            label="Reservation Date"
            required
          />

          <Checkbox
            label="Submit a Special Request"
            style={{
              marginTop: "1em",
              marginBottom: "1em",
            }}
          />

          {/* Section seperator */}
          <hr
            style={{
              width: "97.5%",
              color: "#F3F3F3",
              opacity: "40%",
            }}
          />

          <h3 style={{ color: "#F76902", marginTop: "2em", marginBottom: "0" }}>
            Notification Method
          </h3>
          <h5 style={{ marginTop: ".5em" }}>
            IST Cage will send notifications regarding reservation
            confirmations, upcoming item returns, and late items.
          </h5>
          <Checkbox
            label="Email"
            color="orange"
            style={{ marginTop: "1em", marginLeft: "1em" }}
          />
          <Checkbox
            label="Phone"
            color="orange"
            style={{ marginTop: "1em", marginLeft: "1em" }}
          />

          <Button
            color="orange"
            radius="xl"
            type="submit"
            style={{ marginTop: "1.5em", width: "30%" }}
            // onClick={() => {
            //   onSubmitCheckout(user.username, iModelID).then(() => {
            //     console.log(user.username);
            //     console.log(location.state.itemModelId);
            //     navigate("/checkoutConfirmation", {
            //       state: {
            //         name: mName,
            //         typeN: type,
            //         category: cat,
            //       },
            //     });
            //   });
            // }}
          >
            Reserve
          </Button>
        </div>
      </StudentShell>
    </>
  );
}

export default Cart;
