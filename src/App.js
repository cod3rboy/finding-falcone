import PageSwitch from "./Components/PageSwitch";
import Home from "./Pages/Home";

function App() {
	return (
		<PageSwitch entry="home">
			<Home name="home" />
		</PageSwitch>
	);
}

export default App;
