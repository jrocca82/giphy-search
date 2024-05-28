import "./App.css";
import GiphyGrid from "./components/ImageGrid/GiphyGrid/GiphyGrid";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<div className="app-wrapper">
			<div className="title-wrapper">
				<h1>Jo is Super Awesome</h1>
				<h4>This is her awesome GIF search site</h4>
			</div>
			<QueryClientProvider client={queryClient}>
				<div className="grid-wrapper">
					<GiphyGrid />
				</div>
			</QueryClientProvider>
		</div>
	);
}

export default App;
