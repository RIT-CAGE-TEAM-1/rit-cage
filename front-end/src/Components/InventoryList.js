// InventoryList.js
// Employee view of the inventory list

// React Imports
import { React, useEffect, useState } from "react";

// Mantine Component Imports
import { Table, Checkbox, Button, Input } from "@mantine/core";

// Mantine Hook Import
import { useDebouncedValue } from "@mantine/hooks";

// Icon Imports
import { FaTrash } from "react-icons/fa";
import { BsFilter } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

// API Import
import { ItemAPI } from "../api/Items";

// Navigational Import
import { useNavigate } from "react-router-dom";

// AdminShell Component Import
import AdminShell from "./AdminShell";

// Displays the Inventory title
// Displays the All, Damaged, and Tagged Buttons on the left side of the screen
// Displays the Deselect All, Report Issue, Delete, Filter, and New Item buttons on the right side of the screen
// function InventoryHeader() {

//   return (
//     <>

//     </>
//   );
// }

// Displays the Table contents
function InventoryList({ user }) {
  const [currentCount, setCurrentCount] = useState(0);
  const [elements, setElements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebouncedValue(searchTerm, 500);
  const navigate = useNavigate();

  // for selecting multiple items in the list
  const [checkedItems, setCheckedItems] = useState([]);

  // const [userN, setUserN] = useState[user];

  // useEffect(() => {
  //   window.localStorage.setItem("WHO_AM_I", JSON.Stringify(userN));
  // }, [userN]);

  // useEffect(() => {
  //   const data = window.localStorage.getItem("WHO_AM_I");
  //   if (data !== null) {
  //     setUserN(JSON.parse(data));
  //   }
  // }, []);

  useEffect(() => {
    getInventory(debouncedTerm);
  }, [debouncedTerm]);

  // get model names and count of each model and display it in the table
  const getInventory = async (searchTerm) => {
    try {
      const items = await ItemAPI.getItemModels(searchTerm);
      console.log(items);
      setElements(items);
    } catch (err) {
      console.log(err);
    }
  };

  // Displays all of the items in a table from the database
  const rows = elements.map((element, index) => (
    <tr key={`${index} - ${element.model_name}}`}>
      <td style={{ width: "2em" }}>
        <Checkbox
          color="orange"
          onChange={(e) => {
            const isChecked = e.currentTarget.checked;
            if (isChecked) {
              setCurrentCount(currentCount + 1);
              setCheckedItems([...checkedItems, element]);
            } else {
              if (currentCount - 1 < 0) {
                setCurrentCount(0);
                setCheckedItems(
                  checkedItems.filter((checkedItem) => checkedItem !== element)
                );
              } else {
                setCurrentCount(currentCount - 1);
                setCheckedItems(
                  checkedItems.filter((checkedItem) => checkedItem !== element)
                );
              }
            }
          }}
        />
      </td>
      <td
        style={{ width: "30%" }}
        onClick={() => {
          navigate(`/inventory/summary/${element.item_model_id}`, {
            state: { idNum: element.item_model_id },
          });
        }}
      >
        {element.model_name}
      </td>
      <td>{element.count}</td>
    </tr>
  ));

  return (
    <>
      <AdminShell user={user}>
        <Input
          icon={<AiOutlineSearch />}
          placeholder="Search Item by Model Name"
          radius="xl"
          style={{
            marginBottom: "1em",
            marginTop: "1em",
            marginLeft: "1em",
            width: "98%",
          }}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "1.5em",
          }}
        >
          {/* Left side buttons and title */}
          <div>
            <h1
              style={{
                color: "#F76902",
                marginTop: ".5em",
                paddingLeft: ".5em",
              }}
            >
              Inventory
            </h1>
          </div>

          {/* Right Side Buttons */}
          <div
            style={{
              paddingRight: ".5em",
              display: "inline-flex",
              gap: ".5em",
              alignItems: "center",
            }}
          >
            <h4 style={{ fontWeight: "500", paddingRight: "1em" }}>
              {currentCount} Selected{" "}
            </h4>
            {/* <Button
              variant="subtle"
              color="orange"
              onClick={() => {
                if (currentCount < 0) {
                  setCurrentCount(0);
                }
                setCurrentCount(0);
              }}
            >
              Deselect All
            </Button> */}
            <Button
              variant="outline"
              color="orange"
              style={{ boxShadow: "0px 3px 6px #D3D3D3" }}
              onClick={() => {
                navigate("/create");
              }}
            >
              Create New Item
            </Button>
            <Button
              variant="outline"
              color="orange"
              style={{ boxShadow: "0px 3px 6px #D3D3D3" }}
            >
              Report Incident
            </Button>
            <Button
              variant="outline"
              color="dark"
              style={{ boxShadow: "0px 3px 6px #D3D3D3" }}
            >
              <BsFilter style={{ paddingRight: ".5em" }} />
              Filter
            </Button>
            <Button
              variant="outline"
              color="dark"
              style={{ boxShadow: "0px 3px 6px #D3D3D3" }}
            >
              <FaTrash style={{ paddingRight: ".5em" }} />
              Delete
            </Button>
          </div>
        </div>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th style={{ paddingRight: "0px" }} />

              <th>Model Name</th>

              <th>Count</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </AdminShell>
    </>
  );
}

export default InventoryList;
