// Login.js
// Displays the login page upon site entry

// React Import
import React, { useEffect, useState } from "react";

// Navigational Links
import { useNavigate } from "react-router-dom";

// Mantine Component Imports
import { Box, TextInput, Button } from "@mantine/core";

// Mantine Hooks Import
import { useForm } from "@mantine/hooks";

// Icon Import
import { AiOutlineSearch } from "react-icons/ai";

// API Import
import api from "../api/api";

// Login({setRole, setUser})
// Upon login, sets the user and  their role to track accesssible pages
function Login({ setRole, setUser }) {
  // Const for site navigation
  const navigate = useNavigate();

  // Const for stating initial form values and replacing them
  const form = useForm({
    initialValues: {
      Username: "",
      Password: "",
    },
  });

  // const for determing if to display error for login items
  const [validLogin, setValidLogin] = useState(false);

  // const loginUser
  // Posts username to DB to check if can access
  // Directs user to specific page depeneding on role type
  const loginUser = async (username) => {
    try {
      const response = await api.post("/users/login", { username: username });
      setRole(response.data.user.role);
      setUser(response.data.user);
      console.log("Logged in user: " + JSON.stringify(response.data.user.role));
      if (response.data.user.role === "student") {
        navigate("/studentList");
      } else if (response.data.user.role === "employee") {
        navigate("/dashboard");
      } else if (response.data.user.role === "professor") {
        navigate("/facultyInventory");
      } else if (
        response.data.user.role !== "professor" &&
        response.data.user.role !== "employee" &&
        response.data.user.role !== "student"
      ) {
        setValidLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          backgroundColor: "#F76902",
          color: "white",
          textAlign: "center",
          padding: theme.spacing.sm,
        })}
      >
        {/* Container for all top banner items */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* Container for RIT Text*/}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontWeight: "300", margin: "0" }}> RIT </h1>
            <h1 style={{ fontWeight: "300", paddingLeft: ".5em", margin: "0" }}>
              |
            </h1>
            <h3 style={{ fontWeight: "300", paddingLeft: ".5em", margin: "0" }}>
              Rochester Institute of Technology
            </h3>
          </div>

          {/* Container for Directiories link */}
          <div>
            <h3 style={{ fontWeight: "300", paddingLeft: ".5em", margin: "0" }}>
              Directories
            </h3>
          </div>

          {/* Container for search bar */}
          <div>
            <TextInput
              placeholder="Search"
              icon={<AiOutlineSearch size={14} />}
              style={{ margin: "0" }}
            />
          </div>
        </div>
      </Box>

      {/* Container for login content */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: "lightgrey",
            textAlign: "center",
            padding: theme.spacing.xl,
            width: "75%",
          })}
          style={{
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          {/* Form for submitting username and password */}
          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values);
              loginUser(values.Username);
            })}
          >
            <h1 style={{ fontWeight: "300", margin: "0" }}> RIT Login </h1>
            <h3
              style={{
                fontWeight: "300",
                paddingLeft: ".5em",
                margin: "0",
                marginTop: ".5em",
              }}
            >
              Login to www.rit.edu
            </h3>
            {/* Container for username title and input field */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "1em",
              }}
            >
              <h3
                style={{
                  fontWeight: "300",
                  paddingRight: ".5em",
                  margin: "0",
                }}
              >
                Username
              </h3>
              <TextInput
                placeholder="Username"
                id="Username_Input_Field"
                style={{
                  margin: "0",
                  width: "50%",
                }}
                {...form.getInputProps("Username")}
                required
              />
            </div>
            {/* Container for password title and input field */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "1em",
              }}
            >
              <h3
                style={{
                  fontWeight: "300",
                  paddingRight: ".5em",
                  margin: "0",
                }}
              >
                Password
              </h3>
              <TextInput
                type="password"
                placeholder="Password"
                style={{ margin: "0", width: "50%" }}
                {...form.getInputProps("Password")}
              />
            </div>

            {/* Login Button */}
            <Button color="gray" style={{ marginTop: "1.5em" }} type="submit">
              Login
            </Button>

            {/* Container for forgot username and password */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1em",
              }}
            >
              {/* Container for items next to each other */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <h3
                  style={{
                    fontWeight: "300",
                    paddingLeft: ".5em",
                    margin: "0",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Forgot Username?
                </h3>
                <h3
                  style={{
                    fontWeight: "300",
                    paddingLeft: ".5em",
                    margin: "0",
                  }}
                >
                  |
                </h3>
                <h3
                  style={{
                    fontWeight: "300",
                    paddingLeft: ".5em",
                    margin: "0",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </h3>
              </div>
            </div>

            <h3
              style={{
                fontWeight: "300",
                paddingLeft: ".5em",
                marginTop: ".5em",
                marginBottom: "0",
              }}
            >
              Need assistance? Please contact the ITS Service Desk at
            </h3>

            <h3
              style={{
                fontWeight: "300",
                paddingLeft: ".5em",
                marginTop: ".5em",
              }}
            >
              {/* Contact Info */}
              <span style={{ color: "blue", cursor: "pointer" }}>
                585-475-HELP [4375]
              </span>{" "}
              or visit{" "}
              <span style={{ color: "blue", cursor: "pointer" }}>
                help.rit.edu
              </span>
            </h3>
          </form>
        </Box>
      </div>
    </>
  );
}

export default Login;
