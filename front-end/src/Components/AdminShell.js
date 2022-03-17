import { React, Component } from "react";
import { useState } from "react";

import { AppShell, Box, Header, Navbar, Text, Input } from "@mantine/core";
import { IoPersonCircle } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

import { useLocation, useNavigate } from "react-router-dom";

// Active + Inactive Home Logos
import home_icon from "../images/home_icon.svg";
import home_logo_active from "../images/home_logo_active.svg";

// Active + Inactive Inventory Logos
import inventory_logo from "../images/inventory_logo.svg";
import inventory_logo_active from "../images/inventory_logo_active.svg";

// Active + Inactive Orders Logos
import orders_icon from "../images/orders_icon.svg";
import orders_icon_active from "../images/orders_icon_active.svg";

// Active + Inactive Users Logos
import users_icon from "../images/users_icon.svg";
import users_icon_active from "../images/users_icon_active.svg";

// Active + Inactive Help Logos
import help_icon from "../images/help_icon.svg";
import help_icon_active from "../images/help_icon_active.svg";

// IST Cage Logo
import cage_logo from "../images/ISTCAGE_logo.svg";

// RIT Logo
import rit_logo from "../images/RIT_logo.svg";

// navBar for admin
function AdminShell(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const navOptions = [
    {
      name: "Home",
      pathname: "/dashboard",
      icon: (
        <img
          src={home_icon}
          alt="Home Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
      iconSelected: (
        <img
          src={home_logo_active}
          alt="Active Home Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
    },
    {
      name: "Inventory",
      pathname: "/inventory",
      icon: (
        <img
          src={inventory_logo}
          alt="Inventory Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
      iconSelected: (
        <img
          src={inventory_logo_active}
          alt="Active Inventory Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
    },
    {
      name: "Orders",
      pathname: "/orders",
      icon: (
        <img
          src={orders_icon}
          alt="Orders Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
      iconSelected: (
        <img
          src={orders_icon_active}
          alt="Active Orders Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
    },
    {
      name: "Users",
      pathname: "/users",
      icon: (
        <img
          src={users_icon}
          alt="Users Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
      iconSelected: (
        <img
          src={users_icon_active}
          alt="Active Users Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
    },
    {
      name: "Help",
      pathname: "/help",
      icon: (
        <img
          src={help_icon}
          alt="Help Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
      iconSelected: (
        <img
          src={help_icon_active}
          alt="Active Help Icon"
          style={{ paddingRight: "1em", width: "24px", height: "24px" }}
        />
      ),
    },
    {
      pathname: "/",
    },
  ];

  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="lg"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          style={{ backgroundColor: "#F9FAFC" }}
          padding="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="lg"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 100, lg: 200 }}
          // for removing the border to the right of the NavBar
          sx={{ borderRight: "none" }}
        >
          <div style={{ paddingBottom: "2em", alignItems: "center" }}>
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

            {navOptions.map((navOption) => (
              <div
                onClick={() => {
                  navigate(navOption.pathname);
                }}
              >
                {navOption.pathname === location.pathname ? (
                  <Box
                    sx={(theme) => ({
                      display: "flex",
                      color: "#F76902",
                      textAlign: "center",
                      paddingBottom: ".5em",
                      height: "2.5em",
                      cursor: "pointer",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: 120,
                    })}
                  >
                    {/* Icon and Text */}
                    {navOption.iconSelected}
                    <h3> {navOption.name} </h3>
                  </Box>
                ) : (
                  <Box
                    sx={(theme) => ({
                      display: "flex",
                      color: "#333333",
                      textAlign: "center",
                      paddingBottom: ".5em",
                      height: "2.5em",
                      cursor: "pointer",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: 120,
                    })}
                  >
                    {/* Icon and Text */}
                    {navOption.icon}
                    <h3> {navOption.name} </h3>
                  </Box>
                )}
              </div>
            ))}
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
