import "./BaseGridItem.css";
import { GiphyResponse } from "../../../types/GiphyResponse";
import { GIPHY_EMBED_BASE_URL } from "../../../constants/giphyBaseUrl";
import { useFavoritesStore } from "../../../stores/favoritesStore";
import { IoIosHeart } from "react-icons/io";

const BaseGridItem = ({ gif }: { gif: GiphyResponse }) => {
	const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

	const isFavorite = favorites.some((item) => item.id === gif.id);

	return (
		<div className="item-wrapper" key={gif.id}>
			<p>{gif.title}</p>
			<div className="grid-item">
				<iframe
					src={`${GIPHY_EMBED_BASE_URL}/${gif.id}`}
					title={gif.title}
				></iframe>
			</div>
			<IoIosHeart
				size={20}
				style={{ cursor: "pointer" }}
				color={isFavorite ? "red" : "white"}
				onClick={() => {
					if (isFavorite) {
						removeFavorite(gif.id);
					} else {
						addFavorite(gif);
					}
				}}
			/>
		</div>
	);
};

export default BaseGridItem;
