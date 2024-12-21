import React from "react";

const Popup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose} 
        >
            <div
                className="bg-white rounded-lg shadow-lg py-6 px-14 w-1/3"
                onClick={(e) => e.stopPropagation()} 
            >
                {children}
            </div>
        </div>
    );
};

export default Popup;
