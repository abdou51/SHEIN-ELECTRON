import { useContext } from "react";
import { ProductContext } from "../../context/productContext";
import { IoIosCloseCircle } from "react-icons/io";
const Table = () => {
  const { products, deleteProduct } = useContext(ProductContext);

  return (
    <section className="p-2">
      <div className=" h-[650px] overflow-y-auto hide-scrollbar rounded-lg">
        <div className="sticky top-0 grid grid-cols-10 bg-gray-200 text-black px-6 py-3 font-bold z-10 gap-4 items-center">
          <div className="col-span-9">Nom</div>
          <div className="col-span-1">Supprimer</div>
        </div>
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-10 border-b px-6 py-4 gap-4 items-center"
          >
            <div className="col-span-9">{product.name}</div>
            <div className="col-span-1">
              <div
                className="flex justify-center"
                onClick={() => deleteProduct(product._id)}
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
