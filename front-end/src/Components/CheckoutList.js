import { React, useEffect } from "react";
import { useState } from "react";
import { Table, Checkbox, Button, Input } from "@mantine/core";
import { ItemAPI } from "../api/Items";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { AiOutlineSearch } from "react-icons/ai";

function InventoryHeader({ searchTerm, setSearchTerm }) {
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
        <h1 style={{ color: "#F76902", margin: 0, paddingLeft: ".5em" }}>
          Inventory
        </h1>
      </div>
    </>
  );
}

function CheckoutList() {
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

  const rows = elements.map((element, index) => (
    <tr key={`${index} - ${element.model_name}}`}>
      <td
        style={{ width: "30%" }}
        onClick={() => {
          navigate(`/users/checkoutForm/${element.item_model_id}`);
        }}
      >
        {element.model_name}
      </td>
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
            <th>Model Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default CheckoutList;
