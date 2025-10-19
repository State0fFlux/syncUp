
import React from 'react';
import { User, UserStatus } from '../types';

interface FriendListProps {
  friends: User[];
}

const statusInfo: { [key in UserStatus]: { color: string; text: string; } } = {
  [UserStatus.Free]: { color: 'bg-status-free', text: 'Free' },
  [UserStatus.Social]: { color: 'bg-status-social', text: 'Social' },
  [UserStatus.Busy]: { color: 'bg-status-busy', text: 'Busy' },
};

const FriendListItem: React.FC<{ friend: User }> = ({ friend }) => {
  const status = statusInfo[friend.status];

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
      <div className="flex items-center space-x-3">
        <img src={friend.avatarUrl} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-slate-800">{friend.name}</p>
          <p className="text-xs text-slate-500">{friend.location.zone}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`w-3 h-3 rounded-full ${status.color}`}></span>
        <span className="text-sm font-medium text-slate-600">{status.text}</span>
      </div>
    </div>
  );
};

const FriendList: React.FC<FriendListProps> = ({ friends }) => {
  return (
    <div className="space-y-2">
      <h3 className="px-3 text-lg font-bold text-slate-700">Your Circle</h3>
      {friends.map(friend => (
        <FriendListItem key={friend.id} friend={friend} />
      ))}
    </div>
  );
};

export default FriendList;
