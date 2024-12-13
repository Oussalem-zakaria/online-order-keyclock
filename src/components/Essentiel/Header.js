import React from 'react';
import Button from '../Button';

function Header({ userType }) {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
            <div className="text-xl font-bold text-gray-800">Logo</div>
            <div className="flex items-center">
                {userType === 'guest' ? (
                    <>
                        <Button type="button" name="Login" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2" />
                        <Button type="button" name="Sign Up" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" />
                    </>
                ) : (
                    <>
                        <nav className="mr-4">

                        </nav>
                        <Button type="button" name="Logout" className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" />
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;