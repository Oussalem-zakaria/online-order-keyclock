import React from 'react';
import localImage from '../assets/images/do.jpg'; // Importez l'image locale
import Header from '../Components/Essentiel/Header';

function Welcome() {

    return (
        <>
            <Header userType={'guest'} />
            <div className="flex flex-col md:flex-row items-center p-4">
                <div className="w-full md:w-1/2 p-2">
                    <img src={localImage} alt="Welcome" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <p className="text-lg">
                        Welcome to our website! We are delighted to have you here. Our mission is to provide you with the best experience possible. Feel free to explore and learn more about what we have to offer.
                    </p>
                </div>
            </div>
        </>

    );
}

export default Welcome;