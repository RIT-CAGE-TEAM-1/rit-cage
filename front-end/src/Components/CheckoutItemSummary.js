// CheckoutItemSummary.js
// Displays the Summary page when clicking on an item

// React imports
import { useState, useEffect } from "react";
import React from "react";

// Icon imports
import {
  AiOutlineArrowLeft,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";

// Navigational Imports
import { useNavigate, useLocation, useParams } from "react-router-dom";

// Mantine Core component imports
import { Checkbox, Button, createStyles } from "@mantine/core";

// api.js Imports
import api from "../api/api";
import { ItemAPI } from "../api/Items";

// StudentShell component import
import StudentShell from "./StudentShell";

// CheckoutItemSummary({user})
// Takes in a {user} to determine if page can be displayed
function CheckoutItemSummary({ user }) {
  // Setting and getting quantity
  // const [quantityCount, setQuantityCount] = useState(1);

  // methods to save location
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // item states for setting an item, and setting the info of an item
  const [item, setItem] = useState();
  const [itemInfo, setItemInfo] = useState();

  // const for itemModelID passed from CheckoutList
  const iModelID = location.state.itemModelId;

  // consts for sending results to the next page
  const mName = item?.model_name ?? "";
  const type = itemInfo?.data.availableItem.type_name ?? "";
  const cat = itemInfo?.data.availableItem.category_name ?? "";

  // .useEffect() calls
  // Performs items right off the bat
  React.useEffect(() => {
    getItem(params.id);
    getAvailableItem(params.id);
    console.log("state info");
    console.log(itemInfo);
  }, []);

  React.useEffect(() => {
    console.log("State item");
    console.log(item);
  }, [item]);

  // getItem call
  // Returns an item from the database given a modelId
  const getItem = async (modelId) => {
    try {
      const items = await ItemAPI.getItemModel(modelId);
      console.log({ items });
      setItem(items);
    } catch (err) {
      console.log(err);
    }
  };

  // getAvailableItem call
  // Returns the selected item
  const getAvailableItem = async (itemModelId) => {
    try {
      const response = await api.get(`/item-models/${itemModelId}/available`);
      setItemInfo(response);
      console.log("AVAILABLE ITEM RESPONSE: " + JSON.stringify(response.data));
    } catch (error) {
      console.log("ERROR IN getAvailableItem: " + error);
    }
  };

  // Post the reservation to database
  const onSubmitCheckout = async (username, itemId) => {
    try {
      await api.post("/reservations", { username, itemId });
      console.log("ON SUBMIT SUBMITTED");
    } catch (error) {
      console.log("ERROR IN RESERVING ITEM: " + error);
    }
  };

  return (
    <>
      {/* <StudentShell> component */}
      {/* User input for determining the right person is on the right page */}
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
          <h1
            style={{
              color: "#F76902",
              margin: 0,
              paddingLeft: ".5em",
            }}
          >
            Reservation Summary
          </h1>
        </div>

        {/* Container for left and right sides of page */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {/* Container for fields on left side */}
          <div style={{ marginLeft: "1em", marginTop: "1em", width: "75%" }}>
            {/* Container for right side fields */}
            <div style={{ width: "75%", paddingLeft: ".5em" }}>
              {/* Containter for Model Name title and result */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <h5>Model Name: </h5>
                <h5 style={{ marginLeft: "1em", fontWeight: "400" }}>
                  {mName}
                </h5>
              </div>
              {/* Containter for Type title and result */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <h5 style={{ marginTop: "0" }}>Type: </h5>
                <h5
                  style={{
                    marginLeft: "1em",
                    fontWeight: "400",
                    marginTop: "0",
                  }}
                >
                  {type}
                </h5>
              </div>
              {/* Containter for Category title and result */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <h5 style={{ marginTop: "0" }}>Category: </h5>
                <h5
                  style={{
                    marginLeft: "1em",
                    fontWeight: "400",
                    marginTop: "0",
                  }}
                >
                  {cat}
                </h5>
              </div>
              {/* Containter for Serial Number title and result */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <h5 style={{ marginTop: "0" }}>Serial Number: </h5>
                <h5
                  style={{
                    marginLeft: "1em",
                    fontWeight: "400",
                    marginTop: "0",
                  }}
                >
                  {itemInfo?.data.availableItem.serial ?? ""}
                </h5>
              </div>
              {/* Containter for Item Condition title and result */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <h5 style={{ marginTop: "0" }}>Item Condition: </h5>
                <h5
                  style={{
                    marginLeft: "1em",
                    fontWeight: "400",
                    marginTop: "0",
                  }}
                >
                  {itemInfo?.data.availableItem.item_condition ?? ""}
                </h5>
              </div>

              {/* Quantity Section
              <div>
                <h5 style={{ paddingLeft: "1.5em", fontWeight: "500" }}>
                  Quantity
                </h5>
                <AiFillMinusCircle
                  onClick={() => {
                    if (quantityCount === 1) {
                      setQuantityCount(1);
                    } else {
                      setQuantityCount(quantityCount - 1);
                    }
                  }}
                />
                <p>{quantityCount}</p>
                <AiFillPlusCircle
                  onClick={() => setQuantityCount(quantityCount + 1)}
                />
              </div> */}

              {/* Return Date section */}
              <h3
                style={{
                  color: "#F76902",
                  marginTop: "2em",
                  marginBottom: "0",
                }}
              >
                Return Date
              </h3>
              <h5 style={{ fontWeight: "400", marginTop: ".5em" }}>
                HARDCODED
              </h5>
            </div>

            {/* Notification Method section */}
            <h3
              style={{ color: "#F76902", marginTop: "2em", marginBottom: "0" }}
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
              style={{ marginTop: "1em", marginLeft: "1em" }}
            />
            <Checkbox
              label="Phone"
              color="orange"
              style={{ marginTop: "1em", marginLeft: "1em" }}
            />

            {/* "Reserve" <Button> */}
            {/* Posts to the database for a reserved item(s) */}
            <Button
              color="orange"
              radius="xl"
              type="submit"
              style={{ marginTop: "1.5em" }}
              onClick={() => {
                onSubmitCheckout(user.username, iModelID).then(() => {
                  console.log(user.username);
                  console.log(location.state.itemModelId);
                  navigate("/checkoutConfirmation", {
                    state: {
                      name: mName,
                      typeN: type,
                      category: cat,
                    },
                  });
                });
              }}
            >
              Reserve
            </Button>
          </div>
        </div>
      </StudentShell>
    </>
  );
}

export default CheckoutItemSummary;
