// src/context/AlertContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'info';

interface Alert {
  type: AlertType;
  message: string;
}

interface AlertContextType {
  alert: Alert | null;
  setAlert: (alert: Alert) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlertState] = useState<Alert | null>(null);

  const setAlert = (alert: Alert) => {
    setAlertState(alert);
    setTimeout(() => {
      setAlertState(null);
    }, 4000); // auto-dismiss
  };

  const clearAlert = () => setAlertState(null);

  return (
    <AlertContext.Provider value={{ alert, setAlert, clearAlert }}>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        {alert && (
          <div
            className={`px-6 py-4 rounded shadow-lg text-white flex items-center justify-between gap-4
              ${alert.type === 'success' && 'bg-green-500'}
              ${alert.type === 'error' && 'bg-red-500'}
              ${alert.type === 'info' && 'bg-blue-500'}
            `}
          >
            <span>{alert.message}</span>
            <button
              onClick={clearAlert}
              className="text-white font-bold hover:opacity-80"
            >
              &times;
            </button>
          </div>
        )}
      </div>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};
