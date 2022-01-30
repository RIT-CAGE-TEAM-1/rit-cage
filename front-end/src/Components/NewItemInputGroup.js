import { useState } from "react";
import { createStyles, Input, Textarea } from "@mantine/core";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiFillInfoCircle } from "react-icons/ai";

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
    // addDescButton: {
    //   paddingLeft: "1.5em",
    //   marginBottom: "0",
    //   marginTop: "1em",
    //   textDecoration: "underline",
    //   cursor: "pointer",
    //   color: "#333333",
    //   fontWeight: "500",
    // },
    createButtonStyle: {
      paddingLeft: "1em",
      marginTop: "1.5em",
    },
    flexStartAndCenter: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    // descBoxStyle: {
    //   paddingLeft: "3em",
    //   width: "30%",
    // },
  };
});

// Component for an input field with a title and information bubble
function NewItemInputGroup(props) {
  const { inputTitle, options, inputStyles } = props;
  const { classes } = useStyles();
  // const [descBoxOpen, setDescBoxOpen] = useState(false);

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
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Input>
      {/* <h5
        size="xs"
        className={classes.addDescButton}
        onClick={() => setDescBoxOpen(!descBoxOpen)}
      >
        Add Description
      </h5>
      <Textarea
        label="Description"
        className={classes.descBoxStyle}
        style={!descBoxOpen ? { display: "none" } : undefined}
      /> */}
    </>
  );
}

export default NewItemInputGroup;
