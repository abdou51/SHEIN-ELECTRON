// import { Datepicker } from "flowbite-react";
import { useContext,useState,useEffect } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { ArrivalContext } from "../../context/arrivalContext";
import Datepicker from "flowbite-datepicker/Datepicker";
import fr from "flowbite-datepicker/locales/fr";
const DateFilter = () => {
  const {
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
    fetchArrivals,
  } = useContext(ArrivalContext);


  useEffect(() => {
    const startdatepickerEl = document?.getElementById("startdatepickerId");
    const enddatepickerEl = document?.getElementById("enddatepickerId");
    Object.assign(Datepicker.locales, fr);
    new Datepicker(startdatepickerEl, {});
    new Datepicker(enddatepickerEl, {});
  }, []);
  return (
    <>
      <div className="relative w-72">
        <input
          datepicker
          datepicker-autohide
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Date de début"
          onSelect={(e) => setStartDateFilter(e.target.value)}
          value={startDateFilter.current}
          id="startdatepickerId"
        />
        <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <span className="flex items-center justify-center mx-4 text-gray-500 w-[50px] h-[50px]">
        à
      </span>
      <div className="relative w-72">
        <input
          datepicker
          datepicker-autohide
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Date de fin"
          onSelect={(e) => setEndDateFilter(e.target.value)}
          value={endDateFilter.current}
          id="enddatepickerId"
        />
        <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <button
        type="button"
        onClick={()=>{
          fetchArrivals();
        }}
        className="flex h-10 hover:opacity-75  text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm px-5 py-2.5 text-center"
      >
        <IoFilterOutline className="mr-2" size={20} />
        Filtrer
      </button>
    </>
  );
};

export default DateFilter;
