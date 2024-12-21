import React from "react";
import messageIcon from '../../src/assets/icons/Message.svg'
import helpIcon from '../../src/assets/icons/help.svg'
import notificationIcon from '../../src/assets/icons/Notification.svg'
import settingsIcon from '../../src/assets/icons/settings.svg'
import userIcon from '../../src/assets/icons/User.svg'
import { IoIosSearch } from "react-icons/io";


const Header = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 ">
            {/* Search Bar */}
            
            <div className="relative left-56 w-2/5">
                <IoIosSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                <input
                    type="text"
                    placeholder="Search your course"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Icons and Profile */}
            <div className="flex items-center gap-6">
                <button className="text-gray-600 hover:text-gray-900">
                    <img src={helpIcon} alt="" />
                </button>
                <div className="relative flex items-center">
                    <button className="text-gray-600 hover:text-gray-900">
                        <img src={messageIcon} alt="" />
                    </button>
                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <button className="text-gray-600 hover:text-gray-900">
                    <img src={settingsIcon} alt="" />
                </button>
                <div className="relative flex items-center">
                    <button className="text-gray-600 hover:text-gray-900">
                        <img src={notificationIcon} alt="" />
                    </button>
                    <span className="absolute top-[3px] right-[6px] translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>

                <button className="text-gray-600 hover:text-gray-900">
                    <img src={userIcon} alt="" />
                </button>
                <h5 className="text-xl font-semibold">Adeline H. Dancy</h5>
            </div>

        </header>
    );
};

export default Header;
