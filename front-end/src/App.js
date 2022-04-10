import InventoryList from "./Components/InventoryList";
import NewItemForm from "./Components/NewItemForm";
import Dashboard from "./Components/Dashboard";
import Documentation from "./Components/Documentation";
import ItemSummary from "./Components/ItemSummary";
import CheckoutList from "./Components/CheckoutList";
import CheckoutItemSummary from "./Components/CheckoutItemSummary";
import Login from "./Components/Login";
import CheckoutConfiirmation from "./Components/CheckoutConfirmation";
import Cart from "./Components/Cart";
import FacultyList from "./Components/FacultyList";
import UserList from "./Components/UserList";
import AllReservations from "./Components/AllReservations";
import { Provider } from "./Context/Context";

import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import api from "./api/api";

import { GlobalProvider } from "./Context/GlobalState";
import FacultyCart from "./Components/FacultyCart";

function App() {
  const [role, setRole] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    testApi();
  }, []);

  const testApi = async () => {
    try {
      const response = await api.get("/test");

      console.log("RESPONSE: " + response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          {/* Global Login */}
          <Route
            path="/"
            element={<Login setRole={setRole} setUser={setUser} />}
          />
          {/* {role === "employee" && ( */}
          <>
            <Route path="dashboard" element={<Dashboard user={user} />} />
            <Route path="inventory" element={<InventoryList user={user} />} />
            <Route path="create" element={<NewItemForm user={user} />} />
            <Route path="users" element={<UserList user={user} />} />
            <Route path="orders" element={<AllReservations user={user} />} />
            <Route path="help" element={<Documentation user={user} />} />
            <Route
              path="inventory/summary/:id"
              element={<ItemSummary user={user} />}
            />
          </>
          {/* )} */}

          {/* Student Pages */}
          {/* {role === "student" && ( */}
          <>
            <Route path="studentList" element={<CheckoutList user={user} />} />
            <Route
              path="studentList/checkoutForm/:id"
              element={<CheckoutItemSummary user={user} />}
            />
            <Route
              path="/checkoutConfirmation"
              element={<CheckoutConfiirmation user={user} />}
            />
            <Route path="cart" element={<Cart user={user} />} />
          </>
          {/* )} */}

          {/* Faculty Pages */}
          {/* {role === "professor" && ( */}
          <>
            <Route
              path="facultyInventory"
              element={<FacultyList user={user} />}
            />
            <Route path="facultyCart" element={<FacultyCart user={user} />} />
          </>
          {/* )} */}

          {/* No match route */}
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Not implemented yet</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
