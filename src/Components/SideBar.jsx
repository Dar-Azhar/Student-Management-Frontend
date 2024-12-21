import React from "react";
import Logo from '../assets/icons/Logo.svg'
import Dashboard from '../assets/icons/Dashboard.svg'
import Students from '../assets/icons/Students.svg'
import Chapter from '../assets/icons/chapter.svg'
import Help from '../assets/icons/help.svg'
import Reports from '../assets/icons/Report.svg'
import Settings from '../assets/icons/setting-d.svg'


const Sidebar = () => {
    return (
        <aside className="w-56 bg-white shadow-lg font-semibold fixed top-0 left-0 h-screen z-10 overflow-y-auto">
            {/* Logo Section */}
            <div className="px-6 pb-4 pt-6">
                <img src={Logo} alt="" />
            </div>
            {/* Navigation Links */}
            <nav className="mt-6">
                <a href="#dashboard" className="px-6 py-3  hover:bg-gray-200 flex gap-4">
                    <img src={Dashboard} alt="" />
                    <span className="text-gray-500">Dashboard</span>
                </a>
                <a href="#student" className="px-6 py-3 bg-gray-200  text-gray-900 flex gap-4">
                    <img src={Students} alt="" />
                    <span className="text-gray-900">Students</span>
                </a>
                <a href="#chapter" className="px-6 py-3 text-gray-700 hover:bg-gray-200 flex gap-4">
                    <img src={Chapter} alt="" />
                    <span className="text-gray-500">Chapter</span>
                </a>
                <a href="#help" className="px-6 py-3 text-gray-700 hover:bg-gray-200 flex gap-4">
                    <img src={Help} alt="" />
                    <span className="text-gray-500">Help</span>
                </a>
                <a href="#reports" className="px-6 py-3 text-gray-700 hover:bg-gray-200 flex gap-4">
                    <img src={Reports} alt="" />
                    <span className="text-gray-500">Reports</span>
                </a>
                <a href="#settings" className="px-6 py-3 text-gray-700 hover:bg-gray-200 flex gap-4">
                    <img src={Settings} alt="" />
                    <span className="text-gray-500">Settings</span>
                </a>
            </nav>
        </aside>
    );
};

export default Sidebar;
