import { useContext } from "react";
import { dateFormat } from "../../utils/dateFormat";
import { ArrivalContext } from "../../context/arrivalContext";

const Table = () => {
  const { arrivals } = useContext(ArrivalContext);

  return (
    <section className="p-2">
      <div className=" h-[650px] overflow-y-auto hide-scrollbar rounded-lg">
        <div className="sticky top-0 grid grid-cols-10 bg-gray-200 text-black px-6 py-3 font-bold z-10 gap-4 items-center">
          <div className="col-span-4">Nom</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Quantité</div>
          <div className="col-span-1">Nb Cartons</div>
          <div className="col-span-1">Categorie</div>
          <div className="col-span-2">Détails</div>
        </div>
        {arrivals.map((arrival) => (
          <div
            key={arrival._id}
            className="grid grid-cols-10 border-b px-6 py-4 gap-4"
          >
            <div className="col-span-4">{arrival.name}</div>
            <div className="col-span-1">{dateFormat(arrival.date)}</div>
            <div className="col-span-1">{arrival.quantity}</div>
            <div className="col-span-1">{arrival.numBoxes}</div>
            <div className="col-span-1">{arrival.category?.name}</div>
            <div className="col-span-2">
              {arrival.items.map((item) => (
                <div key={item._id} className="my-1">
                  {item.quantity} {item.category?.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Table;
