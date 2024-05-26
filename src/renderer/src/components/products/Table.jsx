import { useContext } from 'react'
import { ProductPageContext } from '../../context/productPageContext'
import { IoIosCloseCircle } from 'react-icons/io'
import { BsFillPrinterFill } from 'react-icons/bs'

const Table = () => {
  const { products, deleteProduct } = useContext(ProductPageContext)

  return (
    <section className="p-2">
      <div className=" h-[600px] overflow-y-auto hide-scrollbar rounded-lg">
        <h2 className="sticky h6 mt-2 underline underline-offset-4">
          {products.length} produit trouvé
        </h2>
        <div className="sticky top-0 grid grid-cols-10 bg-gray-200 text-black px-6 py-3 font-bold z-10 gap-4 items-center">
          <div className="col-span-2">Nom</div>
          <div className="col-span-2">Categorie</div>
          <div className="col-span-1">Taille</div>
          <div className="col-span-2">Arrivage</div>
          <div className="col-span-1">Prix</div>
          <div className="col-span-1">Etiquette</div>
          <div className="col-span-1">Supprimer</div>
        </div>
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-10 border-b px-4 py-3 gap-4 items-center"
          >
            <div className="col-span-2">{product.name}</div>
            <div className="col-span-2">{product.category?.name}</div>
            <div className="col-span-1">{product.size}</div>
            <div className="col-span-2">{product.arrival?.name}</div>
            <div className="col-span-1">
              {product.sellPrice}
              <sup>
                <small>DA</small>
              </sup>
            </div>
            <div className="col-span-1">
              <div className="flex justify-left" onClick={() => deleteProduct(product._id)}>
                <BsFillPrinterFill color="cyan" size={40} />
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex justify-left" onClick={() => deleteProduct(product._id)}>
                <IoIosCloseCircle color="red" size={40} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Table
