import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mantine/core";
import { useState } from "react";
import { ItemAPI } from "../api/Items";

function CheckoutConfiirmation() {
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
      <div style={{ paddingLeft: "1em" }}>
        <IoIosCheckmarkCircle color="#F76902" style={{ fontSize: "60px" }} />
        <h1 style={{ color: "#F76902" }}> Reservation Confirmation </h1>

        <h3> {item?.model_name ?? ""}</h3>
        <h4> 1x</h4>

        {/* Container for type title and value */}
        <div
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
          <h4 style={{ fontWeight: "600" }}> Type Name</h4>
        </div>

        {/* Container for type Category and value */}
        <div
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
          <h4 style={{ fontWeight: "600", marginTop: "0" }}> Category Name</h4>
        </div>

        <h3 style={{ color: "#F76902" }}> Return Date: </h3>
        <h4> xxxx </h4>

        <Button
          color="orange"
          radius="xl"
          type="submit"
          style={{ marginTop: "1.5em" }}
          onClick={() => {
            navigate("/users");
          }}
        >
          Back to Home
        </Button>
      </div>
    </>
  );
}

export default CheckoutConfiirmation;
