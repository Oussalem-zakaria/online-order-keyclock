import React from 'react';
import Corps from '../../components/Essentiel/Corps';

function Client() {
    return (
        <>
            {/* <Header userType="client" /> */}
            <div className="">
                {/* <nav className="w-1/5 p-4 bg-gray-200 border-r border-gray-300">
                    <ul className="space-y-4">
                        <li><a href="/product/panier" className="block text-blue-500 hover:text-blue-700">Employe</a></li>
                        <li><a href="/client" className="block text-blue-500 hover:text-blue-700">Product</a></li>
                        <li><a href="#contact" className="block text-blue-500 hover:text-blue-700">Contact</a></li>
                    </ul>
                </nav> */}
                <div className="container w-full">
                    <Corps />
                </div>
            </div>
        </>
    );
}

export default Client;