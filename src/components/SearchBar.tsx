import "./SearchBar.css";

interface SearchBarProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => (
	<div className="search-wrapper">
		<p>Search Images:</p>
		<input
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			placeholder="Search for an image"
			className="search-input"
		/>
	</div>
);

export default SearchBar;
