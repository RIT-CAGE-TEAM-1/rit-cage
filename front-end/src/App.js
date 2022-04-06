import InventoryList from "./Components/InventoryList";
import NewItemForm from "./Components/NewItemForm";
import Dashboard from "./Components/Dashboard";
import Documentation from "./Components/Documentation";
import ItemSummary from "./Components/ItemSummary";
import CheckoutList from "./Components/CheckoutList";
import CheckoutItemSummary from "./Components/CheckoutItemSummary";
import Login from "./Components/Login";

import { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import api from "./api/api";
import { useEffect } from "react";
import CheckoutConfiirmation from "./Components/CheckoutConfirmation";
import Cart from "./Components/Cart";
import FacultyList from "./Components/FacultyList";

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
    <BrowserRouter>
      <Routes>
        {/* Global Login */}
        <Route
          path="/"
          element={<Login setRole={setRole} setUser={setUser} />}
        />
        {/* {role === "employee" && ( */}
        <>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<InventoryList />} />
          <Route path="create" element={<NewItemForm />} />
          <Route path="help" element={<Documentation />} />
          <Route path="inventory/summary/:id" element={<ItemSummary />} />
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
  );
}

export default App;
