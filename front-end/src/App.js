import { useState } from "react";
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Header,
  Image,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IoPersonCircle } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

function App() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          padding="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 300, lg: 400 }}
        >
          <Text>Application navbar</Text>
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
            }}
          >
            <Image src="RIT_Logo.png" width="100%" height={70}></Image>

            <Box
              sx={(theme) => ({
                display: "flex",
                backgroundColor: "#F76902",
                color: "#FFFFFF",
                textAlign: "center",
                height: 70,
                cursor: "pointer",
                justifyContent: "space-between",
                alignItems: "center",
                width: 120,
                paddingLeft: theme.spacing.sm,
                paddingRight: theme.spacing.sm,
              })}
            >
              {/* Person Icon */}
              <IoPersonCircle size="1.5em" />

              {/* Profile Username */}
              <Text color="#FFFFFF">xyz6942</Text>

              {/* Dropdown Icon */}
              <IoMdArrowDropdown size="1.5em" paddingR />
            </Box>
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}

export default App;
