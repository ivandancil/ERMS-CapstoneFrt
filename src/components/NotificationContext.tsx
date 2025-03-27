import React, { createContext, useState, ReactNode, useContext } from "react";

// Define types for notifications
interface Notification {
  id: number;
  message: string;
}

interface NotificationContextType {
  addNotificationForAdmin: (notification: Notification) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Add notification only for admin
  const addNotificationForAdmin = (notification: Notification) => {
    const role = localStorage.getItem("role"); // Get the role (admin/user) from localStorage or state
    if (role === "admin") {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    }
  };

  return (
    <NotificationContext.Provider value={{ addNotificationForAdmin, notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};
