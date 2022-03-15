import React from "react";
import { AiOutlineArrowLeft, AiFillInfoCircle } from "react-icons/ai";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { TextInput, Textarea, Checkbox, Button } from "@mantine/core";
import { useState } from "react";
import { ItemAPI } from "../api/Items";

function CheckoutItemSummary() {
  const navigate = useNavigate();
  const params = useParams();

  const [item, setItem] = useState();

  React.useEffect(() => {
    getItem(params.id);
  }, []);

  React.useEffect(() => {
    console.log("State item");
    console.log(item);
  }, [item]);

  const getItem = async (modelId) => {
    try {
      const items = await ItemAPI.getItemModel(modelId);
      console.log({ items });
      setItem(items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Left side buttons and title */}
      <div>
        <AiOutlineArrowLeft
          style={{
            paddingLeft: ".5em",
            fontSize: "1.5em",
            color: "#F76902",
          }}
          onClick={() => {
            navigate("/users");
          }}
          cursor="pointer"
        />
        <h1
          style={{
            color: "#F76902",
            margin: 0,
            paddingLeft: ".5em",
          }}
        >
          Checkout
        </h1>
      </div>

      {/* Container for left and right sides of page */}
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        {/* Container for fields on left side */}
        <div style={{ marginLeft: "1em", marginTop: "1em", width: "75%" }}>
          {/* Container for first and last name next to each other */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <TextInput
              placeholder="First name"
              label="First Name"
              required
              style={{ marginRight: "1.5em", width: "40%" }}
            />
            <TextInput
              placeholder="Last name"
              label="Last Name"
              required
              style={{ width: "40%" }}
            />
          </div>
          <TextInput
            placeholder="UUID"
            label="University ID Number"
            required
            style={{ marginTop: "1.5em", width: "82%" }}
          />
          <TextInput
            placeholder="Email"
            label="Email Address"
            required
            style={{ marginTop: "1.5em", width: "82%" }}
          />
          <TextInput
            placeholder="Phone"
            label="XXX-XXX-XXXX"
            required
            style={{ marginTop: "1.5em", width: "82%" }}
          />

          <Textarea
            placeholder="Type Request Here"
            label="Submit a Special Request"
            autosize
            minRows={2}
            maxRows={4}
            style={{ marginTop: "1em", width: "82%" }}
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
            style={{ marginTop: "1.5em" }}
            onClick={() => {
              navigate("/checkoutConfiirmation");
            }}
          >
            Reserve
          </Button>
        </div>

        {/* Container for right side fields */}
        <div style={{ width: "25%" }}>
          <h3 style={{ color: "#F76902", marginTop: "1em" }}>
            Reservation Summary:
          </h3>
          {/* Containter for Model Name title and result */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <h5>Model Name: </h5>
            <h5 style={{ marginLeft: "1em", fontWeight: "400" }}>
              {item?.model_name ?? ""}
            </h5>
          </div>
          {/* Containter for Type title and result */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <h5>Type: </h5>
            <h5 style={{ marginLeft: "1em", fontWeight: "400" }}>
              {item?.type ?? ""}
            </h5>
          </div>
          {/* Containter for Category title and result */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <h5>Category: </h5>
            <h5 style={{ marginLeft: "1em", fontWeight: "400" }}>HARDCODED</h5>
          </div>
          {/* Containter for Serial Number title and result */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <h5>Serial Number: </h5>
            <h5 style={{ marginLeft: "1em", fontWeight: "400" }}>HARDCODED</h5>
          </div>
          {/* Containter for Item Condition title and result */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <h5>Item Condition: </h5>
            <h5 style={{ marginLeft: "1em", fontWeight: "400" }}>HARDCODED</h5>
          </div>

          {/* Return Date Section */}
          <h3 style={{ color: "#F76902", marginTop: "2em", marginBottom: "0" }}>
            Return Date:
          </h3>
          <h5 style={{ fontWeight: "400" }}>HARDCODED</h5>
        </div>
      </div>
    </>
  );
}

export default CheckoutItemSummary;
