import React, { useState, useMemo, useEffect } from 'react';
import { AppMode, User, Activity } from './types';
import { fetchAllUsers, fetchAllActivities } from './services/firebaseService';
import ModeToggle from './components/ModeToggle';
import FriendsMode from './views/FriendsMode';
import CommunityMode from './views/CommunityMode';
import ChatBox from './components/ChatBox';

const HeaderIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary">
        <path d="M12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8C6 4.68629 8.68629 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 14V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 8L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 8L3 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.Friends);
  const [chattingWith, setChattingWith] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [users, activities] = await Promise.all([
          fetchAllUsers(),
          fetchAllActivities(),
        ]);
        setAllUsers(users);
        setAllActivities(activities);
      } catch (error) {
        console.error("Failed to load app data", error);
        // You could set an error state here to show a message to the user
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const { currentUser, friends, potentialConnections, communityEvents } = useMemo(() => {
    // This identifies the "logged in" user from the data. In a real app, this would come from an auth service.
    const MOCK_CURRENT_USER_ID = 'user-1';
    
    const user = allUsers.find(u => u.id === MOCK_CURRENT_USER_ID);
    
    if (!user) {
      return { currentUser: null, friends: [], potentialConnections: [], communityEvents: [] };
    }
    
    const friendList = allUsers.filter(u => user.friends.includes(u.id));
    const nonFriends = allUsers.filter(u => u.id !== user.id && !user.friends.includes(u.id));
    const events = allActivities.filter(act => act.type === 'Micro-Event');

    return { 
      currentUser: user,
      friends: friendList, 
      potentialConnections: nonFriends,
      communityEvents: events
    };
  }, [allUsers, allActivities]);

  const handleConnect = (user: User) => {
    setChattingWith(user);
  };
  
  const handleCloseChat = () => {
    setChattingWith(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-center">
           <HeaderIcon />
           <p className="mt-4 text-lg font-semibold text-brand-dark animate-pulse">Syncing up...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light text-center">
        <div>
          <h2 className="text-xl font-bold text-red-600">Loading Error</h2>
          <p className="text-slate-600 mt-2">Could not load user data. Please ensure your Firebase configuration is correct and your database is populated.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light font-sans antialiased">
      <div className="container mx-auto max-w-lg relative pb-28">
        <header className="p-4 flex justify-between items-center sticky top-0 z-10 bg-brand-light/80 backdrop-blur-lg">
          <div className="flex items-center space-x-2">
            <HeaderIcon/>
            <h1 className="text-2xl font-bold text-brand-dark">SyncUp</h1>
          </div>
          <img src={currentUser.avatarUrl} alt="Your Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
        </header>
        
        <div className="flex justify-center my-4">
            <ModeToggle currentMode={mode} onModeChange={setMode} />
        </div>

        <main>
          {mode === AppMode.Friends ? (
            <FriendsMode 
              currentUser={currentUser}
              friends={friends} 
              activities={allActivities}
              allUsers={allUsers}
            />
          ) : (
            <CommunityMode 
              currentUser={currentUser}
              potentialConnections={potentialConnections}
              communityEvents={communityEvents}
              allUsers={allUsers}
              onConnect={handleConnect}
            />
          )}
        </main>

        {/* Chat Modal */}
        {chattingWith && (
           <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-end justify-center">
             <div className="w-full max-w-lg relative">
                 <button onClick={handleCloseChat} className="absolute -top-12 right-4 bg-white/80 p-2 rounded-full text-slate-700">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                 </button>
                 <ChatBox currentUser={currentUser} otherUser={chattingWith} />
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default App;
