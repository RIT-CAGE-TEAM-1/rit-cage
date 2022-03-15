import React from "react";
import { useState, useEffect } from "react";
import NewItemInputGroup from "./NewItemInputGroup";
import {
  Button,
  Input,
  createStyles,
  Checkbox,
  TextInput,
  Select,
} from "@mantine/core";
import {
  AiOutlineArrowLeft,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { ItemAPI } from "../api/Items";
import { useForm } from "@mantine/hooks";

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    inputLabel: {
      paddingLeft: "1.5em",
      fontWeight: "500",
      marginBottom: "1em",
    },
    inputBoxStyle: {
      paddingLeft: "1em",
      width: "30%",
    },
    addClassButton: {
      marginBottom: "2.5em",
      marginTop: "1em",
      textDecoration: "underline",
      cursor: "pointer",
      color: "#333333",
      fontWeight: "500",
    },
    createButtonStyle: {
      paddingLeft: "1em",
      marginTop: "1.5em",
    },
    hrStyle: {
      marginTop: "2em",
      color: "#F3F3F3",
      width: "80%",
      marginLeft: "1.3em",
      opacity: "40%",
    },
    quantityBttns: {
      color: "#F76902",
      padding: ".5em",
      fontSize: "20px",
    },
    quantityCountBox: {
      padding: "6px",
      border: "1px solid #333333",
      borderRadius: "3px",
    },
    flexStartAndCenter: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  };
});

function MultiForms() {
  const { classes } = useStyles();

  return (
    <>
      {/* Container for placing Serial Number group and Condition group next to one another */}
      <div
        className={classes.flexStartAndCenter}
        style={{ paddingBottom: "1em" }}
      >
        {/* container for serial number title and input box */}
        <div style={{ width: "30%" }}>
          <h5
            className={classes.inputLabel}
            style={{ marginTop: ".5em", width: "100%" }}
          >
            Serial Number*
          </h5>
          <TextInput
            style={{ width: "100%", paddingLeft: "1.3em" }}
            placeholder="Number"
          />
        </div>

        {/* container for condition title and dropdown */}
        <div style={{ paddingLeft: "1.5em", width: "15%" }}>
          <h5 className={classes.inputLabel} style={{ marginTop: ".5em" }}>
            Condition*
          </h5>
          <Select
            placeholder="Pick One"
            style={{ paddingLeft: "1.3em" }}
            data={[
              { value: "Good", label: "Good" },
              { value: "Poor", label: "Poor" },
              { value: "Broken", label: "Broken" },
            ]}
          />
        </div>
        <div style={{ paddingLeft: "1.5em", width: "31%" }}>
          <h5 className={classes.inputLabel} style={{ marginTop: ".5em" }}>
            Additional Comments
          </h5>
          <TextInput
            style={{ width: "100%", paddingLeft: "1.3em" }}
            placeholder="Text"
          />
        </div>
      </div>
    </>
  );
}

