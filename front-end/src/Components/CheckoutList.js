// CheckoutList.js
// StudentView of the inventory for obtaining items

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
import StudentShell from "./StudentShell";
import { GlobalContext } from "../Context/GlobalState";

// CheckoutList({user})
// Takes in a user value to know if the user is accessing the correct page
// Displays the list of available items for students
function CheckoutList({ user }) {
  // elements[]
  // Array that holds all of the available items
  const [elements, setElements] = useState([]);

  // searching values
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebouncedValue(searchTerm, 500);

  // Method to navigate the site
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

  // array for checked items in the list
  let selectedArray = [];

  // State variable to set and access whether change has occured to disable/allow Add to Cart Button
  const [addToCartDisabled, setAddToCartDisabled] = useState(false);

  // Map function to display all of the available items with checkboxes and counts
  const rows = elements.map((element, index) => (
    <tr
      key={`${index} - ${element.model_name}}`}
      // onClick={() => {
      //   navigate(`/studentList/checkoutForm/${element.item_model_id}`, {
      //     state: { itemModelId: element.item_model_id },
      //   });
      // }}
    >
      <td>
        {/* Checkbox with onChange that adds item to list when selected, removes when deselected */}
        <Checkbox
          label={element.model_name}
          id={element.model_name}
          color="orange"
          onChange={(e) => {
            if (addToCartDisabled === true) {
              setAddToCartDisabled(false);
            }
            const isChecked = e.target.checked;
            // const checkedID = e.target.id;
            // console.log(
            //   "IS IT CHECKED? " + isChecked + "   ID IS: " + checkedID
            // );
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
      {/* number of available items */}
      <td>{element.count}</td>
    </tr>
  ));

  const [selects, setSelects] = useState("");
  const { addItemsToList } = useContext(GlobalContext);

  return (
    <>
      {/* StudentShell component that is serves as the top and left navigation fields */}
      <StudentShell user={user}>
        {/* Search Bar */}
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
              disabled={addToCartDisabled}
              variant="outline"
              color="orange"
              style={{ boxShadow: "0px 3px 6px #D3D3D3", marginRight: "1em" }}
              onClick={() => {
                setAddToCartDisabled(true);
                if (selectedArray.length != null) {
                  selectedArray = selectedArray.map((x) => {
                    return x.model_name;
                  });
                  addItemsToList({ selectedArray });
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
          {/* Shopping Cart Button */}
          <FaShoppingCart
            style={{
              padding: "1em",
              fontSize: "2em",
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => {
              navigate("/cart");
            }}
          />
        </div>
        {/* Table that displays all items */}
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </StudentShell>
    </>
  );
}

export default CheckoutList;
