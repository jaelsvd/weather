import * as React from "react";
import "./search.scss";

interface SearchProps {
    value: string;
    onClick: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Search: React.FC<SearchProps> = ({ value, onClick, onChange }) => {
  return (
    <div className="search_wrapper">
        <div className={"search"}>
            <input className={"search_input"} type="text" value={value} onChange={onChange} placeholder={"Enter City"} />
            <button className={"search_button"} type="button" onClick={onClick}>Search</button>
        </div>
    </div>
  );
}

export default Search;