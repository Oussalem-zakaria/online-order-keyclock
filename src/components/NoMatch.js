import React from 'react';
import { Link } from 'react-router-dom';

function NoMatch() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go to Home
            </Link>
        </div>
    );
}

export default NoMatch;