
import { User, Activity, UserStatus } from '../types';

export const MOCK_CURRENT_USER_ID = 'user-1';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'You',
    avatarUrl: `https://m.media-amazon.com/images/I/41miU+cgrLL._UF1000,1000_QL80_.jpg`,
    status: UserStatus.Free,
    interests: ['music', 'coffee', 'fitness', 'startups'],
    location: { lat: 47.6540, lng: -122.3100, zone: 'UW West Campus' },
    friends: ['user-3', 'user-4', 'user-6'],
    bio: "Add bio..."
  },
  {
    id: 'user-2',
    name: 'Maya',
    avatarUrl: `https://m.media-amazon.com/images/I/41FsVcMh1RL._UF1000,1000_QL80_.jpg`,
    status: UserStatus.Social,
    interests: ['hiking', 'art', 'coffee'],
    location: { lat: 47.6600, lng: -122.3080, zone: 'UW North Campus' },
    friends: ['user-1'],
    bio: ""
  },
  {
    id: 'user-3',
    name: 'Alex',
    avatarUrl: `https://m.media-amazon.com/images/I/41B3Q0XgFVL._UF1000,1000_QL80_.jpg`,
    status: UserStatus.Busy,
    interests: ['tech', 'gaming', 'startups'],
    location: { lat: 47.6255, lng: -122.3205, zone: 'Capitol Hill' },
    friends: ['user-1', 'user-4'],
    bio: ""
  },
  {
    id: 'user-4',
    name: 'Chloe',
    avatarUrl: `https://m.media-amazon.com/images/I/41mSIgdsHvL.jpg`,
    status: UserStatus.Free,
    interests: ['music', 'reading', 'yoga'],
    location: { lat: 47.6270, lng: -122.3220, zone: 'Capitol Hill' },
    friends: ['user-1', 'user-3'],
    bio: ""
  },
  {
    id: 'user-5',
    name: 'Ben',
    avatarUrl: `https://m.media-amazon.com/images/I/41ONa5HOwfL.jpg`,
    status: UserStatus.Free,
    interests: ['fitness', 'startups', 'coffee'],
    location: { lat: 47.6585, lng: -122.3055, zone: 'University of Washington' },
    friends: [],
    bio: ""
  },
  {
    id: 'user-6',
    name: 'Sara',
    avatarUrl: `https://m.media-amazon.com/images/I/41IK02LISNL._UF1000,1000_QL80_.jpg`,
    status: UserStatus.Social,
    interests: ['art', 'music', 'foodie'],
    location: { lat: 47.6570, lng: -122.3035, zone: 'University of Washington' },
    friends: [],
    bio: ""
  },
];


export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'activity-1',
    authorId: 'user-2',
    title: 'Grabbing coffee!',
    location: 'Verve Coffee',
    time: '2-4pm',
    type: 'Join Me',
  },
  {
    id: 'activity-2',
    authorId: 'user-6',
    title: 'Study group for finals',
    location: 'Suzzallo Library',
    time: 'Now until 5pm',
    type: 'Micro-Event',
  },
  {
    id: 'activity-3',
    authorId: 'user-4',
    title: 'Yoga in the park',
    location: 'Grand Park',
    time: '6pm',
    type: 'Join Me',
  },
];
