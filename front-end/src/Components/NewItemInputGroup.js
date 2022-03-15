import { useState } from "react";
import { createStyles, Input, Select } from "@mantine/core";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiFillInfoCircle } from "react-icons/ai";
import { useForm } from "@mantine/hooks";

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    inputLabel: {
      paddingLeft: "1.5em",
      fontWeight: "500",
      marginBottom: "1em",
    },
    inputBoxStyle: {
      paddingLeft: "1.3em",
      width: "80%",
    },
    createButtonStyle: {
      paddingLeft: "1em",
      marginTop: "1.5em",
    },
    flexStartAndCenter: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  };
});

// Component for an input field with a title and information bubble
function NewItemInputGroup(props) {
  const { inputTitle, options, inputStyles, form } = props;
  const { classes } = useStyles();

  // const data = options.map((option) => ({
  //   value: { option },
  //   label: "huh",
  // }));

  return (
    <>
      {/* Container for Input title and information bubble */}
      <div className={classes.flexStartAndCenter}>
        <h5 className={classes.inputLabel}>{inputTitle}</h5>
        <AiFillInfoCircle
          style={{ color: "#F76902", paddingTop: ".5em", paddingLeft: ".3em" }}
        />
      </div>
      {/* Input Field for component */}
      <Input
        component="select"
        rightSection={<RiArrowDropDownLine />}
        className={classes.inputBoxStyle}
        style={inputStyles}
        {...form.getInputProps(inputTitle)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Input>
    </>
  );
}

export default NewItemInputGroup;
