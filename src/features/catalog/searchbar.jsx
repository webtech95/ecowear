import { memo, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import debounce from "lodash/debounce";

const noop = () => {};

const SearchBar = memo(({ allProducts = [], onSearchClose = noop }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

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
          product.tags.some((tag) => tag?.toLowerCase().includes(searchLower)))
      );
      setSearchResults(results);
    },
    [allProducts]
  );

  const debouncedSearchRef = useRef(
    debounce((value, searchFn) => {
      searchFn(value);
    }, 300)
  );

  useEffect(() => {
    const debouncedSearch = debouncedSearchRef.current;
    debouncedSearch(query, performSearch);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, performSearch]);

  const handleResultClick = (product) => {
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

  // Close on outside click
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
    <div className="search-container relative w-full max-w-2xl mx-auto z-40">
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
            placeholder="Search sustainable fashion..."
            className="w-full py-2.5 pl-4 pr-10 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm 
                       text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] 
                       transition-all duration-200 text-sm"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
          />
          {query && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="button"
              onClick={clearSearch}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX size={18} />
            </motion.button>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="ml-2 p-2.5 bg-[#16a34a] hover:bg-[#14532d] text-white rounded-xl transition-colors shadow-md"
          aria-label="Search"
        >
          <FiSearch size={20} />
        </motion.button>
      </form>

      {/* Results dropdown with AnimatePresence */}
      <AnimatePresence>
        {isSearchOpen && (query || searchResults.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl border border-white/50 overflow-hidden"
          >
            {/* Header with count */}
            {searchResults.length > 0 && (
              <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                <p className="text-xs font-medium text-gray-500">
                  {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "<span className="text-gray-700">{query}</span>"
                </p>
              </div>
            )}

            {/* Results list */}
            {searchResults.length > 0 ? (
              <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                {searchResults.map((product) => (
                  <motion.li
                    key={product.id}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="flex items-center gap-3 p-3 cursor-pointer transition-colors"
                    onClick={() => handleResultClick(product)}
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm text-[#16a34a] font-semibold">₹{product.price}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{product.description}</p>
                    </div>
                    <FiArrowRight className="text-gray-300 flex-shrink-0" />
                  </motion.li>
                ))}
              </ul>
            ) : query ? (
              <div className="p-6 text-center">
                <p className="text-gray-500 mb-1">No results found for "<span className="font-medium text-gray-700">{query}</span>"</p>
                <p className="text-xs text-gray-400">Try different keywords or browse our categories</p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default SearchBar;
