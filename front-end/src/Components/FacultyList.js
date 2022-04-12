// FacultyList.js
// Employee view of the inventory for reserving/creating a kit

// React Imports
import { React, useEffect, useState, useContext } from "react";

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
import { Context } from "../Context/Context";

function FacultyList({ user }) {
  const [elements, setElements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebouncedValue(searchTerm, 500);
  const navigate = useNavigate();

  const { cart, setCart } = useContext(Context);
  console.log("CART: " + JSON.stringify(cart));

  // array for checked items in the list
  const [selectedArray, setSelectedArray] = useState([]);

  useEffect(() => {
    getInventory(debouncedTerm);
  }, [debouncedTerm]);

  // get model names and count of each model and display it in the table
  const getInventory = async (searchTerm) => {
    try {
      const items = await ItemAPI.getItemModelsAvailable();
      console.log(items);
      setElements(items);
    } catch (err) {
      console.log(err);
    }
  };

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
              setSelectedArray([...selectedArray, element]);
              // removing from selectedArray[]
            } else if (!isChecked) {
              const newSelectedArray = selectedArray.filter(function (
                value,
                index,
                arr
              ) {
                return value != element;
              });
              setSelectedArray(newSelectedArray);
            }

            console.log(JSON.stringify(selectedArray));
          }}
        />
      </td>
      <td>{element.count}</td>
    </tr>
  ));

  return (
    <>
      {/* <FacultyShell> component that is serves as the top and left navigation fields */}
      <FacultyShell user={user}>
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
              onClick={() => {
                if (selectedArray.length != null) {
                  setCart(selectedArray);
                }
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
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
              navigate("/facultyCart").then();
            }}
          />
        </div>
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
