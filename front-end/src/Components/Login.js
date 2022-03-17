import React from "react";
import { useNavigate } from "react-router-dom";

// Mantine UI stuff
import { Box, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/hooks";

// Icons
import { AiOutlineSearch } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      Username: "",
      Password: "",
    },
  });

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
          {/* Container for left items*/}
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
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                style={{ margin: "0", width: "50%" }}
                {...form.getInputProps("Username")}
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
                placeholder="Password"
                style={{ margin: "0", width: "50%" }}
                {...form.getInputProps("Password")}
              />
            </div>

            {/* Login Button */}
            <Button
              color="gray"
              style={{ marginTop: "1.5em" }}
              type="submit"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
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
