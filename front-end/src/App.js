import AdminShell from "./Components/AdminShell";
import InventoryList from "./Components/InventoryList";
import NewItemForm from "./Components/NewItemForm";

function App() {
  // const [opened, setOpened] = useState(false);
  // const theme = useMantineTheme();

  return (
    <AdminShell>
      <NewItemForm />
    </AdminShell>
  );
}

export default App;
