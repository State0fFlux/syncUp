import React, { useRef, useEffect } from 'react';
import { User, UserStatus } from '../types';
import { mapboxAccessToken } from '../config';

// Add a global declaration for mapboxgl since it's loaded from a script tag
declare const mapboxgl: any;

interface MapViewProps {
  users: User[];
  currentUser: User;
}

const MapView: React.FC<MapViewProps> = ({ users, currentUser }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);

  const isTokenMissing = !mapboxAccessToken;

  // Initialize map
  useEffect(() => {
    if (isTokenMissing || !mapContainer.current) return;
    if (map.current) return; // initialize map only once

    mapboxgl.accessToken = mapboxAccessToken;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [currentUser.location.lng, currentUser.location.lat],
      zoom: 12,
    });
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, [isTokenMissing, currentUser.location]);

  // Update markers when users change
  useEffect(() => {
    if (isTokenMissing || !map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    [currentUser, ...users].forEach(user => {
      const el = document.createElement('div');
      el.className = 'w-12 h-12 rounded-full border-4 border-white shadow-xl bg-cover bg-center cursor-pointer';
      el.style.backgroundImage = `url(${user.avatarUrl})`;

      const statusColors: { [key in UserStatus]: string } = {
        [UserStatus.Free]: '#22c55e',
        [UserStatus.Social]: '#3b82f6',
        [UserStatus.Busy]: '#ef4444',
      };

      const statusEl = document.createElement('span');
      statusEl.className = 'absolute -top-1 -right-1 block h-4 w-4 rounded-full border-2 border-white';
      statusEl.style.backgroundColor = statusColors[user.status];
      el.appendChild(statusEl);

      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([user.location.lng, user.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 35, closeButton: false }).setHTML(
            `<div class="p-1 text-center">
               <h3 class="font-bold text-md text-slate-800">${user.name}</h3>
               <p class="text-sm text-slate-600">${user.location.zone}</p>
             </div>`
          )
        )
        .addTo(map.current);

      markers.current.push(marker);
    });

  }, [users, currentUser, isTokenMissing]);

  if (isTokenMissing) {
    return (
      <div className="relative w-full h-96 bg-slate-200 rounded-2xl overflow-hidden shadow-inner p-4 text-center flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <h3 className="font-bold text-slate-700 mt-4">Map View Disabled</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-xs">
          Please provide a valid Mapbox Access Token via the MAPBOX_ACCESS_TOKEN environment variable to enable the interactive map.
        </p>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-96 rounded-2xl shadow-lg" />;
};

export default MapView;