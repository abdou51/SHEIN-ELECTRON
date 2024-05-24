import Sidebar from '../components/Sidebar'
import Main from '../components/home/Main'
import SideOrder from '../components/home/SideOrder'
const Home = () => {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='grid grid-cols-3'>
          <Main />
          <SideOrder />
        </div>
      </div>
    </>
  )
}

export default Home
