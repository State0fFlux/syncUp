
import React, { useState, useCallback } from 'react';
import { User } from '../types';
import { generateIcebreaker } from '../services/aiService';

interface ChatBoxProps {
  currentUser: User;
  otherUser: User;
}

const ChatBox: React.FC<ChatBoxProps> = ({ currentUser, otherUser }) => {
  const [message, setMessage] = useState('');
  const [icebreaker, setIcebreaker] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateIcebreaker = useCallback(async () => {
    setIsLoading(true);
    setIcebreaker('');
    try {
      const sharedInterests = currentUser.interests.filter(interest => otherUser.interests.includes(interest));
      const result = await generateIcebreaker(sharedInterests);
      setIcebreaker(result);
    } catch (error) {
      console.error("Failed to generate icebreaker", error);
      setIcebreaker("Sorry, couldn't generate a prompt right now.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser.interests, otherUser.interests]);
  
  const handleUseIcebreaker = () => {
    if (icebreaker) {
      setMessage(icebreaker);
      setIcebreaker('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-t-2xl shadow-lg border-t border-slate-200">
      <div className="text-center mb-4">
        <h3 className="font-bold">Chat with {otherUser.name}</h3>
        <p className="text-xs text-slate-500">This is a simulated chat interface.</p>
      </div>

      {icebreaker && (
        <div className="bg-indigo-100 p-3 rounded-lg mb-3 text-center">
            <p className="text-sm text-indigo-800 italic">"{icebreaker}"</p>
            <button onClick={handleUseIcebreaker} className="mt-2 text-xs font-semibold text-brand-primary hover:underline">Use this opener</button>
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <button onClick={handleGenerateIcebreaker} disabled={isLoading} className="p-2 bg-slate-100 rounded-full text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
            )}
        </button>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${otherUser.name}...`}
          className="flex-1 p-3 bg-slate-100 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
        <button className="p-3 bg-brand-primary text-white rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
