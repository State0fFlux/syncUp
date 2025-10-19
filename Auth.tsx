import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from './services/firebaseService';
import { ensureUserProfile } from './services/firebaseService';

const HeaderIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary mx-auto">
        <path d="M12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8C6 4.68629 8.68629 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 8L21 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 8L3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const isFirebaseConfigured = !!auth;

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFirebaseConfigured) return;
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        await ensureUserProfile(auth.currentUser!.uid, {
          displayName: auth.currentUser!.displayName || undefined,
          photoURL: auth.currentUser!.photoURL || undefined
        });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await ensureUserProfile(auth.currentUser!.uid, {
          displayName: auth.currentUser!.displayName || undefined,
          photoURL: auth.currentUser!.photoURL || undefined
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured) return;
    setLoading(true);
    setError(null);
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        await ensureUserProfile(auth.currentUser!.uid, {
          displayName: auth.currentUser!.displayName || undefined,
          photoURL: auth.currentUser!.photoURL || undefined
        });
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <HeaderIcon />
        <h1 className="text-3xl font-bold text-center text-brand-dark mt-4">Welcome to SyncUp</h1>
        <p className="text-center text-slate-500 mt-2">
          {isLogin ? 'Sign in to find your circle.' : 'Create an account to get started.'}
        </p>

        {!isFirebaseConfigured && (
            <div className="mt-6 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                <p className="font-bold">Firebase Not Configured</p>
                <p className="text-sm">Authentication is disabled. Please set up your Firebase environment variables to sign in.</p>
            </div>
        )}
        
        <form onSubmit={handleAuthAction} className="mt-8 space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            disabled={!isFirebaseConfigured}
            className="w-full p-3 bg-slate-100 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            disabled={!isFirebaseConfigured}
            className="w-full p-3 bg-slate-100 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
          />
          <button type="submit" disabled={loading || !isFirebaseConfigured} className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:bg-opacity-50">
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
        
        <div className="mt-6 flex items-center justify-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="mx-4 text-sm text-slate-400">OR</span>
            <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <button onClick={handleGoogleSignIn} disabled={loading || !isFirebaseConfigured} className="w-full mt-6 bg-white border border-slate-300 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center space-x-2 disabled:opacity-50">
            <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.487-11.034-8.272l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.99,35.508,44,30.016,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
            <span>Sign in with Google</span>
        </button>

        <p className="mt-8 text-center text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-brand-primary hover:underline ml-1">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;