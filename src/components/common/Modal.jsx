import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex bg-slate-300">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
                <span className="absolute top-0 right-0 p-4">
                    <button onClick={onClose}>
                        <svg
                            className="h-6 w-6 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9l4-4a1 1 0 111.414 1.414L11.414 10l4 4a1 1 0 01-1.414 1.414L10 11.414l-4 4A1 1 0 114.586 14l4-4-4-4A1 1 0 116.414 4l4 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </span>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;