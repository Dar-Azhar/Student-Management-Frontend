import React from "react";
import messageIcon from '../../src/assets/icons/Message.svg';
import helpIcon from '../../src/assets/icons/help.svg';
import notificationIcon from '../../src/assets/icons/Notification.svg';
import settingsIcon from '../../src/assets/icons/settings.svg';
import userIcon from '../../src/assets/icons/User.svg';
import { IoIosSearch } from "react-icons/io";

const Header = () => {
    return (
        <header className="flex  items-center justify-between px-6 pt-4 md:pb-4">
            <div className="hidden lg:block relative left-56 w-2/5">
                <IoIosSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                <input
                    type="text"
                    placeholder="Search your course"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex items-center gap-4 md:gap-8 lg:gap-5 ml-auto lg:ml-0">
                <img src={helpIcon} alt="Help" className="text-gray-600 cursor-pointer" />
                <div className="relative flex items-center">
                    <img src={messageIcon} alt="Message" className="text-gray-600 cursor-pointer" />
                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <img src={settingsIcon} alt="Settings" className="text-gray-600 cursor-pointer" />
                <div className="relative flex items-center">
                    <img src={notificationIcon} alt="Notification" className="text-gray-600 cursor-pointer" />
                    <span className="absolute top-[3px] right-[6px] translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <img src={userIcon} alt="User" className="text-gray-600 cursor-pointer" />
                <h5 className="hidden md:block text-xl font-semibold">Adeline H. Dancy</h5>
            </div>
        </header>
    );
};

export default Header;
