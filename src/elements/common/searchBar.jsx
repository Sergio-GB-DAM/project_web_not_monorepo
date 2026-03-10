const SearchBar = ({ value, onChange, placeholder }) => {
    return (
        <div className="container my-3">
            <input
                type="text"
                className="form-control rounded-pill px-4 py-2 shadow-sm bg-dark text-white border-0"
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;