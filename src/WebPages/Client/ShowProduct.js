import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../Components/Essentiel/Header';

function ShowProduct() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    // Fetch product details using the id or use local data
    // For example, you can use a state to store product details and fetch them from an API
    const product = {
        id,
        title: 'Sample Product',
        description: 'This is a sample product description.',
        image: 'https://via.placeholder.com/150',
        price: 100,
    };

    const handleAddToCart = () => {
        // Logic to add product to cart
        console.log(`Added ${quantity} of product ${id} to cart`);
    };

    const handleConfirm = () => {
        // Logic to confirm the purchase
        console.log(`Confirmed purchase of ${quantity} of product ${id}`);
        navigate("/product/panier");
    };

    return (
        <>
            <Header userType="client" />
            <div className="flex h-screen">
                <nav className="w-1/5 p-4 bg-gray-200 border-r border-gray-300">
                    <ul className="space-y-4">
                        <li><a href="/product/panier" className="block text-blue-500 hover:text-blue-700">Panier</a></li>
                        <li><a href="/client" className="block text-blue-500 hover:text-blue-700">Product</a></li>
                        <li><a href="#contact" className="block text-blue-500 hover:text-blue-700">Contact</a></li>
                    </ul>
                </nav>
                <div className="w-4/5 p-4 flex-grow">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden flex mb-4">
                        <img src={product.image} alt={product.title} className="w-1/3 object-cover" />
                        <div className="p-4 w-2/3">
                            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                            <p className="mb-4">{product.description}</p>
                            <p className="text-2xl font-bold text-red-500 mb-4">${product.price}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
                                -
                            </button>
                            <span className="text-xl">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
                                +
                            </button>
                        </div>
                        <button onClick={handleConfirm} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                            Confirmer
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowProduct;