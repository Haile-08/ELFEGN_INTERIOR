import AppProvider from "./Provider/AppProvider";
import Routes from "./routes/routes";

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
