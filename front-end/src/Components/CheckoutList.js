import { React, useEffect } from "react";
import { useState } from "react";
import { Table, Input, Checkbox, Button } from "@mantine/core";
import { ItemAPI } from "../api/Items";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue, useSetState } from "@mantine/hooks";
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import StudentShell from "./StudentShell";

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
        {/* Left side title */}
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
              // navigate("/create");
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}

function CheckoutList({ user }) {
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
    <tr
      key={`${index} - ${element.model_name}}`}
      // onClick={() => {
      //   navigate(`/studentList/checkoutForm/${element.item_model_id}`, {
      //     state: { itemModelId: element.item_model_id },
      //   });
      // }}
    >
      <td>
        <Checkbox
          label={element.model_name}
          color="orange"
          onChange={(e) => {
            const isChecked = e.target.checked;
            console.log("IS IT CHECKED? " + isChecked);
            if (isChecked) {
              setCheckedItems((prev) => [...prev, element]);
              console.log(
                "LIST OF SELECTED ITEMS" + JSON.stringify(checkedItems)
              );
            } else if (!isChecked) {
              const found = checkedItems.findIndex((item) => {
                return item.id === element.id;
              });
              setCheckedItems(checkedItems.splice(1, found));
              // setCheckedItems(
              //   checkedItems.filter((checkedItem) => checkedItem !== element)
              // );
              console.log(
                "LIST OF SELECTED ITEMS" + JSON.stringify(checkedItems)
              );
            }
          }}
        />
      </td>
      <td>{element.count}</td>
    </tr>
  ));

  return (
    <>
      <StudentShell user={user}>
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
        <InventoryHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCheckedItems={setCheckedItems}
        />
        {/* <>{searchTerm}</> */}
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
