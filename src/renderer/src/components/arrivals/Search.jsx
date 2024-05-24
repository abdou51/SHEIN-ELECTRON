import { CiSearch } from "react-icons/ci";
import { ArrivalContext } from "../../context/arrivalContext";
import { useContext } from "react";

const Search = () => {
  const { nameFilter, setNameFilter } = useContext(ArrivalContext);

  return (
    <div className="items-center justify-end flex m-2">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <CiSearch size={25} />
        </div>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full ps-10 text-xl text-gray-900 h-12 rounded-lg bg-[#4f4f4f]   "
        placeholder="Rechercher"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        required
      />
    </div>
  );
};

export default Search;
