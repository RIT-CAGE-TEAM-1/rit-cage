import AdminShell from "./Components/AdminShell";
import InventoryList from "./Components/InventoryList";
import NewItemForm from "./Components/NewItemForm";

import api from "./api";
import { useEffect } from "react";

function App() {
  // const [opened, setOpened] = useState(false);
  // const theme = useMantineTheme();

  useEffect(() => {
    testApi();
  });

  const testApi = async () => {
    try {
      const response = await api.get("/test");

      console.log("RESPONSE: " + response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminShell>
      <NewItemForm />
    </AdminShell>
  );
}

export default App;
