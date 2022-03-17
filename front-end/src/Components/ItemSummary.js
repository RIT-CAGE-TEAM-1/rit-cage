import React from "react";
import { AiOutlineArrowLeft, AiFillInfoCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { Select, Checkbox, Table } from "@mantine/core";
import { useState } from "react";
import { ItemAPI } from "../api/Items";
import AdminShell from "./AdminShell";

function ItemSummary() {
  const navigate = useNavigate();
  const params = useParams();
  let rows = [];

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
      setItem(items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminShell>
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

          {/* container for title and actions dropdown button */}
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
            <Select
              placeholder="Pick one"
              clearable
              data={[
                { value: "actionOne", label: "First Action" },
                { value: "actionTwo", label: "Second Action" },
                { value: "actionThree", label: "Third Action" },
              ]}
            />
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
            <h2 style={{ marginTop: "0", marginBottom: "0" }}> Router</h2>
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
            <h2 style={{ marginTop: "0", marginBottom: "0" }}> Networking</h2>
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
              paddingLeft: "1em",
            }}
          >
            <h3 style={{ fontWeight: "300", marginBottom: "0" }}>
              <span style={{ fontWeight: "600" }}>Location:</span> XXXXXX
            </h3>
            <h3
              style={{ fontWeight: "300", marginTop: "0", paddingTop: ".5em" }}
            >
              {/* <span style={{ fontWeight: "600" }}>Count:</span> {cnt} */}
            </h3>
          </div>

          {/* Container for right side checkboxes */}
          <div
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
        </h4>

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
              paddingLeft: "1em",
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
              Keywords:
            </h3>
            <h4
              style={{
                fontWeight: "100",
                marginTop: "0",
                width: "96.5%",
              }}
            >
              Scientific, Tech, Cool, Excellent, Fast
            </h4>
          </div>

          {/* Container for keywords title and items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1em",
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
              Comment:
            </h3>
            <h4
              style={{
                fontWeight: "100",
                marginTop: "0",
                width: "96.5%",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          style={{ paddingTop: ".3em", paddingLeft: ".7em", marginBottom: "0" }}
        >
          Events and Logs
        </h2>

        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Serial Number</th>
              <th>Item Condition</th>
              <th>Reservation Date</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </AdminShell>
    </>
  );
}

export default ItemSummary;
