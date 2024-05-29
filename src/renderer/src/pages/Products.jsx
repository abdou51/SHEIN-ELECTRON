import Sidebar from '../components/Sidebar'
import Table from '../components/products/Table'
import AddDialog from '../components/products/AddDialog'
import CategoryFilter from '../components/products/CategoryFilter'
import BarcodeFilter from '../components/products/BarcodeFilter'

const Products = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full gap-4">
          <div className="flex gap-2 mt-6 ml-2"></div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <AddDialog />
              <BarcodeFilter />
            </div>
            <CategoryFilter />
          </div>
          <Table />
        </div>
      </div>
    </>
  )
}

export default Products
