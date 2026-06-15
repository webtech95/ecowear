import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import debounce from "lodash/debounce";

const SearchBar = ({ allProducts = [], onSearchClose = () => {} }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Perform search
  const performSearch = useCallback(
    (searchTerm) => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      const searchLower = searchTerm.toLowerCase();

      const results = allProducts.filter((product) =>
        (product.name && product.name.toLowerCase().includes(searchLower)) ||
        (product.description && product.description.toLowerCase().includes(searchLower)) ||
        (product.category && product.category.toLowerCase().includes(searchLower)) ||
        (Array.isArray(product.tags) &&
          product.tags.some(tag => tag?.toLowerCase().includes(searchLower)))
      );

      setSearchResults(results);
    },
    [allProducts]
  );

  // Debounce search using useRef
  const debouncedSearchRef = useRef(
    debounce((value, searchFn) => {
      searchFn(value);
    }, 300)
  );

  useEffect(() => {
    debouncedSearchRef.current(query, performSearch);

    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, [query, performSearch]);

  // Navigate to single product page
  const handleResultClick = (product) => {
    // Use product.id if your route is /product/:id
    navigate(`/product/${product.id}`); 
    setQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    onSearchClose();
  };

  const clearSearch = () => { 
    setQuery("");
    setSearchResults([]);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSearchOpen && !e.target.closest(".search-container")) {
        setIsSearchOpen(false);
        onSearchClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen, onSearchClose]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="relative search-container w-full max-w-2xl mx-auto z-40">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            performSearch(query);
          }}
          className="flex items-center"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for products, categories..."
              className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="ml-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>
        </form>

        {/* Results dropdown */}
        {isSearchOpen && searchResults.length > 0 && (
          <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
            <div className="p-2 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-600">
                {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
              </p>
            </div>
            <ul>
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  className="p-3 hover:bg-gray-200 cursor-pointer transition"
                  onClick={() => handleResultClick(product)}
                >
                  <div className="flex items-center">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">₹{product.price}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No results message */}
        {isSearchOpen && query && searchResults.length === 0 && (
          <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <p className="text-gray-600">No results found for "{query}"</p>
            <p className="text-sm text-gray-500 mt-1">
              Try searching for different terms or browse our categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
