import { Datepicker } from "flowbite-react";
import { useContext } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { ArrivalContext } from "../../context/arrivalContext";

const DateFilter = () => {
  const {
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
  } = useContext(ArrivalContext);

  return (
    <>
      <Datepicker
        className="h-10"
        language="fr-FR"
        labelTodayButton="Aujourd'hui"
        labelClearButton="Effacer"
        selected={startDateFilter}
        onSelectedDateChanged={(date) =>
          setStartDateFilter(date.toISOString().split("T")[0])
        }
      />
      <span className="flex items-center justify-center mx-4 text-gray-500 w-[50px] h-[50px]">
        à
      </span>
      <Datepicker
        className="h-10"
        language="fr-FR"
        labelTodayButton="Aujourd'hui"
        labelClearButton="Effacer"
        selected={endDateFilter}
        onSelectedDateChanged={(date) =>
          setEndDateFilter(date.toISOString().split("T")[0])
        }
      />
      <button
        type="button"
        className="flex h-10 hover:opacity-75  text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm px-5 py-2.5 text-center"
      >
        <IoFilterOutline className="mr-2" size={20} />
        Filtrer
      </button>
    </>
  );
};

export default DateFilter;
