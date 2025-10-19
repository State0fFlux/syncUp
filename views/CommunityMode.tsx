
import React from 'react';
import { User, Activity } from '../types';
import UserProfileCard from '../components/UserProfileCard';
import ActivityCard from '../components/ActivityCard';

interface CommunityModeProps {
  currentUser: User;
  potentialConnections: User[];
  communityEvents: Activity[];
  allUsers: User[];
  onConnect: (user: User) => void;
}

const CommunityMode: React.FC<CommunityModeProps> = ({ currentUser, potentialConnections, communityEvents, allUsers, onConnect }) => {
  return (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="px-3 mb-3 text-lg font-bold text-slate-700">Local Events</h3>
        {communityEvents.length > 0 ? (
          <div className="space-y-3">
            {communityEvents.map(activity => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                author={allUsers.find(u => u.id === activity.authorId)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-4">No community events nearby right now.</p>
        )}
      </div>

      <div>
        <h3 className="px-3 mb-3 text-lg font-bold text-slate-700">People to Discover</h3>
        <div className="space-y-4">
          {potentialConnections.map(user => (
            <UserProfileCard 
              key={user.id} 
              user={user} 
              currentUser={currentUser}
              onConnect={onConnect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityMode;
