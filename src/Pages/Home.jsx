import React from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import Main from "../Components/Main";

const Home = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <Main />
            </div>
        </div>
    );
};

export default Home;
