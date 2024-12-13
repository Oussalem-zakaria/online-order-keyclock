import React, { useState } from 'react';
import localImage from '../../assets/imgs/do.jpg';
import Card from '../Card';

function Corps() {
    const [searchTerm, setSearchTerm] = useState('');
    const cards = [
        { id: 1, title: 'Card 1', description: 'This is the first card.', image: localImage, price: 100 },
        { id: 2, title: 'Card 2', description: 'This is the second card.', image: localImage, price: 100 },
        { id: 3, title: 'Card 3', description: 'This is the third card.', image: localImage, price: 100 },
        { id: 4, title: 'Card 4', description: 'This is the fourth card.', image: localImage, price: 100 },
        { id: 5, title: 'Card 5', description: 'This is the fifth card.', image: localImage, price: 100 },
        { id: 6, title: 'Card 6', description: 'This is the sixth card.', image: localImage, price: 100 },
    ];

    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredCards.map((card) => (
                    <Card key={card.id} id={card.id} title={card.title} description={card.description} image={card.image} price={card.price} />
                ))}
            </div>
        </div>
    );
}

export default Corps;