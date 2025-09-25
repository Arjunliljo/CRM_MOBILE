import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Common/Toast";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "error",
    duration: 3000,
  });

  const showToast = (message, type = "error", duration = 3000) => {
    setToast({
      visible: true,
      message,
      type,
      duration,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  // Convenience methods
  const showSuccess = (message, duration = 3000) => {
    showToast(message, "success", duration);
  };

  const showError = (message, duration = 3000) => {
    showToast(message, "error", duration);
  };

  const showWarning = (message, duration = 3000) => {
    showToast(message, "warning", duration);
  };

  const showInfo = (message, duration = 3000) => {
    showToast(message, "info", duration);
  };

  const value = {
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onHide={hideToast}
      />
    </ToastContext.Provider>
  );
};
