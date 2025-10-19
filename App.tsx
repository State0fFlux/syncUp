import React, { useState, useMemo, useEffect } from 'react';
import { AppMode, User, Activity } from './types';
import { fetchAllUsers, fetchAllActivities } from './services/firebaseService';
import { useAuth } from './AuthContext';
import { Bell } from "lucide-react";


import Auth from './Auth';
import ModeToggle from './components/ModeToggle';
import FriendsMode from './views/FriendsMode';
import CommunityMode from './views/CommunityMode';
import { ProfilePage } from './views/ProfilePage';
import NotificationPage from './views/NotificationPage';
import ChatBox from './components/ChatBox';
import Banner from './components/banner';

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
  const { user: firebaseUser, loading: authLoading } = useAuth();
  
  const [mode, setMode] = useState<AppMode>(AppMode.Friends);
  const [chattingWith, setChattingWith] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);



  useEffect(() => {
    // Only fetch data if a user is logged in.
    if (!firebaseUser) {
      setDataLoading(false);
      return;
    };

    const loadData = async () => {
      setDataLoading(true);
      try {
        const [users, activities] = await Promise.all([
          fetchAllUsers(),
          fetchAllActivities(),
        ]);
        setAllUsers(users);
        setAllActivities(activities);
      } catch (error) {
        console.error("Failed to load app data", error);
      } finally {
        setDataLoading(false);
      }
    };
    loadData();
  }, [firebaseUser]);

  const { currentUser, friends, potentialConnections, communityEvents } = useMemo(() => {
    if (!firebaseUser) {
      return { currentUser: null, friends: [], potentialConnections: [], communityEvents: [] };
    }

    // NOTE: In a real app, you MUST ensure a user profile document exists in Firestore
    // with an ID that matches the Firebase Auth user's UID.
    // For this demo with mock data, we'll fall back to 'user-1' if the UID isn't found.
    const currentUserId = firebaseUser.uid;
    let user = allUsers.find(u => u.id === currentUserId);
    
    if (!user) {
      // This fallback makes the app work with mock data without a real Firestore entry.
      // In production, you might want to show an error or a profile creation screen.
      user = allUsers.find(u => u.id === 'user-1');
    }
    
    if (!user) {
      return { currentUser: null, friends: [], potentialConnections: [], communityEvents: [] };
    }
    
    const friendList = allUsers.filter(u => user!.friends.includes(u.id));
    const nonFriends = allUsers.filter(u => u.id !== user!.id && !user!.friends.includes(u.id));
    const events = allActivities.filter(act => act.type === 'Micro-Event');

    return { 
      currentUser: user,
      friends: friendList, 
      potentialConnections: nonFriends,
      communityEvents: events
    };
  }, [allUsers, allActivities, firebaseUser]);

  const showPopup = (msg: string) => {
  setBannerMessage(msg);
  };

  const handleConnect = (user: User) => {
    setChattingWith(user);
  };
  
  const handleCloseChat = () => {
    setChattingWith(null);
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-center">
           <HeaderIcon />
           <p className="mt-4 text-lg font-semibold text-brand-dark animate-pulse">Syncing up...</p>
        </div>
      </div>
    );
  }

const handleSendMessage = () => {
  // Close chat window
  handleCloseChat();

  // Show success banner
  showPopup("Message sent!");
};
  
  const handleProfileUpdate = () => {
    showPopup("Profile updated!");
    setMode(AppMode.Friends);
}


  // If loading is finished and there's still no user, show the Auth page.
  if (!firebaseUser) {
    return <Auth />;
  }

  // If user is authenticated but we couldn't find their profile data.
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light text-center p-4">
        <div>
          <h2 className="text-xl font-bold text-red-600">Error: User Profile Not Found</h2>
          <p className="text-slate-600 mt-2">
            You are authenticated, but we couldn't find a user profile for you in the database.
            Please ensure a document exists in the 'users' collection with the ID: <br />
            <strong className="font-mono text-sm break-all">{firebaseUser.uid}</strong>
          </p>
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
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <button
              onClick={() => setShowNotifications(true)}
              className="relative rounded-full p-2 transition-colors duration-300 ease-in-out hover:bg-indigo-100"
            >
              <Bell className="w-6 h-6 text-slate-700" />
              {hasNotifications && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => setShowProfile(true)}
              className="rounded-full p-1 transition-colors duration-300 ease-in-out hover:bg-indigo-100"
            >
              <img
                src={currentUser.avatarUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>
          </div>  
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
                 <ChatBox currentUser={currentUser} otherUser={chattingWith} onSend={handleSendMessage} />
             </div>
           </div>
        )}

        {bannerMessage && (
          <Banner
            message={bannerMessage}
            onClose={() => setBannerMessage(null)}
          />
        )}

        {/* Profile Modal */}
        {showProfile && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-end justify-center">
            <div className="w-full max-w-lg relative">
              <button
                onClick={() => setShowProfile(false)}
                className="absolute -top-12 right-4 bg-white/80 p-2 rounded-full text-slate-700"
              >
                ✕
              </button>
              <ProfilePage
                currentUser={currentUser}
                setCurrentUser={(u) => {
                  setAllUsers(prev => prev.map(user => user.id === u.id ? u : user));
                }}
                onSave={handleProfileUpdate}
              />
            </div>
          </div>
        )}

        {/* Notifications Modal */}
        {showNotifications && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-end justify-center">
            <div className="w-full max-w-lg relative">
              <button
                onClick={() => setShowNotifications(false)}
                className="absolute -top-12 right-4 bg-white/80 p-2 rounded-full text-slate-700"
              >
                ✕
              </button>
              <NotificationPage currentUser={currentUser} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
