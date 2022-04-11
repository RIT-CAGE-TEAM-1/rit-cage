// StudentShell.js
// Displays the informational bars on the top and left of the screen

// React Import
import { React } from "react";

// Mantine Component Imports
import { AppShell, Box, Header, Navbar, Text } from "@mantine/core";

// Icon Imports
import { IoPersonCircle } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

// IST Cage Logo
import cage_logo from "../images/ISTCAGE_logo.svg";

// RIT Logo
import rit_logo from "../images/RIT_logo.svg";

// Navigational Imports
import { useNavigate } from "react-router-dom";

// StudentShell({user, children}})
// Takes in "user" to store and check permissions
// Takes in "children" to display content within the component
function StudentShell({ user, children }) {
  const navigate = useNavigate();

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          style={{ backgroundColor: "#F9FAFC" }}
          padding="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          // hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 100, lg: 200 }}
          // for removing the border to the right of the NavBar
          sx={{ borderRight: "none" }}
        >
          {/* IST Cage Logo */}
          <div style={{ paddingBottom: "2em" }}>
            <img
              src={cage_logo}
              alt="IST Cage Icon"
              style={{
                paddingRight: "1em",
                paddingTop: "1em",
                paddingBottom: "2em",
                height: "8%",
              }}
            />
            {/* Hoursa of Operation section */}
            <h3>
              <span style={{ color: "#F76902" }}>Hours</span> <br />
              of Operation
            </h3>
            <hr style={{ width: "1.5em", color: "#F76902", marginLeft: 0 }} />
            <Text>Monday - Friday: 8am-6pm</Text>
            <Text>Saturday: Closed</Text>
            <Text>Sunday: Closed</Text>
          </div>

          {/* Contact Info section */}
          <div>
            <h3>
              <span style={{ color: "#F76902" }}>Contact</span> <br />
              Information
            </h3>
            <hr style={{ width: "1.5em", color: "#F76902", marginLeft: 0 }} />
            {/* Website link to cad website that opens in a new tab */}
            <Text
              style={{
                fontStyle: "italic",
                textDecorationLine: "underline",
              }}
              onClick={() => {
                window.open("https://checkout.cad.rit.edu/");
              }}
            >
              Website
            </Text>
          </div>
        </Navbar>
      }
      // Header Display
      header={
        <Header height={70} sx={{ borderBottom: "none" }}>
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* RIT Logo */}
            <img
              src={rit_logo}
              height={40}
              style={{
                paddingLeft: "3em",
              }}
            />

            {/* Containing Orange Box for user icon, username, and dropdown icon */}
            <Box
              sx={(theme) => ({
                display: "flex",
                backgroundColor: "#F76902",
                color: "#FFFFFF",
                textAlign: "center",
                height: 70,
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 130,
                paddingLeft: theme.spacing.sm,
                paddingRight: theme.spacing.sm,
                borderBottomLeftRadius: 12,
              })}
            >
              {/* Profile Username */}
              <Text color="#FFFFFF">{user.username}</Text>

              {/* Dropdown Icon */}
              <BiLogOut
                size="1.5em"
                style={{ paddingLeft: "2em" }}
                onClick={() => {
                  navigate("/");
                }}
              />
            </Box>
          </div>
        </Header>
      }
    >
      {/* Content Area */}
      {children}
    </AppShell>
  );
}

export default StudentShell;
