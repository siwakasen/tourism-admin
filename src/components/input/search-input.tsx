import React from "react";

type SearchFormProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({
  placeholder = "Search Mockups, Logos...",
  onSearch,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const query = new FormData(form).get("search") as string;
    onSearch(query);
  };

  return (
    <form className="w-[400px] mx-auto " onSubmit={handleSubmit}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          name="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-slate-800 focus:border-slate-500"
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
