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
} from "@mantine/core";
import { IoPersonCircle, IoDocumentText } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdInventory2 } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

function AdminShell(props) {
  const [selected, setSelected] = useState("Inventory");

  const elements = [
    {
      name: "Home",
      icon: <AiFillHome style={{ paddingRight: "1em" }} />,
      iconSelected: (
        <AiFillHome style={{ paddingRight: "1em", color: "#F76902" }} />
      ),
    },
    {
      name: "Inventory",
      icon: <MdInventory2 style={{ paddingRight: "1em" }} />,
      iconSelected: (
        <MdInventory2 style={{ paddingRight: "1em", color: "#F76902" }} />
      ),
    },
    {
      name: "Orders",
      icon: <BsList style={{ paddingRight: "1em" }} />,
      selectedIcon: (
        <BsList style={{ paddingRight: "1em", color: "#F76902" }} />
      ),
    },
    {
      name: "Users",
      icon: <FaUsers style={{ paddingRight: "1em" }} />,
      iconSelected: (
        <FaUsers style={{ paddingRight: "1em", color: "#F76902" }} />
      ),
    },
    {
      name: "Help",
      icon: <IoDocumentText style={{ paddingRight: "1em" }} />,
      IoDocumentText: (
        <FaUsers style={{ paddingRight: "1em", color: "#F76902" }} />
      ),
    },
  ];

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
          <div style={{ paddingBottom: "2em" }}>
            <h1>
              <span style={{ color: "#F76902" }}>IST</span> CAGE
            </h1>

            {elements.map((element) =>
              element.name === selected ? (
                <Box
                  sx={(theme) => ({
                    display: "flex",
                    color: "#F76902",
                    textAlign: "center",
                    height: "2.5em",
                    cursor: "pointer",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: 120,
                  })}
                >
                  {/* Icon and Text */}
                  {element.iconSelected}
                  <h3> {element.name} </h3>
                </Box>
              ) : (
                <Box
                  sx={(theme) => ({
                    display: "flex",
                    color: "#333333",
                    textAlign: "center",
                    height: "2.5em",
                    cursor: "pointer",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: 120,
                  })}
                >
                  {/* Icon and Text */}
                  {element.icon}
                  <h3> {element.name} </h3>
                </Box>
              )
            )}
          </div>
        </Navbar>
      }
      header={
        <Header height={70} sx={{ borderBottom: "none" }}>
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
              paddingLeft: ".5em",
              gap: "4em",
            }}
          >
            {/* RIT Logo */}
            <Image src="RIT_Logo.png" width="100%" height={70}></Image>

            {/* Search Bar */}
            <Input
              icon={<AiOutlineSearch />}
              placeholder="Search"
              radius="xl"
              style={{ flexGrow: "2" }}
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
                justifyContent: "flex-start",
                alignItems: "center",
                minWidth: 130,
                paddingLeft: theme.spacing.sm,
                paddingRight: theme.spacing.sm,
              })}
            >
              {/* Person Icon */}
              <IoPersonCircle size="1.5em" style={{ paddingRight: ".5em" }} />

              {/* Profile Username */}
              <Text color="#FFFFFF">Administrator</Text>

              {/* Dropdown Icon */}
              <IoMdArrowDropdown size="1.5em" style={{ paddingLeft: "1em" }} />
            </Box>
          </div>
        </Header>
      }
    >
      {/* Content Area */}
      {props.children}
    </AppShell>
  );
}

export default AdminShell;
