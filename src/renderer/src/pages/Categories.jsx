import Sidebar from '../components/Sidebar'
import Table from '../components/categories/Table'
import AddDialog from '../components/categories/AddDialog'

const Arrivals = () => {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='flex flex-col w-full gap-4'>
          <div className='flex gap-2 mt-6 ml-2'></div>
          <div className='flex justify-between'>
            <AddDialog />
          </div>
          <Table />
        </div>
      </div>
    </>
  )
}

export default Arrivals
