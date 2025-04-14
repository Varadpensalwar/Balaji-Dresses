import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/saree", name: "Saree", imageUrl: "/saree.jpg" },
	{ href: "/shirts", name: "Shirts", imageUrl: "/shirts.avif" },
	{ href: "/pants", name: "Pants", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/glasses", name: "Night Pants", imageUrl: "/Npants.jpeg" },
	{ href: "/punjabidress", name: "Punjabi Dress", imageUrl: "/punjabiDress.jpeg" },
	{ href: "/legginsandtop", name: "Leggings and Top", imageUrl: "/LeggingsandTop.webp" },
	{ href: "/gown", name: "", imageUrl: "/gown.webp" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-amber-200 mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
				New products added to our collection every week, so stay tuned!
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};
export default HomePage;
