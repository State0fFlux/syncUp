
import { User, Activity, UserStatus } from '../types';

export const MOCK_CURRENT_USER_ID = 'user-1';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'You',
    avatarUrl: `https://picsum.photos/seed/you/200`,
    status: UserStatus.Free,
    interests: ['music', 'coffee', 'fitness', 'startups'],
    location: { lat: 34.0522, lng: -118.2437, zone: 'Downtown LA' },
    friends: ['user-2', 'user-3', 'user-4'],
  },
  {
    id: 'user-2',
    name: 'Maya',
    avatarUrl: `https://picsum.photos/seed/maya/200`,
    status: UserStatus.Social,
    interests: ['hiking', 'art', 'coffee'],
    location: { lat: 34.06, lng: -118.25, zone: 'Echo Park' },
    friends: ['user-1'],
  },
  {
    id: 'user-3',
    name: 'Alex',
    avatarUrl: `https://picsum.photos/seed/alex/200`,
    status: UserStatus.Busy,
    interests: ['tech', 'gaming', 'startups'],
    location: { lat: 34.1, lng: -118.3, zone: 'Hollywood' },
    friends: ['user-1', 'user-4'],
  },
  {
    id: 'user-4',
    name: 'Chloe',
    avatarUrl: `https://picsum.photos/seed/chloe/200`,
    status: UserStatus.Free,
    interests: ['music', 'reading', 'yoga'],
    location: { lat: 34.04, lng: -118.26, zone: 'Arts District' },
    friends: ['user-1', 'user-3'],
  },
  {
    id: 'user-5',
    name: 'Ben',
    avatarUrl: `https://picsum.photos/seed/ben/200`,
    status: UserStatus.Free,
    interests: ['fitness', 'startups', 'coffee'],
    location: { lat: 34.055, lng: -118.24, zone: 'Little Tokyo' },
    friends: [],
  },
  {
    id: 'user-6',
    name: 'Sara',
    avatarUrl: `https://picsum.photos/seed/sara/200`,
    status: UserStatus.Social,
    interests: ['art', 'music', 'foodie'],
    location: { lat: 34.07, lng: -118.23, zone: 'Silver Lake' },
    friends: [],
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
