import React from 'react';
import { User } from '../types';

interface NotificationPageProps {
  currentUser: User;
}

const NotificationPage: React.FC<NotificationPageProps> = ({ currentUser }) => {
  return (
    <div className="bg-white rounded-t-2xl p-6 shadow-lg min-h-[60vh]">
      <h2 className="text-xl font-semibold text-brand-dark mb-4">Notifications</h2>
      <p className="text-slate-600">No new notifications right now.</p>
    </div>
  );
};

export default NotificationPage;
