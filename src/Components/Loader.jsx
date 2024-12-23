import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-50 bg-opacity-50 z-50">
        <ClipLoader color="#3498db" size={100} />
    </div>
);

export default Loader;
