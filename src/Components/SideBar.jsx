import React, { useState } from "react";
import Logo from "../assets/icons/Logo.svg";
import Dashboard from "../assets/icons/Dashboard.svg";
import Students from "../assets/icons/Students.svg";
import Chapter from "../assets/icons/chapter.svg";
import Help from "../assets/icons/help.svg";
import Reports from "../assets/icons/Report.svg";
import Settings from "../assets/icons/setting-d.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

const Sidebar = () => {
    const [isSideBarVisible, setIsSideBarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSideBarVisible(!isSideBarVisible);
    };

    return (
        <>
            <RxHamburgerMenu
                onClick={toggleSidebar}
                className="md:hidden text-2xl cursor-pointer absolute top-7 left-4"
            />
            
            <aside
                className={`lg:w-56 w-56 bg-white shadow-lg font-semibold fixed top-0 left-0 h-screen z-10 overflow-y-auto transition-transform transform 
                    ${isSideBarVisible ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className=" flex justify-between items-center px-6 pb-4 pt-6 cursor-pointer" >
                    <img src={Logo} alt="Logo" />
                    <RxCross1 className="md:hidden size-6" onClick={toggleSidebar}/>
                </div>
                <nav className="mt-6">
                    <a href="#dashboard" className="px-6 py-3 hover:bg-gray-200 flex gap-4">
                        <img src={Dashboard} alt="Dashboard Icon" />
                        <span className="text-gray-500">Dashboard</span>
                    </a>
                    <a href="#student" className="px-6 py-3 bg-gray-200 text-gray-900 flex gap-4">
                        <img src={Students} alt="Students Icon" />
                        <span className="text-gray-900">Students</span>
                    </a>
                    <a href="#chapter" className="px-6 py-3 text-gray-700 hover:bg-gray-200 flex gap-4">
                        <img src={Chapter} alt="Chapter Icon" />
                        <span className="text-gray-500">Chapter</span>
                    </a>
                    <a href="#help" className="px-6 py-3 text-gray-700 hover:bg-gray-200 flex gap-4">
                        <img src={Help} alt="Help Icon" />
                        <span className="text-gray-500">Help</span>
                    </a>
                    <a href="#reports" className="px-6 py-3 text-gray-700 hover:bg-gray-200 flex gap-4">
                        <img src={Reports} alt="Reports Icon" />
                        <span className="text-gray-500">Reports</span>
                    </a>
                    <a href="#settings" className="px-6 py-3 text-gray-700 hover:bg-gray-200 flex gap-4">
                        <img src={Settings} alt="Settings Icon" />
                        <span className="text-gray-500">Settings</span>
                    </a>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
