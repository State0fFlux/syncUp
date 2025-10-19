
import React from 'react';
import { User, Activity } from '../types';
import MapView from '../components/MapView';
import FriendList from '../components/FriendList';
import ActivityCard from '../components/ActivityCard';

interface FriendsModeProps {
  currentUser: User;
  friends: User[];
  activities: Activity[];
  allUsers: User[];
}

const FriendsMode: React.FC<FriendsModeProps> = ({ currentUser, friends, activities, allUsers }) => {
  const friendActivities = activities.filter(act => act.type === 'Join Me' && currentUser.friends.includes(act.authorId));

  return (
    <div className="space-y-6 p-4">
      <MapView users={friends} currentUser={currentUser} />

      {friendActivities.length > 0 && (
        <div className="space-y-3">
          <h3 className="px-3 text-lg font-bold text-slate-700">Join Me!</h3>
          {friendActivities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              author={allUsers.find(u => u.id === activity.authorId)}
            />
          ))}
        </div>
      )}

      <FriendList friends={friends} />
    </div>
  );
};

export default FriendsMode;
