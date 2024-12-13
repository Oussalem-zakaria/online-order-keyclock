// import { notificationsData } from "@/data/data";
// import {
//   getAllNotifications,
//   getAllNotificationsByUser,
// } from "@/utils/notifications";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import addNotification from "../../assets/imgs/addNotifications.png";
// import editNotification from "../../assets/imgs/editNot.png";
// import deleteNotification from "../../assets/imgs/deleteNotif.png";
import ClockIcon from "./ClockIcon";

export function NotificationsMenu({
  pathToNotifications = "/admin/notifications",
}) {
  const [notifications, setNotifications] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const primaryColor = useSelector((state) => state.settings.primaryColor);

  // const fetchNotifications = async () => {
  //   if (!currentUser || !currentUser.id) {
  //     console.error("Current user ID is undefined or null");
  //     return;
  //   }
  
  //   // let notifications = [];
  //   // try {
  //   //   notifications =
  //   //     currentUser.roles[0].name === "admin" ||
  //   //     currentUser.roles[0].name === "responsable"
  //   //       ? await getAllNotifications()
  //   //       : await getAllNotificationsByUser(currentUser.id);
  //   // } catch (error) {
  //   //   console.error("Error fetching notifications:", error);
  //   // }
  
  //   // Ensure notifications is an array
  //   // if (!Array.isArray(notifications)) {
  //   //   notifications = [];
  //   // }
  
  //   // const notificationsWithTime = notifications.map((notification) => {
  //   //   const now = new Date();
  //   //   const creationTime = new Date(
  //   //     `${notification.creationDate}T${notification.creationTime}:00`
  //   //   );
  //   //   const timeDiff = Math.floor((now - creationTime) / 60000); // Convert milliseconds to minutes
  
  //   //   return {
  //   //     ...notification,
  //   //     time: timeDiff,
  //   //   };
  //   // });
  
  //   setNotifications(notificationsWithTime);
  // };  

  // useEffect(() => {
  //   if (currentUser && currentUser.id) {
  //     fetchNotifications();
  //   }
  // }, [currentUser]);

  // const avatars = [
  //   {
  //     type: "nouveau",
  //     avatar: addNotification,
  //   },
  //   {
  //     type: "modification",
  //     avatar: editNotification,
  //   },
  //   {
  //     type: "annulation",
  //     avatar: deleteNotification,
  //   },
  // ];

  return (
    <Menu>
      <MenuHandler>
        <div className="cursor-pointer">
          <FaBell className="text-white text-xl" />
          {/* {notifications.filter((notification) => !notification.seen).length >
            0 && ( */}
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          {/* )} */}
        </div>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2 w-full lg:w-auto">
        {/* {notifications.filter((notification) => !notification.seen).length ===
          0 && (
          <MenuItem className="px-4 py-2 border-t flex space-x-2 items-center justify-center bg-blue-gray-50">
            <div>
              <p>Vous n'avez pas de notifications non lues</p>
            </div>
          </MenuItem>
        )}

        {notifications.map((notification, index) => {
          if (!notification.seen && index < 5) {
            return (
              <MenuItem
                key={index}
                className="flex items-center gap-4 py-2 pl-2 pr-8"
              >
                <Avatar
                  alt={notification.name}
                  src={
                    avatars.find((avatar) => avatar.type === notification.type)
                      .avatar
                  }
                  className="w-8 h-8"
                  variant="square"
                />
                <div className="flex flex-col gap-1">
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-semibold"
                  >
                    {notification.title}
                  </Typography>
                  <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                    <ClockIcon />
                    {notification.time >= 60
                      ? `Il y a ${Math.floor(notification.time / 60)} heures`
                      : `Il y a ${notification.time} minutes`}
                  </Typography>
                </div>
              </MenuItem>
            );
          }
        })}
        <MenuItem className="px-4 py-2 border-t flex space-x-2 items-center justify-center bg-blue-gray-50">
          <div>
            <FaSignOutAlt className={`text-${primaryColor}-500`} />
          </div>
          <button
            className={`text-${primaryColor}-500 hover:underline font-bold`}
          >
            <Link to={pathToNotifications}>Voir tout</Link>
          </button>
        </MenuItem> */}
      </MenuList>
    </Menu>
  );
}
