import Product from "../models/product.model.js";

// For demonstration, use a static cart (since no authentication)
let staticCart = [];

export const getCartProducts = async (req, res) => {
	try {
		const products = await Product.find({ _id: { $in: staticCart.map(item => item.id) } });

		// add quantity for each product
		const cartItems = products.map((product) => {
			const item = staticCart.find((cartItem) => cartItem.id === product.id);
			return { ...product.toJSON(), quantity: item.quantity };
		});

		res.json(cartItems);
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
		const { productId } = req.body;
		const existingItem = staticCart.find((item) => item.id === productId);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			staticCart.push({ id: productId, quantity: 1 });
		}
		res.json(staticCart);
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeAllFromCart = async (req, res) => {
	try {
		const { productId } = req.body;
		if (!productId) {
			staticCart = [];
		} else {
			staticCart = staticCart.filter((item) => item.id !== productId);
		}
		res.json(staticCart);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateQuantity = async (req, res) => {
	try {
		const { id: productId } = req.params;
		const { quantity } = req.body;
		const existingItem = staticCart.find((item) => item.id === productId);

		if (existingItem) {
			if (quantity === 0) {
				staticCart = staticCart.filter((item) => item.id !== productId);
				return res.json(staticCart);
			}

			existingItem.quantity = quantity;
			res.json(staticCart);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