// Form for adding one, or multiple items
function NewItemForm() {
  const { classes } = useStyles();
  const [quantityCount, setQuantityCount] = useState(1);
  const [checkboxesOpen, setCheckboxesOpen] = useState(true);
  const [classRestrictOpen, setClassRestrictOpen] = useState(false);
  // States for item models and item categories and item types
  const [itemModels, setItemModels] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);

  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      Category: "Networking",
      Type: "PC",
      Name: "Dell Tower PC",
    },
  });

  const getItemOptions = async () => {
    try {
      const returnedModels = await ItemAPI.getItemModels();
      const returnedCategories = await ItemAPI.getItemCategories();
      const returnedTypes = await ItemAPI.getItemTypes();
      setItemModels(returnedModels.map((itemModel) => itemModel.model_name));
      setItemCategories(
        returnedCategories.itemCategories.map((ic) => ic.category_name)
      );
      setItemTypes(returnedTypes.itemTypes.map((it) => it.type_name));
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (category, type, model) => {
    try {
      const returnedModels = await ItemAPI.getItemModels();
      const returnedTypes = await ItemAPI.getItemTypes();
      const returnedCategories = await ItemAPI.getItemCategories();

      const categoryObj = returnedCategories.itemCategories.find(
        (obj) => obj.category_name === category
      );
      console.log(categoryObj);
      console.log("HERE");

      const typeObj = returnedTypes.itemTypes.find(
        (obj) => obj.type_name === type
      );

      const modelObj = returnedModels.find((obj) => obj.model_name === model);

      await api.post("/items", {
        item_category_id: categoryObj.item_category_id,
        item_type_id: typeObj.item_type_id,
        item_model_id: modelObj.item_model_id,
        barcode: "",
        comments: "",
        tags: "",
        available: 1,
        active: 1,
        location: "dlmsdksd",
        serials: [
          {
            serial: "nag349nf",
            item_condition: "good",
          },
        ],
      });
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  useEffect(() => {
    getItemOptions();
  }, []);

  // Reusable InventoryHeader for title and buttons
  function ContentHeader() {
    // const [selected, setSelected] = useState("Add One Item");
    // const createNewItemSelectors = ["Add One Item", "Add Multiple Items"];

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
            <AiOutlineArrowLeft
              style={{
                paddingLeft: ".5em",
                paddingBottom: "1em",
                fontSize: "1.5em",
                color: "#F76902",
              }}
              onClick={() => {
                navigate("/inventory");
              }}
              cursor="pointer"
            />
            <h1
              style={{ color: "#F76902", margin: 0, paddingLeft: ".5em" }}
              // className={classes.titleFont}
            >
              Create New Item
            </h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <ContentHeader />

      <form
        onSubmit={form.onSubmit((values) => {
          console.log("submitted to DB");
          onSubmit(values.Category, values.Type, values.Name);
        })}
      >
        {/* Flex Container for two halves of screen */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {/* Container for fields on left half of screen */}
          <div style={{ width: "70%" }}>
            {/* Category input title and dropdown */}
            <NewItemInputGroup
              inputTitle="Category"
              options={itemCategories}
              form={form}
            />
            {/* Type input title and dropdown */}
            <NewItemInputGroup
              inputTitle="Type"
              options={itemTypes}
              form={form}
            />
            {/* Model input title and dropdown */}
            <NewItemInputGroup
              inputTitle="Model"
              options={itemModels}
              form={form}
            />

            <hr className={classes.hrStyle} />

            {/* Quantity title and subtract and add buttons */}
            <div className={classes.flexStartAndCenter}>
              <h5 style={{ paddingLeft: "1.5em", fontWeight: "500" }}>
                Quantity
              </h5>
              <AiFillMinusCircle
                className={classes.quantityBttns}
                onClick={() => {
                  if (quantityCount === 1) {
                    setQuantityCount(1);
                  } else {
                    setQuantityCount(quantityCount - 1);
                  }
                }}
              />
              <p className={classes.quantityCountBox}>{quantityCount}</p>
              <AiFillPlusCircle
                className={classes.quantityBttns}
                onClick={() => setQuantityCount(quantityCount + 1)}
              />
            </div>

            {[...Array(quantityCount)].map((q, i) => {
              return <MultiForms />;
            })}

            {/* Create Item button */}
            <div className={classes.createButtonStyle}>
              <Button
                color="orange"
                radius="xl"
                type="submit"
                style={{ marginBottom: "5em" }}
                onClick={onSubmit}
              >
                Create Item
              </Button>
            </div>
          </div>

          {/* Container for fields on right side of screen */}
          <div>
            {/* Container for Non-Visible Fields Title and Dropdown Icon */}
            <div className={classes.flexStartAndCenter}>
              <h5 style={{ color: "#F76902" }}>Non-visible Fields</h5>
              <IoMdArrowDropdown
                style={{ color: "#F76902", fontSize: "1.3em" }}
                onClick={() => setCheckboxesOpen(!checkboxesOpen)}
              />
            </div>
            {/* Group to hide/show the Available and Active checkboxes */}
            <div style={!checkboxesOpen ? { display: "none" } : undefined}>
              <Checkbox
                label="Available"
                color="orange"
                style={{ paddingBottom: ".5em" }}
              />
              <Checkbox label="Active" color="orange" />
            </div>

            <hr
              style={{
                color: "#F3F3F3",
                opacity: "40%",
                width: "100%",
                marginTop: "2em",
              }}
            />

            {/* Container for Non-Visible Fields Title and Dropdown Icon */}
            <div className={classes.flexStartAndCenter}>
              <h5 style={{ color: "#F76902", paddingRight: "1em" }}>
                Restriction to Class
              </h5>
              <Checkbox
                color="orange"
                onClick={() => setClassRestrictOpen(!classRestrictOpen)}
              />
            </div>
            {/* Group for showing/hiding the first class restriction input field */}
            <div style={!classRestrictOpen ? { display: "none" } : undefined}>
              <TextInput placeholder="XXXX###"></TextInput>
              <h5 className={classes.addClassButton}>Add Class</h5>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewItemForm;
