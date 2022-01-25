import { render } from "@testing-library/react";
import { React, Component } from "react";
import { useState } from "react";
import {
  AppShell,
  Box,
  Header,
  Image,
  Input,
  Navbar,
  Text,
  useMantineTheme,
  Table,
  Checkbox,
  Button,
} from "@mantine/core";

const elements = [
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
  { name: "iPhone XR", id: 1234565, location: "Golisano" },
  { name: "iPhone 11", id: 9876543, location: "Saunders" },
  { name: "MacBook Pro", id: 1928374, location: "Heaven" },
];

function InventoryList() {
  const [currentCount, setCurrentCount] = useState(0);

  const rows = elements.map((element, index) => (
    <tr key={`${index} - ${element.name}}`}>
      <td>
        <Checkbox
          color="orange"
          onChange={(e) => {
            const isChecked = e.currentTarget.checked;
            if (isChecked) setCurrentCount(currentCount + 1);
            else setCurrentCount(currentCount - 1);
          }}
        />
      </td>
      <td>{element.name}</td>
      <td>{element.id}</td>
      <td>{element.location}</td>
    </tr>
  ));

  function InventoryHeader() {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Div for separating buttons on the left side from right side */}
          <div>
            <h1 style={{ color: "#F76902", margin: 0, paddingLeft: ".5em" }}>
              Inventory
            </h1>
            <Button variant="subtle" color="dark">
              All
            </Button>
            <Button variant="subtle" color="dark">
              Damaged
            </Button>
            <Button variant="subtle" color="dark">
              Tagged
            </Button>
          </div>

          {/* Div for separating buttons on the right side from left side */}
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
            <Button variant="outline" color="dark">
              Report Issue
            </Button>
            <Button variant="outline" color="dark">
              Delete
            </Button>
            <Button variant="outline" color="dark">
              Filter
            </Button>
            <Button variant="outline" color="dark">
              New Item
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
            <th />

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
