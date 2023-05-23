import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === "jobs") {
      router.push("/seeker/job");
    } else if (selectedValue === "companies") {
      router.push("/seeker/companies");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 flex gap-2">
      <select
        className="w-1/6  text-sm p-2 text-gray-500 rounded-md"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">Select</option>
        <option value="jobs">Jobs</option>
        <option value="companies">Companies</option>
      </select>

      <div className="w-5/6 flex gap-2">
        <input
          className="w-full p-2 border border-gray-400 rounded-md "
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" type="submit">
          <AiOutlineSearch size={25} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
