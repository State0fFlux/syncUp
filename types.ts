
export enum AppMode {
  Friends = 'My Circle',
  Community = 'Discover',
  Profile = "Profile"
}

export enum UserStatus {
  Free = 'free',
  Busy = 'busy',
  Social = 'social',
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: UserStatus;
  interests: string[];
  location: {
    lat: number;
    lng: number;
    zone: string;
  };
  friends: string[]; // array of user ids
  bio: string;
}

export interface Activity {
  id: string;
  authorId: string;
  title: string;
  location: string;
  time: string;
  type: 'Join Me' | 'Micro-Event';
}
