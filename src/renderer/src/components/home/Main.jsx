import shirt from "../../assets/shirt.png";
import { MdBarcodeReader } from "react-icons/md";
import { CategoryContext } from "../../context/categoryContext";
import { ProductContext } from "../../context/productContext";
import { CartContext } from "../../context/cartContext";
import { GiClothes } from "react-icons/gi";

import { useContext } from "react";
const Main = () => {
  const { categories } = useContext(CategoryContext);
  const { selectedCart, addItemToCart, barcode, handleSetBarcode } =
    useContext(CartContext);

  const { products, setCategoryFilter, categoryFilter } =
    useContext(ProductContext);
  return (
    <section className="h-screen col-span-2 p-2">
      <ul className="flex py-6 gap-6 flex-row whitespace-nowrap overflow-x-auto hide-scrollbar w-[841.33px]">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className={`hover:cursor-pointer ${
              categoryFilter._id === cat._id ? "text-cyan-500" : ""
            }`}
            onClick={() => setCategoryFilter(cat)}
          >
            <li className="p-2 flex items-center justify-center  rounded-full ">
              <GiClothes size={40} />
            </li>
            <span className="text-center  text-2xl">{cat.name}</span>
          </div>
        ))}
      </ul>
      <div className="flex justify-between">
        <h2 className="h3">{categoryFilter.name}</h2>
        <h2 className="h6 mt-2 underline underline-offset-4">
          {products.length} {categoryFilter.name} trouvé(es)
        </h2>
      </div>

      <div className="grid grid-cols-4 mt-2 gap-4 h-[460px] overflow-y-auto hide-scrollbar ">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center rounded border hover:cursor-pointer"
          >
            <img
              src={shirt}
              alt="shirt"
              className="col-span-1 object-contain w-full h-36 p-2"
            />
            <div>
              <h3 className="text-center">{product.name}</h3>
              <div className="flex flex-col items-center">
                <small className="text-center">
                  {product.sellPrice}
                  <sup>
                    <small>DA</small>
                  </sup>
                </small>
                <small className="text-center">{product.barcode}</small>
                <button
                  className="border border-lg rounded-lg bg-gray-600 p-2 mb-1 w-20 font-bold hover:opacity-75 text-center"
                  onClick={() => addItemToCart(selectedCart.client, product)}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="items-center justify-end flex mt-[1.70rem]">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <MdBarcodeReader size={25} />
          </div>
        </div>

        <input
          type="text"
          autoComplete="off"
          id="default-search"
          className="block w-full p-4 ps-10 text-xl text-white h-20 rounded bg-[#4f4f4f]   "
          placeholder="Enter BarCode"
          value={barcode}
          onChange={(e) => handleSetBarcode(e.target.value)}
        />
      </div>
    </section>
  );
};

export default Main;
