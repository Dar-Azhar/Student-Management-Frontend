import React from "react";

const Popup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose} 
        >
            <div
                className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg md:w-2/3 lg:w-1/3 p-4 md:p-6 lg:p-8"
                onClick={(e) => e.stopPropagation()} 
            >
                {children}
            </div>
        </div>
    );
};

export default Popup;
