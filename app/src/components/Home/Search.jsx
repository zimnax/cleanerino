/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { FiSearch } from "react-icons/fi"; // Import the search icon from react-icons

// Define styles for the search bar, dropdown, and icon
const searchBarContainerStyle = css`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px; // Updated border-radius
  padding: 5px;
`;

const col = css`
padding: 10px 186px;
`;

const searchBarStyle = css`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  margin: 0;
`;

const dropdownStyle = css`
  padding: 10px;
  font-size: 16px;
  border: none;
  margin-right: 10px;
`;

const iconStyle = css`
  color: #555;
  margin-right: 10px;
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["categories", "Skincare", "Haircare", "Makeup", "Fragrances"]; // Add more categories as needed

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleKeyPress = (e) => {
    // Trigger search when the Enter key is pressed
    if (e.key === "Enter") {
      onSearch(searchTerm, selectedCategory);
    }
  };

  return (
    <div css={col}>
      <div css={searchBarContainerStyle}>
        <select
          css={dropdownStyle}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <FiSearch css={iconStyle} size={20} />
        <input
          css={searchBarStyle}
          type="text"
          placeholder="What are you looking for?"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // Added keypress event to handle search on Enter
        />
      </div>
    </div>
  );
};

export default SearchBar;