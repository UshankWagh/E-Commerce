import { LayoutDashboard, List, LogIn, LogOut, ShoppingCart } from "lucide-react";
import { Link, Outlet } from "react-router"

export default function PrivateRoute({ auth, role, handleLogout }) {

    // const [auth, setAuth] = useState(localStorage.getItem("auth") != "undefined" ? JSON.parse(localStorage.getItem("auth")) : "");

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-20 py-12">
                {
                    auth?.role == role ? <Outlet /> : <div>
                        <p className='py-4 text-3xl font-bold font-mono tracking-tight'>Access Denied !!</p>
                        <p className='py-4 text-xl font-bold font-mono tracking-tight'>{`You need to login as "${role == 1 ? "Admin" : "Customer"}" to access this page`}</p>
                    </div>
                }
                {/* <Outlet /> */}
                {/* <Loader title="Access Denied!!" msg={`You need to login as "${role.toUpperCase()}" to access this page`} redirectURL="/login" redirectText="Sign In?" /> */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
                    <p className='p-4 mb-10 text-3xl text-secondary font-bold text-center'>E Commerce</p>

                    {
                        auth?.role == undefined ?
                            <>
                                <li className='py-2 text-lg'><Link to="/login" ><LogIn /> Login</Link></li>
                                <li className='py-2 text-lg'><Link to="/signup" ><LayoutDashboard /> SignUp</Link></li>
                            </>
                            :

                            auth.role == 1 ?
                                <>
                                    <p className='p-4 text-xl text-neutral font-bold text-center'>Admin</p>
                                    <li className='py-2 text-lg'><button onClick={() => handleLogout()}><LogOut /> Logout</button></li>
                                </>
                                :
                                <>
                                    <p className='p-4 text-xl text-neutral font-bold text-center'>{auth.name}</p>
                                    <li className='py-2 text-lg'><Link to="/customer/items" ><List /> Items</Link></li>
                                    <li className='py-2 text-lg'><Link to="/customer/cart" ><ShoppingCart /> Cart</Link></li>
                                    <li className='py-2 text-lg'><button onClick={() => handleLogout()}><LogOut /> Logout</button></li>
                                </>

                    }



                </ul>
            </div>
        </div>);
}