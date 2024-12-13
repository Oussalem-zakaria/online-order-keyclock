import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ id, title, description, image, price }) {
    const navigate = useNavigate();

    const handleViewProduct = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden m-2">
            <img src={image} alt={title} className="w-full h-1/2 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p>{description}</p>
                <p className="text-2xl font-bold text-red-500 mb-4">${price}</p>
                <button onClick={handleViewProduct} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Afficher le produit
                </button>
            </div>
        </div>
    );
}

export default Card;