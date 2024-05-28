import "./GiphyGrid.css";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { GiphyResponse } from "../../../types/GiphyResponse";
import axios from "axios";
import BaseGridItem from "../BaseGridItem/BaseGridItem";
import SearchBar from "../../SearchBar";
import { useFavoritesStore } from "../../../stores/favoritesStore";

const GiphyGrid = () => {
	const [limit, setLimit] = useState<number>(9);
	const [offset, setOffset] = useState<number>(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [viewFavoritesOnly, setViewFavoritesOnly] = useState<boolean>(false);
	const { favorites } = useFavoritesStore();

	const fetchGifs = async (searchQuery: string) => {
		const apiUrl = searchQuery
			? `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${searchQuery}&limit=${limit}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`
			: `https://api.giphy.com/v1/gifs/trending?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`;

		try {
			const { data } = await axios.get(apiUrl);
			return data.data;
		} catch (e) {
			console.log(e);
		}
	};

	const { data, status, isPreviousData }: UseQueryResult<Array<GiphyResponse>> =
		useQuery(
			["gifs", searchQuery, limit, offset],
			() => fetchGifs(searchQuery),
			{
				keepPreviousData: true,
			}
		);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setOffset(0); // Reset offset when search changes
	};

	const dataToShow = viewFavoritesOnly ? favorites : data;

	if (status === "loading") return <div>Loading...</div>;
	if (status === "error") return <div>Error</div>;

	return (
		<div>
			<div>
				{!viewFavoritesOnly && <SearchBar onSearch={handleSearch} />}
				{viewFavoritesOnly ? (
					<h2>My Favorites</h2>
				) : (
					<h2>
						Showing results for: {searchQuery === "" ? "Trending" : searchQuery}
					</h2>
				)}
				{favorites.length > 0 && (
					<button onClick={() => setViewFavoritesOnly((v) => !v)}>
						{viewFavoritesOnly ? "View All" : "My Favorites"}
					</button>
				)}
			</div>
			<div className="grid">
				{dataToShow?.map((item: GiphyResponse) => (
					<BaseGridItem key={item.id} gif={item} />
				))}
			</div>
			{!viewFavoritesOnly && (
				<div className="button-wrapper">
					<button
						disabled={limit === 9}
						onClick={() => {
							setOffset(offset - 9);
							setLimit(limit - 9);
						}}
					>
						Previous
					</button>
					<button
						disabled={isPreviousData}
						onClick={() => {
							setOffset(limit);
							setLimit(limit + 9);
						}}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default GiphyGrid;
