import { useContext } from "react";
import { CategoryContext } from "../../context/categoryContext";
import { IoIosCloseCircle } from "react-icons/io";
const Table = () => {
  const { categories, deleteCategory } = useContext(CategoryContext);

  return (
    <section className="p-2">
      <div className=" h-[650px] overflow-y-auto hide-scrollbar rounded-lg">
        <div className="sticky top-0 grid grid-cols-10 bg-gray-200 text-black px-6 py-3 font-bold z-10 gap-4 items-center">
          <div className="col-span-7">Nom</div>
          <div className="col-span-2">Stock</div>
          <div className="col-span-1">Supprimer</div>
        </div>
        {categories.map((category) => (
          <div
            key={category._id}
            className="grid grid-cols-10 border-b px-6 py-4 gap-4 items-center"
          >
            <div className="col-span-7">{category.name}</div>
            <div className="col-span-2">{category.stock}</div>
            <div className="col-span-1">
              <div
                className="flex justify-center"
                onClick={() => deleteCategory(category._id)}
              >
                <IoIosCloseCircle color="red" size={40} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Table;
