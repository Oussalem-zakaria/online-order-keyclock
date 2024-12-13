import React from 'react'
function Admin() {
    return (
        <>
            {/* <Header userType="client" /> */}
            <div className="flex">
                <nav className="w-1/5 p-4 bg-gray-200 border-r border-gray-300">
                    <ul className="space-y-4">
                        <li><a href="/product/panier" className="block text-blue-500 hover:text-blue-700">Panier</a></li>
                        <li><a href="/client" className="block text-blue-500 hover:text-blue-700">Product</a></li>
                        <li><a href="#contact" className="block text-blue-500 hover:text-blue-700">Contact</a></li>
                    </ul>
                </nav>
                <div className="w-4/5 p-4">

                </div>
            </div>
        </>
    );
}

export default Admin