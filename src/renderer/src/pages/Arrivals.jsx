import Sidebar from "../components/Sidebar";
import Table from "../components/arrivals/Table";
import Search from "../components/arrivals/Search";
import DateFilter from "../components/arrivals/DateFilter";
import AddDialog from "../components/arrivals/AddDialog";

const Arrivals = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full gap-4">
          <div className="flex gap-2 mt-6 ml-2">
            <DateFilter />
          </div>
          <div className="flex justify-between">
            <Search />
            <AddDialog />
          </div>
          <Table />
        </div>
      </div>
    </>
  );
};

export default Arrivals;
