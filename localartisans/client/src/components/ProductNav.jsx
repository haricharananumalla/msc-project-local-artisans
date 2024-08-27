import { FaBell } from 'react-icons/fa'
import { RiAddBoxLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'

const ProductNav = () => {
  return (
    <div className='h-12 flex justify-between'>
      <h1 className='text-3xl font-bold'>LOGO</h1>
      
      <div className='flex flex-row justify-center items-center gap-5'>
        <FaBell className='text-xl'/>
        <Searchbar/>        <Link to={"/cart"} className='bg-zinc-800 flex items-center justify-center text-white rounded-md shadow-lg w-16 py-1'>Cart</Link>
        <button className='bg-zinc-800 text-white rounded-md shadow-lg w-16 py-1'>Home</button>
        <RiAddBoxLine className='text-2xl'/>
      </div>
    </div>
  )
}

export default ProductNav
