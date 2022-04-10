// FacultyList.js
// Employee view of the inventory for reserving/creating a kit

// React Imports
import { React, useEffect, useState } from "react";

// Navigational Imports
import { useNavigate } from "react-router-dom";

// API Import
import { ItemAPI } from "../api/Items";

// Mantine Component Imports
import { Table, Input, Checkbox, Button } from "@mantine/core";

// Mantine Hooks Import
import { useDebouncedValue, useSetState } from "@mantine/hooks";

// Icon Imports
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

// Component Imports
import FacultyShell from "./FacultyShell";

// InventoryHeader({searchTerm, setSearchTerm})
// Takes in searchTerm variable for inputting a search term and getting results
function InventoryHeader({ searchTerm, setSearchTerm }) {
  return (
    <>
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
      {/* Containg div for page layout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "1.5em",
        }}
      >
        {/* Title of Page */}
        <div>
          <h1 style={{ color: "#F76902", margin: 0, paddingLeft: ".3em" }}>
            Inventory
          </h1>
        </div>

        {/* Right side Add to Cart button */}
        <div>
          <Button
            variant="outline"
            color="orange"
            style={{ boxShadow: "0px 3px 6px #D3D3D3", marginRight: "1em" }}
            onClick={() => {}}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}

function FacultyList({ user }) {
  const [elements, setElements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebouncedValue(searchTerm, 500);
  const navigate = useNavigate();

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

  let selectedArray = [];

  const rows = elements.map((element, index) => (
    <tr key={`${index} - ${element.model_name}}`}>
      <td>
        {/* Checkbox with onChange that adds item to list when selected, removes when deselected */}
        <Checkbox
          type="checkbox"
          label={element.model_name}
          id={element.model_name}
          color="orange"
          onChange={(e) => {
            const isChecked = e.target.checked;
            const checkedID = e.target.id;
            console.log(
              "IS IT CHECKED? " + isChecked + "   ID IS: " + checkedID
            );
            // adding to selectedArray[]
            if (isChecked) {
              selectedArray.push(element);
              // removing from selectedArray[]
            } else if (!isChecked) {
              selectedArray = selectedArray.filter(function (
                value,
                index,
                arr
              ) {
                return value != element;
              });
            }
            console.log(JSON.stringify(selectedArray));
          }}
        />
      </td>
      <td>{element.count}</td>
      {/* // onClick={() => {
      //   navigate(`/studentList/checkoutForm/${element.item_model_id}`, {
      //     state: { itemModelId: element.item_model_id },
      //   });
      // }} */}
    </tr>
  ));

  return (
    <>
      {/* <FacultyShell> component that is serves as the top and left navigation fields */}
      <FacultyShell user={user}>
        <div
          style={{
            position: "fixed",
            zIndex: "1",
            left: "93%",
            top: "85%",
            backgroundColor: "#F76902",
            borderRadius: "50%",
            boxShadow: "0px 3px 6px #D3D3D3",
          }}
        >
          {/* Shopping Cart button */}
          <FaShoppingCart
            style={{
              padding: "1em",
              fontSize: "2em",
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => {
              navigate("/facultyCart");
            }}
          />
        </div>
        {/* Search Bar and Title */}
        <InventoryHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {/* Table for inventory */}
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </FacultyShell>
    </>
  );
}

export default FacultyList;
