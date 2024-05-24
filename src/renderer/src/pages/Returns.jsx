import Sidebar from '../components/Sidebar'
import Main from '../components/returns/Main'
import SideOrder from '../components/returns/SideOrder'
const Home = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Main />
          <SideOrder />
        </div>
      </div>
    </>
  )
}

export default Home
