// Cart.js
// Displays when the user click on the Cart button

// React imports
import { React, useEffect, useState, useContext } from "react";

// Navigate import for routing to different pages
import { useNavigate } from "react-router-dom";

// Components imports
import StudentShell from "./StudentShell";

// Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

// Mantine core component imports
import { Checkbox, Button } from "@mantine/core";

// Mantine dates component imports
import { DatePicker } from "@mantine/dates";

// API Import
import api from "../api/api";

import { Context } from "../Context/Context";

// Cart({ user})
// Displays the display for the cart page
function Cart({ user }) {
  // methods for saving location
  const navigate = useNavigate();
  
  // CART CONTEXT STATE ARRAY
  const { cart } = useContext(Context);
  console.log('CART: ' + JSON.stringify(cart));

  // Post the reservation to database
  const onSubmitCheckout = async (username) => {
    try {
      const itemModelIds = cart.map(item => item.item_model_id);

      const response = await api.post("/reservations", { username, itemModelIds });
      
      console.log("ON SUBMIT SUBMITTED");
      console.log('POST /reservations response: ' + JSON.stringify(response.data));
    } catch (error) {
      console.log("ERROR IN RESERVING ITEM: " + error);
    }
  };

  return (
    <>
      {/* <StudentShell> component */}
      {/* User input for determining the right person is on the right page */}
      <StudentShell user={user}>
        <div>
          {/* Back Button */}
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
          {/* Title */}
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
            onClick={() => {
              onSubmitCheckout(user.username).then(() => {
                // console.log(user.username);
                // console.log(location.state.itemModelId);
                // navigate("/checkoutConfirmation", {
                //   state: {
                //     name: mName,
                //     typeN: type,
                //     category: cat,
                //   },
                // });
              });
            }}
          >
            Reserve
          </Button>
        </div>
      </StudentShell>
    </>
  );
}

export default Cart;
