import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { cart } = useCartStore();

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-amber-200 items-center space-x-2 flex'>
						Balaji Dresses, Biloli
					</Link>

					<nav className='flex flex-wrap items-center gap-4'>
						<Link
							to={"/"}
							className='text-gray-300 hover:text-amber-200 transition duration-300 ease-in-out'
						>
							Home
						</Link>
						<Link
							to={"/cart"}
							className='relative group text-gray-300 hover:text-amber-200 transition duration-300 ease-in-out'
						>
							<ShoppingCart className='inline-block mr-1 group-hover:text-amber-200' size={20} />
							<span className='hidden sm:inline'>Cart</span>
							{cart.length > 0 && (
								<span
									className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
								>
									{cart.length}
								</span>
							)}
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;
