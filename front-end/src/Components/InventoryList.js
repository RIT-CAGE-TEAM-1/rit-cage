import { React, useEffect } from "react";
import { useState } from "react";
import { Table, Checkbox, Button, Input } from "@mantine/core";
import { FaTrash } from "react-icons/fa";
import { BsFilter } from "react-icons/bs";
import api from "../api/api";
import { ItemAPI } from "../api/Items";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useDebouncedValue } from "@mantine/hooks";

// Displays the Inventory title
// Displays the All, Damaged, and Tagged Buttons on the left side of the screen
// Displays the Deselect All, Report Issue, Delete, Filter, and New Item buttons on the right side of the screen
function InventoryHeader({
  searchTerm,
  setSearchTerm,
  currentCount,
  setCurrentCount,
  setCheckedItems,
}) {
  const [selected, setSelected] = useState("All");

  const inventorySelectors = ["All", "Tagged"];

  const navigate = useNavigate();

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
          <Button
            variant="subtle"
            color="orange"
            onClick={() => {
              setCurrentCount("");
            }}
          >
            Deselect All
          </Button>
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
    </>
  );
}

// Displays the Table contents
function InventoryList() {
  const [currentCount, setCurrentCount] = useState(0);
  const [elements, setElements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebouncedValue(searchTerm, 500);
  const navigate = useNavigate();

  // for selecting multiple items in the list
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    getInventory(debouncedTerm);
  }, [debouncedTerm]);

  // useEffect(() => {
  //   debouncedFetchData(searchTerm, res => {
  //     setElements(res);
  //   });
  //  }, [searchTerm]);

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

  // const ControlledCheckBox = () => {
  //   const [checked, setChecked] = useState(false);
  //   return (
  //     <Checkbox
  //       color="orange"
  //       checked={checked}
  //       onChange={() => {
  //         const newVal = !checked;
  //         setChecked(newVal);
  //         if (newVal) setCurrentCount(currentCount + 1);
  //         else setCurrentCount(currentCount - 1);
  //       }}
  //     />
  //   );
  // };

  const rows = elements.map((element, index) => (
    <tr key={`${index} - ${element.model_name}}`}>
      <td style={{ width: "2em" }}>
        {/* <ControlledCheckBox /> */}
        <Checkbox
          color="orange"
          onChange={(e) => {
            const isChecked = e.currentTarget.checked;
            if (isChecked) {
              setCurrentCount(currentCount + 1);
              setCheckedItems([...checkedItems, element]);
            } else {
              setCurrentCount(currentCount - 1);
              setCheckedItems(
                checkedItems.filter((checkedItem) => checkedItem !== element)
              );
            }
          }}
        />
      </td>
      <td
        style={{ width: "30%" }}
        onClick={() => {
          navigate(`/inventory/summary/${element.item_model_id}`);
        }}
      >
        {element.model_name}
      </td>
      {/* <td>{element.model_types}</td>
      <td>{element.category_name}</td>
      <td>{element.location}</td> */}
      <td>{element.count}</td>
    </tr>
  ));

  return (
    <>
      <InventoryHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentCount={currentCount}
        setCurrentCount={setCurrentCount}
        setCheckedItems={setCheckedItems}
      />
      {/* <>{searchTerm}</> */}
      <Table highlightOnHover>
        <thead>
          <tr>
            <th style={{ paddingRight: "0px" }} />

            <th>Model Name</th>

            {/* <th>Item Type</th>

            <th>Category</th>

            <th>Location</th> */}

            <th>Count</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default InventoryList;
