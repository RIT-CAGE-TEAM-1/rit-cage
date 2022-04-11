// Cart.js
// Displays when the user click on the Cart button

// React imports
import { React, useEffect, useState, useContext } from "react";

// Navigate import for routing to different pages
import { useNavigate } from "react-router-dom";

// Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

// Mantine core component imports
import {
  Checkbox,
  Button,
  Radio,
  RadioGroup,
  TextInput,
  NumberInput,
  Textarea,
} from "@mantine/core";

// Mantine dates component imports
import { DatePicker } from "@mantine/dates";

// Mantine Hooks Import
import { useForm } from "@mantine/hooks";

// Component Imports
import FacultyShell from "./FacultyShell";
import { Context } from "../Context/Context";
import api from "../api/api";

// Cart({ user})
// Displays the display for the cart page
function FacultyCart({ user }) {
  // methods for saving location
  const navigate = useNavigate();

  // Post the reservation to database
  // const onSubmitCheckout = async (username, itemId) => {
  //   try {
  //     await api.post("/reservations", { username, itemId });
  //     console.log("ON SUBMIT SUBMITTED");
  //   } catch (error) {
  //     console.log("ERROR IN RESERVING ITEM: " + error);
  //   }
  // };

  // Post the reservation to database
  const onSubmitCheckout = async (username) => {
    try {
      const itemModelIds = cart.map((item) => item.item_model_id);

      const response = await api.post("/reservations", {
        username,
        itemModelIds,
      });

      console.log("ON SUBMIT SUBMITTED");
      console.log(
        "POST /reservations response: " + JSON.stringify(response.data)
      );
    } catch (error) {
      console.log("ERROR IN RESERVING ITEM: " + error);
    }
  };

  //   const onSubmitKit = async () => {
  //       try {
  //         const response = await api.post()
  //       } catch (error) {
  //           console.log("ERROR CREATING A KIT: " + error)
  //       }
  //   }

  const { cart } = useContext(Context);
  console.log("CART: " + JSON.stringify(cart));

  const cartRows = cart.map((x) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: "#EFF4FF",
          marginLeft: "1em",
          paddingLeft: "1em",
          marginBottom: ".5em",
          width: "30%",
          alignItems: "center",
          marginTop: "1em",
        }}
      >
        <h4 style={{ fontWeight: "300", paddingRight: "1em" }}>
          {x.model_name}
        </h4>
      </div>
    );
  });

  // state variable for radio button
  const [isKit, toggleIsKit] = useState(true);

  const form = useForm({
    initialValues: {
      class: "",
      name: "",
      comments: "",
      quantity: 1,
      date: Date(),
      request: "",
    },
  });

  // state variable for submitting special request
  const [isSpecial, toggleIsSpecial] = useState(false);

  return (
    <>
      {/* <StudentShell> component */}
      {/* User input for determining the right person is on the right page */}
      <FacultyShell user={user}>
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
        <div>{cartRows}</div>
        {/* Reserve/Kit selection for Employees */}
        <div
          style={{
            display: "flex",
            flexDirection: "Column",
            width: "30%",
            paddingLeft: "1em",
          }}
        >
          <h3
            style={{
              color: "#F76902",
              marginTop: "1em",
              marginBottom: ".5em",
            }}
          >
            Type:
          </h3>

          <RadioGroup
            orientation="vertical"
            style={{ paddingBottom: "1em" }}
            onChange={(e) => {
              console.log(e);
              if (e == "Reserve") {
                toggleIsKit(false);
              } else if (e == "Kit") {
                toggleIsKit(true);
              }
            }}
          >
            <Radio value="Kit" label="Create a Kit">
              Create a Kit
            </Radio>
            <Radio value="Reserve" label="Reserve Item(s)">
              Reserve Item(s)
            </Radio>
          </RadioGroup>

          {/* Section seperator */}
          <hr
            style={{
              width: "97.5%",
              color: "#F3F3F3",
              opacity: "40%",
            }}
          />
        </div>

        {/* Conditionally Rendered Reserve Elements */}
        {/* Section for selecting a date */}
        <div
          style={{
            display: "flex",
            flexDirection: "Column",
            width: "30%",
            paddingLeft: "1em",
          }}
        >
          {/* Container div for which section to display */}
          <div style={{ display: isKit == false ? "" : "none" }}>
            {/* <form
              onSubmit={form.onSubmit((values) =>
                console.log(
                  "RETURNED FROM RESERVE STUFF: " + JSON.stringify(values)
                )
              )}
            > */}
            <h3 style={{ color: "#F76902" }}>Reservation:</h3>
            <DatePicker
              placeholder="Pick date"
              label="Reservation Date"
              required
              inputFormat="MM/DD/YYYY"
              labelFormat="MM/DD/YYYY"
              // {...form.getInputProps("date")}
              onChange={(e) => {
                console.log(e);
              }}
            />

            <Checkbox
              label="Submit a Special Request"
              color="orange"
              style={{
                marginTop: "1em",
                paddingBottom: "1em",
              }}
              onChange={(e) => {
                toggleIsSpecial(!isSpecial);
              }}
            />

            <Textarea
              placeholder="Special Request"
              id="special_request_field"
              style={{
                display: isSpecial == true ? "" : "none",
                marginBottom: "2em",
              }}
              // {...form.getInputProps("request")}
            />

            {/* Section seperator */}
            <hr
              style={{
                width: "97.5%",
                color: "#F3F3F3",
                opacity: "40%",
              }}
            />

            <h3
              style={{
                color: "#F76902",
                marginTop: "1em",
                marginBottom: "0",
              }}
            >
              Notification Method
            </h3>
            <h5 style={{ marginTop: ".5em" }}>
              IST Cage will send notifications regarding reservation
              confirmations, upcoming item returns, and late items.
            </h5>
            <Checkbox
              label="Email"
              color="orange"
              style={{ marginTop: "0", marginLeft: "1em" }}
            />
            <Checkbox
              label="Phone"
              color="orange"
              style={{ marginTop: "1em", marginLeft: "1em" }}
            />

            {/* Conditionally Displayed Reserve Button */}
            <Button
              color="orange"
              radius="xl"
              type="submit"
              style={{
                marginTop: "1.5em",
                width: "30%",
                display: isKit == false ? "" : "none",
              }}
              onClick={() => {
                onSubmitCheckout(user.username);
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
              }}
            >
              Reserve
            </Button>
            {/* </form> */}
          </div>

          {/* Conditionally Rendered Kit Elements */}
          {/* Container div for which section to display */}
          {/* <form
            onSubmit={form.onSubmit((values) =>
              console.log("RETURNED FROM KIT STUFF: " + JSON.stringify(values))
            )}
          > */}
          <div
            style={{
              display: isKit == true ? "" : "none",
            }}
          >
            <h3 style={{ color: "#F76902" }}>Kits:</h3>
            {/* Containing div for Input fields next to each other */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                paddingBottom: "1em",
              }}
            >
              <TextInput
                placeholder="Class Code"
                label="Class"
                required
                style={{ width: "30%" }}
                //   {...form.getInputProps("class")}
              />
              <TextInput
                placeholder="Kit Name"
                label="Name"
                required
                style={{ paddingLeft: "1em", width: "70%" }}
                //   {...form.getInputProps("name")}
              />
            </div>
            <TextInput
              placeholder="Additional Comments"
              label="Comment"
              required
              style={{ paddingBottom: "1em" }}
              // {...form.getInputProps("comments")}
            />

            <NumberInput
              defaultValue={1}
              placeholder="1"
              label="Number of Kits"
              required
              min={1}
              style={{ paddingBottom: "2em", width: "22%" }}
              // {...form.getInputProps("quantity")}
            />

            {/* Section seperator */}
            <hr
              style={{
                width: "97.5%",
                color: "#F3F3F3",
                opacity: "40%",
              }}
            />

            <h3
              style={{
                color: "#F76902",
                marginTop: "1em",
                marginBottom: "0",
              }}
            >
              Notification Method
            </h3>
            <h5 style={{ marginTop: ".5em" }}>
              IST Cage will send notifications regarding reservation
              confirmations, upcoming item returns, and late items.
            </h5>
            <Checkbox
              label="Email"
              color="orange"
              style={{ marginTop: "0", marginLeft: "1em" }}
            />
            <Checkbox
              label="Phone"
              color="orange"
              style={{ marginTop: "1em", marginLeft: "1em" }}
            />

            {/* Conditionally Displayed Create Kit Button */}
            <Button
              color="orange"
              radius="xl"
              type="submit"
              style={{
                marginTop: "1.5em",
                width: "30%",
                display: isKit == true ? "" : "none",
              }}
              onClick={() => {
                // onSubmitKit();
              }}
            >
              Create Kit
            </Button>
          </div>
          {/* </form> */}
        </div>
      </FacultyShell>
    </>
  );
}

export default FacultyCart;
