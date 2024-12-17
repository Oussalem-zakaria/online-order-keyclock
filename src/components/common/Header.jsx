import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuCustomList } from "./MenuCustomList";
import { NotificationsMenu } from "./NotificationsMenu";

function Header({
  pathToProfile,
  pathToNotifications,
  SidebarResponsive,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <header
      className={`bg-blue-500 flex justify-between items-center py-4 px-6`}
    >
      {/* <div className="sm:flex 2xl:hidden">
        <SidebarResponsive />
      </div> */}
      <div className="text-white flex justify-between w-full">
        <div>
          <h1 className="text-2xl text-white font-bold capitalize">
            Bonjour, {currentUser.firstName + " " + currentUser.lastName}
          </h1>
          <p className="text-sm">{currentUser.email}</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <NotificationsMenu pathToNotifications={pathToNotifications} />
          </div>
          <MenuCustomList user={currentUser} pathToProfile={pathToProfile} />
        </div>
      </div>
    </header>
  );
}
export default Header;
