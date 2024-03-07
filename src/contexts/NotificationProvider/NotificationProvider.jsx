import { useState, createContext } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationArea, setNotificationArea] = useState(false);

  const NOTIFICATION_TYPES = {
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
    SUCCESS: "success",
  };

  const addNotification = (type, title, message) => {
    if (!type || !title || !message) {
      console.error(
        "Type, title, and message are required for creating a notification."
      );
      return;
    }

    if (!Object.values(NOTIFICATION_TYPES).includes(type)) {
      console.error(`Invalid notification type: ${type}`);
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()} ${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}h`;

    const newNotification = {
      id: Date.now(),
      type,
      title,
      message,
      date: formattedDate,
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
  };

  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const toggleNotificationArea = () => {
    setNotificationArea(!notificationArea);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notificationArea,
        addNotification,
        removeNotification,
        clearNotifications,
        toggleNotificationArea,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
