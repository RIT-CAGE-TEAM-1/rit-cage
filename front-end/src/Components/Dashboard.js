import { React, useState, useEffect } from "react";
import { createStyles, Button, Table, Select } from "@mantine/core";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Other Components
import AdminShell from "./AdminShell";

// Api import for base URL
import api from "../api/api";

// ChartJS Graphs and Elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  // getting dashboard statistics and data
  const [elements, setElements] = useState([]);

  const getOverdueItems = async () => {
    try {
      const response = await api.get("/dashboard");
      setElements(response.data.overdueItems);
      console.log("Dashboard Statistics: " + JSON.stringify(response.data));
    } catch (error) {
      console.log("ERROR IN getAvailableItem: " + error);
    }
  };

  // getting active rentees
  const [numActiveRentees, setNumActiveRentees] = useState("0");

  const getActiveRentees = async () => {
    try {
      const response = await api.get("/dashboard");
      setNumActiveRentees(response.data.activeRentees);
    } catch (error) {
      console.log("ERROR IN getAvailableItem: " + error);
    }
  };

  // getting rented items
  const [numRentedItems, setNumRentedItems] = useState("0");

  const getRentedItems = async () => {
    try {
      const response = await api.get("/dashboard");
      setNumRentedItems(response.data.rentedItems);
    } catch (error) {
      console.log("ERROR IN getAvailableItem: " + error);
    }
  };

  // Upcoming Reservations data
  const [URElements, setURElements] = useState([]);

  const getUpcomingReservations = async () => {
    try {
      const response = await api.get("/dashboard");
      setURElements(response.data.upcomingReservations);
    } catch (error) {
      console.log("ERROR IN getAvailableItem: " + error);
    }
  };

  // Frequently Reserved Items data
  const [freqResItems, setFreqResItems] = useState([]);

  const getFreqResItems = async () => {
    try {
      const response = await api.get("/dashboard");
      setFreqResItems(response.data.frequentlyReservedItems);
    } catch (error) {
      console.log("ERROR IN getAvailableItem: " + error);
    }
  };

  useEffect(() => {
    getOverdueItems();
    getActiveRentees();
    getRentedItems();
    getUpcomingReservations();
    getFreqResItems();
  }, []);

  // Code for rows for Overdue Items
  const rows = elements.map((element, index) => (
    <tr key={`${index}`}>
      <td>{element.reservation_date}</td>
      <td>{element.model_name}</td>
      <td>{element.serial}</td>
      <td>{element.item_condition}</td>
      <td>{element.username}</td>
    </tr>
  ));

  // items for getting the current month and day
  const locale = "en";
  const d = new Date();
  const weekDay = d.toLocaleDateString(locale, { weekday: "long" });
  const month = d.toLocaleDateString(locale, { month: "long" });
  const date = d.getDate();
  const labels = ["12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM"];

  const [upcomingReservesOpen, setUpcomingReservesOpen] = useState(false);
  const [overdueItemsOpen, setOverdueItemsOpen] = useState(false);

  // classes styling
  const { classes } = useStyles();

  // Hard coded data for line graphs
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#F76902",
        borderColor: "#F76902",
        data: [0, 52, 5, 2, 20, 30, 45],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "graph",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  // Hard coded data for bar graph
  const barData = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#F76902",
        borderColor: "#F76902",
        data: [0, 52, 5, 2, 20, 30, 45],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "graph",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <AdminShell>
        <h1
          style={{
            color: "#F76902",
            margin: 0,
            paddingLeft: ".5em",
            paddingBottom: ".2em",
            width: "96%",
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
            width: "96%",
          }}
        >
          {weekDay + ", " + month + " " + date}
        </h3>

        {/* Flex container for Upcoming Reservations title and dropdown, and "Reserve Item" button and "Item Return" button */}
        <div className={classes.flexSpaceBetween} style={{ width: "98%" }}>
          {/* Upcoming Reservations Dropdown title and icon */}
          <div className={classes.flexStartAndCenter}>
            <h3 style={{ paddingLeft: "1em" }}>Upcoming Reservations</h3>
            <RiArrowDropDownLine
              size={25}
              onClick={() => setUpcomingReservesOpen(!upcomingReservesOpen)}
            />
          </div>

          {/* "Reserve Item" and "Item Return" button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

        {/* Container to show/hide contents of the Upcoming Reservaions table rows */}
        <div style={!upcomingReservesOpen ? { display: "none" } : undefined}>
          {/* <URTable /> */}
        </div>

        <hr
          style={{
            width: "96%",
            color: "#F3F3F3",
            opacity: "40%",
            marginRight: "2.5em",
          }}
        />

        {/* Flex container for Overdue Items title and dropdown */}
        <div className={classes.flexStartAndCenter}>
          <h3 style={{ paddingLeft: "1em" }}>Overdue Items</h3>
          <RiArrowDropDownLine
            size={25}
            onClick={() => setOverdueItemsOpen(!overdueItemsOpen)}
          />
        </div>

        {/* Container to show/hide contents of the Overdue Items table rows */}
        <div style={!overdueItemsOpen ? { display: "none" } : undefined}>
          {/* <URTable /> */}
          <Table
            highlightOnHover
            style={{
              marginLeft: "1em",
              width: "97%",
              marginBottom: "2em",
            }}
          >
            <thead>
              <tr>
                <th>Reservation Time</th>
                <th>Model Name</th>
                <th>Serial Number</th>
                <th>Condition</th>
                <th>Rentee</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>

        {/* Flex container for left and right items*/}
        <div
          className={classes.flexSpaceBetween}
          style={{
            marginLeft: "1em",
            borderTop: "1px solid #ACACAC",
            borderBottom: "1px solid #ACACAC",
            width: "97%",
          }}
        >
          {/* Flex column for items on the left */}
          <div style={{ width: "80%" }}>
            <div style={{ flexDirection: "column", paddingRight: "1em" }}>
              {/* Container for items above the graph*/}
              <div className={classes.flexStartAndCenter}>
                {/* Orders group */}
                <div>
                  <div
                    className={classes.flexStartAndCenter}
                    style={{ paddingTop: "1em" }}
                  >
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

                <div style={{ paddingLeft: "2em" }}>
                  <div className={classes.flexStartAndCenter}>
                    <h4
                      style={{
                        fontWeight: "100",
                        paddingRight: ".5em",
                        marginBottom: "0",
                        marginTop: "0",
                      }}
                    >
                      Yesterday
                    </h4>
                    <RiArrowDropDownLine />
                  </div>
                  <h1 style={{ marginTop: "0" }}>25</h1>
                </div>
              </div>

              {/* Container for Graph */}
              <div
                style={{
                  paddingLeft: "2em",
                  paddingBottom: ".5em",
                  paddingRight: "1em",
                  paddingTop: "1em",
                  width: "96%",
                  borderTop: "1px solid #ACACAC",
                }}
              >
                <Line options={options} data={data} />
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/* Flex column for items on the right */}
          <div
            style={{
              flexDirection: "column",
              paddingRight: "1em",
              width: "20%",
            }}
          >
            {/* Container for Active Rentees box */}
            <div
              style={{
                paddingLeft: "2em",
                paddingBottom: ".5em",
                paddingRight: "1em",
                borderLeft: "1px solid #ACACAC",
              }}
            >
              <div
                className={classes.flexStartAndCenter}
                style={{ paddingTop: "1em" }}
              >
                <h4
                  style={{
                    fontWeight: "100",
                    paddingRight: "2em",
                    paddingBottom: "0",
                  }}
                >
                  Active Rentees
                </h4>
                <h4 style={{ fontWeight: "100", paddinginBottom: "0" }}>
                  View
                </h4>
              </div>
              <h1 style={{ marginTop: "0" }}>{numActiveRentees.count}</h1>
            </div>
            {/* Container for Rented Items box */}
            <div
              style={{
                paddingLeft: "2em",
                paddingBottom: ".5em",
                paddingRight: "1em",
                paddingTop: "1em",
                borderTop: "1px solid #ACACAC",
                borderLeft: "1px solid #ACACAC",
              }}
            >
              <div className={classes.flexStartAndCenter}>
                <h4
                  style={{
                    fontWeight: "100",
                    paddingRight: "2em",
                    paddingBottom: "0",
                  }}
                >
                  Rented Items
                </h4>
                <h4 style={{ fontWeight: "100", paddinginBottom: "0" }}>
                  View
                </h4>
              </div>
              <h1 style={{ marginTop: "0" }}>{numRentedItems.count}</h1>
            </div>
          </div>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/* Reports Section */}
        <div>
          <h1
            style={{
              color: "#333333",
              margin: 0,
              paddingLeft: ".5em",
              paddingBottom: ".2em",
              paddingTop: "2em",
            }}
          >
            Reports
          </h1>

          <Select
            style={{
              paddingLeft: "1em",
              width: "12%",
              paddingBottom: "1em",
            }}
            placeholder="Pick one"
            data={[
              { value: "allTime", label: "All Time" },
              { value: "last24", label: "Last 24 Hours" },
              { value: "lastWeek", label: "Last Week" },
              { value: "lastMonth", label: "Last Month" },
            ]}
          />
        </div>

        {/* Flex container for left and right items*/}
        <div
          className={classes.flexSpaceBetween}
          style={{
            marginLeft: "1em",
            borderTop: "1px solid #ACACAC",
            borderBottom: "1px solid #ACACAC",
            marginBottom: "2em",
            marginRight: "2em",
          }}
        >
          {/* Flex column for items on the left */}
          <div style={{ width: "48%" }}>
            <div style={{ flexDirection: "column" }}>
              <h3 style={{ fontWeight: "100", paddingLeft: "2em" }}>
                Peak Reservation Hours
              </h3>
              {/* Container for Graph */}
              <div
                style={{
                  paddingLeft: "1em",
                  paddingBottom: ".5em",
                  paddingTop: "1em",
                }}
              >
                <Line options={options} data={data} />
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/* Flex column for items on the right */}
          <div
            style={{
              flexDirection: "column",
              paddingRight: "1em",
              width: "50%",
              borderLeft: "1px solid #ACACAC",
            }}
          >
            {/* Container for top right bar Graph */}
            <div
              style={{
                flexDirection: "column",
                paddingRight: "1em",
                borderBottom: "1px solid #ACACAC",
              }}
            >
              <h3 style={{ fontWeight: "100", paddingLeft: "2em" }}>
                Frequently Reserved Items
              </h3>
              <div
                style={{
                  paddingLeft: "2em",
                  paddingBottom: ".5em",
                  paddingRight: "1em",
                  paddingTop: "1em",
                }}
              >
                <Bar options={barOptions} data={barData} />
              </div>
            </div>
          </div>
        </div>
      </AdminShell>
    </>
  );
}

export default Dashboard;
