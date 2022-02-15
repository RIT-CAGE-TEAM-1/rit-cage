import AdminShell from "./Components/AdminShell";
import InventoryList from "./Components/InventoryList";
import NewItemForm from "./Components/NewItemForm";
import Dashboard from "./Components/Dashboard";
import Documentation from "./Components/Documentation";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";

import api from "./api";
import { useEffect } from "react";

function App() {
  // const [opened, setOpened] = useState(false);
  // const theme = useMantineTheme();

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
      <AdminShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="inventory" element={<InventoryList />} />
          <Route path="create" element={<NewItemForm />} />
          <Route path="help" element={<Documentation />} />
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
      </AdminShell>
    </BrowserRouter>
  );
}

export default App;
