import { NavLink, Outlet } from 'react-router-dom';
import { FaCalendarAlt, FaHome, FaWallet, FaShoppingCart, FaClipboardCheck, FaShoppingBag, FaBook, FaUsers } from "react-icons/fa";
import { FaRankingStar, FaBars } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { AiOutlineBars } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import useCart from '../hooks/useCart';
import { Helmet } from 'react-helmet-async';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart();
    // const isAdmin = true;
    const [isAdmin]=useAdmin()

    const navAndSideBar = <>
        <li><a>Navbar Item 1</a></li>
        <li><a>Navbar Item 2</a></li>
    </>
    return (
        <div className="flex flex-col sm:flex-row w-full mx-auto min-h-screen">
            <Helmet>
                <title>Bistro Boss || Dashboard</title>
            </Helmet>
            <div className="basis-auto lg:basis-1/5 bg-[#D1A054] cart-side">
                <NavLink className="btn btn-ghost uppercase logo my-6 text-left">
                    <h2 className="logo text-black">Bristo Boss <br /> <span className="text-[10px] restaurant">rastaurant</span></h2>
                </NavLink>

                <ul className='mx-2 my-4'>
                    {
                        isAdmin ? <>
                            <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='/' className='flex items-center'><span className='px-2'><FaHome></FaHome> </span>Admin Home</NavLink></li>
                            <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='/dashboard/additem' className='flex items-center'><span className='px-2'><ImSpoonKnife></ImSpoonKnife> </span> Add items</NavLink></li>
                            <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='/dashboard/manageitem' className='flex items-center'><span className='px-2'><AiOutlineBars></AiOutlineBars> </span> Manage Items</NavLink></li>
                            <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='review' className='flex items-center'><span className='px-2'><FaBook></FaBook> </span> Manage Bookings</NavLink></li>
                            <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='allUsers' className='flex items-center'><span className='px-2'><FaUsers></FaUsers> </span> All Users</NavLink></li>
                        </>
                            : <>
                                <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='/' className='flex items-center'><span className='px-2'><FaHome></FaHome> </span> Home</NavLink></li>
                                <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='reservation' className='flex items-center'><span className='px-2'><FaCalendarAlt></FaCalendarAlt> </span> Reservation</NavLink></li>
                                <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='/dashboard/payment' className='flex items-center'><span className='px-2'><FaWallet></FaWallet> </span> Payment History</NavLink></li>
                                <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='mycart' className='flex items-center'><span className='px-2'><FaShoppingCart></FaShoppingCart> </span> MyCart<sup><span className="text-[14px] text-white rounded-full px-1"> {cart.length}</span></sup></NavLink></li>
                                <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='review' className='flex items-center'><span className='px-2'><FaRankingStar></FaRankingStar> </span> Add Review</NavLink></li>
                                <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='booking' className='flex items-center'><span className='px-2'><FaClipboardCheck></FaClipboardCheck> </span> My Booking</NavLink></li>
                            </>
                    }
                    <div className="divider text-red-500"></div>
                    <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='/' className='flex items-center'><span className='px-2'><FaHome></FaHome> </span> Home</NavLink></li>
                    <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='/menu' className='flex items-center'><span className='px-2'><FaBars></FaBars> </span> Menu</NavLink></li>
                    <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='/shop' className='flex items-center'><span className='px-2'><FaShoppingBag></FaShoppingBag> </span> Shop</NavLink></li>
                    <li className='py-2 hover:bg-slate-500 hover:text-white'><NavLink to='/contact' className='flex items-center'><span className='px-2'><MdEmail></MdEmail> </span> Contact</NavLink></li>
                </ul>
            </div>
            <div className='mx-auto basis-3/4 bg-fixed bg-white'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;