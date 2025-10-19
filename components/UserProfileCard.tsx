
import React from 'react';
import { User } from '../types';

interface UserProfileCardProps {
  user: User;
  currentUser: User;
  onConnect: (user: User) => void;
}

const InterestPill: React.FC<{ interest: string, isShared: boolean }> = ({ interest, isShared }) => (
  <div className={`px-3 py-1 text-xs rounded-full capitalize
    ${isShared 
      ? 'bg-emerald-100 text-emerald-800 font-semibold' 
      : 'bg-slate-200 text-slate-700'
    }`}
  >
    {interest}
  </div>
);

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, currentUser, onConnect }) => {
  const sharedInterests = currentUser.interests.filter(interest => user.interests.includes(interest));
  const otherInterests = user.interests.filter(interest => !currentUser.interests.includes(interest));

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md w-full flex flex-col">
      <div className="flex items-center space-x-4">
        <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover border-4 border-slate-100"/>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
          <p className="text-sm text-slate-500">{user.location.zone}</p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Interests</h4>
        <div className="flex flex-wrap gap-2">
          {sharedInterests.map(interest => <InterestPill key={interest} interest={interest} isShared={true} />)}
          {otherInterests.map(interest => <InterestPill key={interest} interest={interest} isShared={false} />)}
        </div>
      </div>
      <button 
        onClick={() => onConnect(user)}
        className="mt-6 w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
      >
        Connect
      </button>
    </div>
  );
};

export default UserProfileCard;
