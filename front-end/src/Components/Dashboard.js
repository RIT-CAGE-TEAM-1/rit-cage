import { React } from "react";
import { createStyles, Button } from "@mantine/core";
import { RiArrowDropDownLine } from "react-icons/ri";

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    flexSpaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    flexStartAndCenter: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  };
});

function Dashboard() {
  // items for getting the current month and day
  const locale = "en";
  const d = new Date();
  const weekDay = d.toLocaleDateString(locale, { weekday: "long" });
  const month = d.toLocaleDateString(locale, { month: "long" });
  const date = d.getDate();

  const { classes } = useStyles();

  return (
    <>
      <h1
        style={{
          color: "#F76902",
          margin: 0,
          paddingLeft: ".5em",
          paddingBottom: ".2em",
        }}
      >
        Today
      </h1>
      {/* h3 tag that displays the current month and day */}
      <h3
        style={{
          color: "#F76902",
          margin: 0,
          paddingLeft: "1em",
          paddingBottom: "1em",
        }}
      >
        {weekDay + ", " + month + " " + date}
      </h3>

      {/* Flex container for Upcoming Reservations title and dropdown, and "Reserve Item" button and "Item Return" button */}
      <div className={classes.flexSpaceBetween}>
        {/* Upcoming Reservations Dropdown title and icon */}
        <div className={classes.flexStartAndCenter} style={{ width: "100%" }}>
          <h3 style={{ paddingLeft: "1em" }}>Upcoming Reservations</h3>
          <RiArrowDropDownLine size={25} />
        </div>

        {/* "Reserve Item" and "Item Return" button */}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="outline"
            color="orange"
            style={{ boxShadow: "0px 3px 6px #D3D3D3", marginRight: "1.5em" }}
          >
            Report Incident
          </Button>
          <Button
            variant="outline"
            color="dark"
            style={{ boxShadow: "0px 3px 6px #D3D3D3", marginRight: "1.5em" }}
          >
            Item Return
          </Button>
        </div>
      </div>

      <hr style={{ width: "97.5%", color: "#F3F3F3", opacity: "40%" }} />

      {/* Flex container for Overdue Items title and dropdown */}
      <div className={classes.flexStartAndCenter} style={{ width: "100%" }}>
        <h3 style={{ paddingLeft: "1em" }}>Overdue Items</h3>
        <RiArrowDropDownLine size={25} />
      </div>

      {/* Flex container for left and right items*/}
      <div
        className={classes.flexSpaceBetween}
        style={{
          marginLeft: "1em",
          borderTop: "1px solid #333333",
          borderBottom: "1px solid #333333",
          width: "98%",
        }}
      >
        {/* Flex column for items on the left */}
        <div>
          <div style={{ flexDirection: "column", paddingRight: "1em" }}>
            {/* Container for items above the graph*/}
            <div
              style={{
                paddingLeft: "2em",
                paddingRight: "1em",
              }}
            >
              <div className={classes.flexStartAndCenter}>
                <h4
                  style={{
                    fontWeight: "100",
                    paddingRight: ".5em",
                    marginBottom: "0",
                    marginTop: "0",
                  }}
                >
                  Orders
                </h4>
                <RiArrowDropDownLine />
              </div>
              <h1 style={{ marginTop: "0", marginBottom: "0" }}>18</h1>
              <h6
                style={{
                  marginTop: "0",
                  fontWeight: "100",
                  paddingLeft: ".5em",
                }}
              >
                3:00PM
              </h6>
            </div>
            {/* Container for Graph */}
            <div
              style={{
                paddingLeft: "2em",
                paddingBottom: ".5em",
                paddingRight: "1em",
              }}
            >
              <div className={classes.flexStartAndCenter}></div>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        {/* Flex column for items on the right */}
        <div style={{ flexDirection: "column", paddingRight: "1em" }}>
          {/* Container for Active Rentees box */}
          <div
            style={{
              paddingLeft: "2em",
              paddingBottom: ".5em",
              paddingRight: "1em",
              borderLeft: "1px solid #333333",
            }}
          >
            <div className={classes.flexStartAndCenter}>
              <h4
                style={{
                  fontWeight: "100",
                  paddingRight: "2em",
                  marginBottom: "0",
                }}
              >
                Active Rentees
              </h4>
              <h4 style={{ fontWeight: "100", marginBottom: "0" }}>View</h4>
            </div>
            <h1 style={{ marginTop: "0" }}>194</h1>
          </div>
          {/* Container for Rented Items box */}
          <div
            style={{
              paddingLeft: "2em",
              paddingBottom: ".5em",
              paddingRight: "1em",
              borderTop: "1px solid #333333",
              borderLeft: "1px solid #333333",
            }}
          >
            <div className={classes.flexStartAndCenter}>
              <h4
                style={{
                  fontWeight: "100",
                  paddingRight: "2em",
                  marginBottom: "0",
                }}
              >
                Rented Items
              </h4>
              <h4 style={{ fontWeight: "100", marginBottom: "0" }}>View</h4>
            </div>
            <h1 style={{ marginTop: "0" }}>54</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
