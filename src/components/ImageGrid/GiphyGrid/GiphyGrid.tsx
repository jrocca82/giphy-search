import "./GiphyGrid.css"
import { GiphyResponse } from "../../../types/GiphyResponse";
import BaseGridItem from "../BaseGridItem/BaseGridItem";

const GiphyGrid = ({
	isLoading,
	error,
	images,
}: {
	isLoading: boolean;
	error: string | undefined;
	images: Array<GiphyResponse>;
}) => (
	<div className="grid">
		{images.map((gif) => (
			<BaseGridItem gif={gif} />
		))}
		{isLoading && <p>Loading...</p>}
		{error && <p className="error">{error}</p>}
	</div>
);

export default GiphyGrid;
