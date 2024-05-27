import { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { GiphyResponse } from "./types/GiphyResponse";
import GiphyGrid from "./components/ImageGrid/GiphyGrid/GiphyGrid";
import { testData } from "./constants/testData";
import SearchBar from "./components/SearchBar";

function App() {
	const [images, setImages] = useState<GiphyResponse[]>(testData);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [gridTitle, setGridTitle] = useState<string>("Trending");
	const loader = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const limit = 9;
	const offset = images.length;

	useEffect(() => {
		const fetchSearchData = async () => {
			// Search through test images if being rate limited
			if (images === testData) {
				const filteredImages = images.filter((item) =>
					item.title.includes(searchQuery)
				);
				setImages(filteredImages);
			}
			try {
				const { data } = await axios.get(
					`https://api.giphy.com/v1/gifs/search?api_key=${
						import.meta.env.VITE_GIPHY_API_KEY
					}&q=${searchQuery}&limit=${limit}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`
				);
				setImages(data.data);
			} catch (e) {
				// @ts-expect-error-- display message or prompt to check logs
				setError(e?.message ?? "Unknown Error, please check logs.");
				console.error(e);
			}
		};

		const fetchTrendingData = async () => {
			try {
				const { data } = await axios.get(
					`https://api.giphy.com/v1/gifs/trending?api_key=${
						import.meta.env.VITE_GIPHY_API_KEY
					}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`
				);
				setImages(data.data);
			} catch (e) {
				setImages(testData);
				// @ts-expect-error-- display message or prompt to check logs
				setError(e?.message ?? "Unknown Error, please check logs.");
				console.error(e);
			}
		};

		if (searchQuery && searchQuery !== "") {
			setIsLoading(true);
			setGridTitle(`Results for ${searchQuery}`);
			fetchSearchData();
			setIsLoading(false);
		} else {
			setIsLoading(true);
			setGridTitle("Trending");
			fetchTrendingData();
			setIsLoading(false);
		}
	}, [offset, searchQuery]);

	return (
		<div className="app-wrapper">
			<h1>Super Cool Gifs</h1>
			<div className="grid-wrapper">
				<h2>{gridTitle}</h2>
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</div>
			<GiphyGrid
				images={images}
				isLoading={isLoading}
				error={error}
				loader={loader}
			/>
		</div>
	);
}

export default App;
