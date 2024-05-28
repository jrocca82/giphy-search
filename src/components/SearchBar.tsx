import { ChangeEvent, useState } from "react";

type SearchBarProps = {
	onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleSearch = () => {
		onSearch(inputValue);
	};

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Search for GIFs"
			/>
			<button onClick={handleSearch}>Search</button>
		</div>
	);
};

export default SearchBar;
