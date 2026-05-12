'use client';

import { useNotification } from '@/context/NotificationContext';

const NotificationContainer = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`p-4 rounded shadow-lg text-white animate-fade-in ${
            notif.type === 'success'
              ? 'bg-secondary'
              : notif.type === 'error'
              ? 'bg-danger'
              : notif.type === 'warning'
              ? 'bg-accent'
              : 'bg-primary'
          }`}
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
