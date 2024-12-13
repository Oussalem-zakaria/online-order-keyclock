import React from 'react';
import Header from '../../Components/Essentiel/Header';

function Panier() {
    // Liste de produits statiques
    const cart = [
        {
            id: 1,
            title: 'Product 1',
            description: 'This is the description for product 1.',
            image: 'https://via.placeholder.com/150',
            price: 50,
            quantity: 2,
        },
        {
            id: 2,
            title: 'Product 2',
            description: 'This is the description for product 2.',
            image: 'https://via.placeholder.com/150',
            price: 30,
            quantity: 1,
        },
        {
            id: 3,
            title: 'Product 3',
            description: 'This is the description for product 3.',
            image: 'https://via.placeholder.com/150',
            price: 20,
            quantity: 3,
        },
    ];

    const handleDelete = (id) => {
        // Logic to delete product from cart
        console.log(`Deleted product with id ${id}`);
    };

    const handleEdit = (id) => {
        // Logic to edit product in cart
        console.log(`Edit product with id ${id}`);
    };

    return (
        <>
            <Header userType="client" />
            <div className="flex h-screen">
                <nav className="w-1/6 p-4 bg-gray-200 border-r border-gray-300">
                    <ul className="space-y-4">
                        <li><a href="/product/panier" className="block text-blue-500 hover:text-blue-700">Panier</a></li>
                        <li><a href="/client" className="block text-blue-500 hover:text-blue-700">Product</a></li>
                        <li><a href="#contact" className="block text-blue-500 hover:text-blue-700">Contact</a></li>
                    </ul>
                </nav>
                <div className="w-5/6 p-4 flex-grow">
                    <h1 className="text-3xl font-bold mb-4">Panier</h1>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Photo</th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 border-b">Price</th>
                                <th className="py-2 px-4 border-b">Quantity</th>
                                <th className="py-2 px-4 border-b">Total</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">
                                        <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="py-2 px-4 border-b">{product.title}</td>
                                    <td className="py-2 px-4 border-b">{product.description}</td>
                                    <td className="py-2 px-4 border-b">${product.price}</td>
                                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                                    <td className="py-2 px-4 border-b">${product.price * product.quantity}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button onClick={() => handleEdit(product.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Panier;