import { useContext, useState, createContext } from "react";  

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        setNotifications([...notifications, notification]);
    };

    const removeNotification = (id) => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, removeNotification, clearNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
}