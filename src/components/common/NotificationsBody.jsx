import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../admin/common/Pagination ";
import Heading from "../admin/common/Heading";
import { avatar } from "@material-tailwind/react";
import addNotificationImg from "../../assets/imgs/addNotifications.png";
import editNotificationImg from "../../assets/imgs/editNot.png";
import deleteNotificationImg from "../../assets/imgs/deleteNotif.png";
import ClockIcon from "./ClockIcon";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {
  deleteNotification,
  updateNotification,
} from "@/redux/notificationSlice";

function NotificationsBody({
  notifications,
  currentPage,
  totalPages,
  handlePageChange,
  currentNotifications,
}) {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const user = useSelector((state) => state.user.currentUser);

  const avatars = [
    {
      type: "nouveau",
      avatar: addNotificationImg,
    },
    {
      type: "modification",
      avatar: editNotificationImg,
    },
    {
      type: "annulation",
      avatar: deleteNotificationImg,
    },
  ];

  const calculateElapsedTime = (creationDate, creationTime) => {
    const currentDateTime = new Date();
    const notificationDateTime = new Date(`${creationDate}T${creationTime}`);

    const timeDifference = Math.floor(
      (currentDateTime - notificationDateTime) / 60000
    );

    if (timeDifference >= 60) {
      const hours = Math.floor(timeDifference / 60);
      return `Il y a ${hours} heures`;
    } else {
      return `Il y a ${timeDifference} minutes`;
    }
  };

  const handleSeen = async (notification) => {
    console.log("NOT: ", notification);
    const updatedNotification = { ...notification, seen: true };
    console.log("notification", updateNotification);
    
    dispatch(updateNotification({ notificationId: notification.id, notificationData: updatedNotification }));
  };  

  const handleDelete = (notification) => {
    dispatch(deleteNotification(notification.id));
  };

  return (
    <>
      <div className="container bg-blue-gray-50 min-h-screen !m-0 py-5">
        <div className="py-5">
          <Heading text={"Notifications"} />
        </div>
        {notifications.filter((notification) => notification).length === 0 && (
          <div className="flex justify-center rounded-lg p-6 mb-6 bg-white">
            Vous n'avez pas de notifications
          </div>
        )}

        {currentNotifications.map((notification, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg p-6 mb-6 ${
              !notification.seen ? "bg-white" : "bg-blue-gray-100"
            }`}
          >
            <div className="flex-col space-y-6">
              <div className="flex flex-col space-y-3 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                <div className="flex gap-4">
                  <img
                    src={
                      avatars.find(
                        (avatar) => avatar.type === notification?.type
                      ).avatar
                    }
                    alt="Avatar"
                    className="w-12 h-12"
                  />
                  <div>
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-blue-gray-500 flex items-center gap-1 text-sm font-medium">
                      <ClockIcon />
                      {calculateElapsedTime(
                        notification.creationDate,
                        notification.creationTime
                      )}
                    </p>
                  </div>
                </div>
                {!notification.seen && user.roles[0].name === "user" ? (
                  <div className="flex justify-center">
                    <button
                      className={`text-${primaryColor}-500 hover:underline font-semibold text-sm`}
                      onClick={() => handleSeen(notification)}
                    >
                      Marquer comme lu
                    </button>
                  </div>
                ) : null}
                {user.roles[0].name === "admin" ? (
                  <div className="flex justify-center">
                    <button
                      className={`text-${primaryColor}-500 hover:underline font-semibold text-sm`}
                      onClick={() => handleDelete(notification)}
                    >
                      <FaTrash color="red" size={16} />
                    </button>
                  </div>
                ) : null}
              </div>
              <div>
                <div className="flex justify-center lg:items-end bg-blue-gray-50 py-2 rounded-sm">
                  <button
                    className={`text-${primaryColor}-500 hover:underline font-semibold text-sm`}
                  >
                    {user.roles[0].name === "user" ? (
                      <Link to={"/user/assignedtrips"}>Voir plus</Link>
                    ) : (
                      <Link to={"/admin/trajets"}>Voir plus</Link>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {notifications.filter((notification) => notification).length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}

export default NotificationsBody;
