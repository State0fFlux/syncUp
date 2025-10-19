import React from 'react';
import { User } from '../types';

interface NotificationPageProps {
  currentUser: User;
}

// Helper to format time since notification
const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + 'd ago';
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + 'h ago';
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + 'm ago';
    return 'Just now';
  };
  

// Placeholder notifications for now
const placeholderNotifications = [
{
    id: 1,
    type: 'join_request',
    text: 'Alex clicked "Join" on your event.',
    createdAt: new Date(new Date().getTime() - 2000 * 1000), // 33 min ago
    isNew: true,
    },
    {
    id: 2,
    type: 'proximity',
    text: 'Sam is doing an activity near you. Taylor is free and nearby.',
    createdAt: new Date(new Date().getTime() - 7200 * 1000), // 2h ago
    isNew: true,
    },
    {
    id: 3,
    type: 'chat',
    text: 'Jordan sent you a chat.',
    createdAt: new Date(new Date().getTime() - 24 * 3500 * 1000), // 23hrs ago
    isNew: true,
    },
    {
    id: 4,
    type: 'event_nearby',
    text: 'Community Yoga Event happening nearby today at 6 PM.',
    createdAt: new Date(new Date().getTime() - 48 * 3600 * 1000), // 2d ago
    isNew: false,
    },
  {
    id: 5,
    type: 'proximity',
    text: 'Brady is nearby and also free!',
    createdAt: new Date(new Date().getTime() - 300 * 3600 * 1000), // 2w ago
    isNew: false,
  },
];

const NotificationPage: React.FC<NotificationPageProps> = ({ currentUser }) => {
    return (
      <div className="bg-white rounded-t-2xl p-6 shadow-lg min-h-[60vh] max-w-3xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold text-brand-dark mb-6">Notifications</h2>
  
        {placeholderNotifications.length === 0 ? (
          <p className="text-slate-600">No new notifications right now.</p>
        ) : (
          <ul className="space-y-3">
            {placeholderNotifications.map((notif) => (
              <li
                key={notif.id}
                className="flex items-center space-x-3 p-4 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {/* New red dot */}
                {notif.isNew && <div className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0" />}
  
                {/* Type Icon */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-700">
                  {notif.type === 'join_request' && '🤝'}
                  {notif.type === 'proximity' && '📍'}
                  {notif.type === 'chat' && '💬'}
                  {notif.type === 'event_nearby' && '📅'}
                </div>
  
                {/* Text and timestamp */}
                <div className="flex flex-col">
                  <p className="text-slate-700 text-sm">{notif.text}</p>
                  <span className="text-xs text-slate-400">{timeSince(notif.createdAt)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

export default NotificationPage;
