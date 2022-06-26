import PageSwitch from "./Components/PageSwitch";
import Home from "./Pages/Home";
import Result from "./Pages/Result";

function App() {
  return (
    <PageSwitch entry="home">
      <Home name="home" />
      <Result name="result" />
    </PageSwitch>
  );
}

export default App;
