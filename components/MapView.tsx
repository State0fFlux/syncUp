
import React from 'react';
import { User, UserStatus } from '../types';

interface MapViewProps {
  users: User[];
  currentUser: User;
}

const statusColors: { [key in UserStatus]: string } = {
  [UserStatus.Free]: 'bg-status-free',
  [UserStatus.Social]: 'bg-status-social',
  [UserStatus.Busy]: 'bg-status-busy',
};

// Helper to get a random-ish but stable position for mock map
const getPosition = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    top: `${(hash % 70) + 15}%`,
    left: `${(hash % 80) + 10}%`,
  };
};

const UserMarker: React.FC<{ user: User }> = ({ user }) => {
  const pos = getPosition(user.id);
  return (
    <div
      className="absolute flex flex-col items-center group cursor-pointer"
      style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
    >
      <div className="bg-white p-2 rounded-lg shadow-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-12">
        {user.name} - {user.location.zone}
      </div>
      <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full border-4 border-white shadow-xl object-cover" />
      <span className={`absolute top-0 right-0 block h-4 w-4 rounded-full ${statusColors[user.status]} border-2 border-white`}></span>
    </div>
  );
};

const MapView: React.FC<MapViewProps> = ({ users, currentUser }) => {
  return (
    <div className="relative w-full h-96 bg-slate-200 rounded-2xl overflow-hidden shadow-inner">
      {/* This is a placeholder for a real map integration like Google Maps API */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-emerald-100"></div>
      <div className="absolute top-2 left-2 bg-white/50 backdrop-blur-sm p-2 rounded-lg text-xs text-slate-600">
        Map View (Simulation)
      </div>

      {[currentUser, ...users].map((user) => (
        <UserMarker key={user.id} user={user} />
      ))}
    </div>
  );
};

export default MapView;
