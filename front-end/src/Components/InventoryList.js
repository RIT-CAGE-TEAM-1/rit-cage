import { React, useEffect } from "react";
import { useState } from "react";
import { Table, Checkbox, Button } from "@mantine/core";
import { FaTrash } from "react-icons/fa";
import { BsFilter } from "react-icons/bs";
import api from '../api';

// Temporary  table contents
// const elements = [
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
//   { name: "iPhone XR", id: 1234565, location: "Golisano" },
//   { name: "iPhone 11", id: 9876543, location: "Saunders" },
//   { name: "MacBook Pro", id: 1928374, location: "Heaven" },
// ];

// Displays the Table contents
function InventoryList() {
  const [currentCount, setCurrentCount] = useState(0);
  const [ elements, setElements ] = useState([]);

  useEffect(() => {
    getItems()
  }, []);

  const getItems = async () => {
    try {
      const response = await api.get('/items');
      console.log('ITEMS RESPONSE: ' + JSON.stringify(response.data));
      
      setElements(response.data.items)
    } catch (error) {
      console.log("ERROR: " + error);
    }
  };

  const rows = elements.map((element, index) => (
    <tr key={`${index} - ${element.name}}`}>
      <td style={{ width: "2em" }}>
        <Checkbox
          color="orange"
          onChange={(e) => {
            const isChecked = e.currentTarget.checked;
            if (isChecked) setCurrentCount(currentCount + 1);
            else setCurrentCount(currentCount - 1);
          }}
        />
      </td>
      <td style={{ width: "12em" }}>{element.name}</td>
      <td style={{ width: "8em" }}>{element.id}</td>
      <td>{element.location}</td>
    </tr>
  ));

  // Displays the Inventory title
  // Displays the All, Damaged, and Tagged Buttons on the left side of the screen
  // Displays the Deselect All, Report Issue, Delete, Filter, and New Item buttons on the right side of the screen
  function InventoryHeader() {
    const [selected, setSelected] = useState("All");

    const inventorySelectors = ["All", "Tagged"];

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "1.5em",
          }}
        >
          {/* Left side buttons and title */}
          <div>
            <h1 style={{ color: "#F76902", margin: 0, paddingLeft: ".5em" }}>
              Inventory
            </h1>

            {/* Selected / Unselected Buttons */}
            {inventorySelectors.map((element) =>
              selected === element ? (
                <Button
                  variant="subtle"
                  color="dark"
                  onClick={() => setSelected(element)}
                  style={{ borderBottom: "3px solid orange" }}
                >
                  {element}
                </Button>
              ) : (
                <Button
                  variant="subtle"
                  color="dark"
                  onClick={() => setSelected(element)}
                >
                  {element}
                </Button>
              )
            )}
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
            <h4 style={{ fontWeight: "500" }}>{currentCount} Selected </h4>
            <Button variant="subtle" color="orange">
              Deselect All
            </Button>
            <Button
              variant="outline"
              color="orange"
              style={{ boxShadow: "0px 3px 6px #D3D3D3" }}
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
      </>
    );
  }

  return (
    <>
      <InventoryHeader />
      <Table highlightOnHover>
        <thead>
          <tr>
            <th style={{ paddingRight: "0px" }} />

            <th>Name</th>

            <th>Product ID</th>

            <th>Location</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default InventoryList;
