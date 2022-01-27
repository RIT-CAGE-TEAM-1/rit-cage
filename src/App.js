import AdminShell from "./Components/AdminShell";
import InventoryList from "./Components/InventoryList";

function App() {
  // const [opened, setOpened] = useState(false);
  // const theme = useMantineTheme();

  return (
    <AdminShell>
      <InventoryList />
    </AdminShell>
  );
}

export default App;
