import React from "react";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";
import Main from "../Components/Main";

const Home = () => {
    return (
        <div className="flex h-screen bg-gray-100 flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <Main />
            </div>
        </div>
    );
};

export default Home;
