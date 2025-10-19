
import React from 'react';
import { Activity, User } from '../types';
import JoinButton from '../components/JoinButton';

interface ActivityCardProps {
  activity: Activity;
  author: User | undefined;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, author }) => {
  if (!author) return null;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md w-full flex items-start space-x-4">
      <img src={author.avatarUrl} alt={author.name} className="w-12 h-12 rounded-full object-cover"/>
      <div className="flex-1">
        <p className="text-sm text-slate-500">
          <span className="font-bold text-slate-800">{author.name}</span> posted a {activity.type === 'Join Me' ? 'hangout' : 'public event'}:
        </p>
        <h3 className="text-lg font-bold text-primary mt-1">{activity.title}</h3>
        <div className="text-xs text-slate-600 mt-2 flex items-center space-x-4">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            {activity.location}
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
            {activity.time}
          </span>
        </div>
      </div>
      <JoinButton></JoinButton>
    </div>
  );
};

export default ActivityCard;
