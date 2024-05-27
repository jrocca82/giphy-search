import "./BaseGridItem.css"
import { GiphyResponse } from "../../../types/GiphyResponse";

const BaseGridItem = ({ gif }: { gif: GiphyResponse }) => (
	<div className="item-wrapper" key={gif.id}>
		<p>{gif.title}</p>
		<div className="grid-item">
			<iframe src={gif.embed_url} title={gif.title}></iframe>
		</div>
	</div>
);

export default BaseGridItem;
