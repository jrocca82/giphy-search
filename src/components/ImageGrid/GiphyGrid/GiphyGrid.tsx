import "./GiphyGrid.css"
import { RefObject } from "react";
import { GiphyResponse } from "../../../types/GiphyResponse";
import BaseGridItem from "../BaseGridItem/BaseGridItem";

const GiphyGrid = ({
	isLoading,
	error,
	loader,
	images,
}: {
	isLoading: boolean;
	error: string | undefined;
	loader: RefObject<HTMLDivElement>;
	images: Array<GiphyResponse>;
}) => (
	<div className="grid">
		{images.map((gif) => (
			<BaseGridItem gif={gif} />
		))}
		{isLoading && <p>Loading...</p>}
		{error && <p className="error">{error}</p>}
		<div ref={loader} />
	</div>
);

export default GiphyGrid;
