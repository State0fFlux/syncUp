// src/views/ProfilePage.tsx
import React, { useState } from "react";
import { User } from "../types";
import { updateUserProfile } from "../services/firebaseService";
import { auth } from "../services/firebaseService";
import { signOut } from "firebase/auth";



type ProfilePageProps = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  onSave: () => void;
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, setCurrentUser, onSave }) => {
  const [bio, setBio] = useState(currentUser.bio || "");
  const [interests, setInterests] = useState<string[]>(currentUser.interests || []);
  const [photo, setPhoto] = useState(currentUser.avatarUrl || "");

  const allInterests = ["Hiking", "Music", "Tech", "Cooking", "Art", "Gaming", "Fashion", "Design", "Sports", "Film"];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const updatedUser = { ...currentUser, bio, interests, avatarUrl: photo };
    await updateUserProfile(currentUser.id, { bio, interests, avatarUrl: photo });
    setCurrentUser(updatedUser);
    alert("Profile updated!");
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload(); // or redirect to Auth page
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>

      <div className="flex flex-col items-center gap-3">
        <img
          src={photo || "https://placehold.co/100x100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <label className="text-sm text-blue-600 cursor-pointer">
          Change Picture
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
        </label>
      </div>

      <textarea
        className="mt-4 w-full p-2 border rounded-lg"
        placeholder="Write a short bio..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <div className="mt-4">
        <h2 className="font-semibold mb-2">Select Interests</h2>
        <div className="flex flex-wrap gap-2">
          {allInterests.map((interest) => (
            <button
              key={interest}
              onClick={() =>
                setInterests((prev) =>
                  prev.includes(interest)
                    ? prev.filter((i) => i !== interest)
                    : [...prev, interest]
                )
              }
              className={`px-3 py-1 rounded-full border ${
                interests.includes(interest)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={handleLogout}>
          Log Out
        </button>
        <button 
            onClick={onSave}
            className="join text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-40 transition-opacity">
            Save Changes
        </button>
      </div>
    </div>
  );
};
