# syncUp
In today’s fast-paced world, staying connected with friends and meeting new people nearby can be challenging. We noticed that coordinating social activities often involves multiple apps, manual scheduling, and uncertainty about who’s available and when. There is no simple way to know when friends are free, nearby, or engaged in an activity you could join. Coordinating social time can be stressful, especially with **conflicting schedules** and last-minute changes. Busy lifestyles also make it difficult to **keep up with friends** without fear of avoid overcommitting.

We were inspired by the desire to strengthen human connections and make social coordination effortless. Urban neighborhoods and campuses can feel particularly isolating, where residents and students rarely interact meaningfully. As such, we wanted to build a solution that makes **connecting easier, more spontaneous, and stress-free**. 

## Credits
Created by Viba Raghunathan and Brady Manske for DubHacks 2025

## Features
syncUp aims to support connections both old and new, by providing the user with **two toggleable modes** at the top of the interface:

### Friends Mode (“My Circle”)
Designed for supporting existing social circles. Users can connect with friends, view availability, and coordinate hangouts between schedules effortlessly.

#### Core features:
- **Friend System:** Add friends via username, contact sync, or QR code.
- **Live Map View:** Display approximate friend locations using Mapbox API.  
- **Availability Sync:** Import Google/Apple Calendar to mark blocks as free, busy, or social.  
- **Activity Sharing:** Post “Join Me” invites visible only to friends.  
- **Smart Notifications (AI-ready):** AI detects overlapping availability and proximity, suggesting spontaneous hangouts between close friends.  
- **Privacy Controls:** Toggle location visibility or restrict sharing per friend.  

### Community Mode (“Discover”)
Focused on expanding one’s social network by connecting users with shared interests nearby.

#### Core features:
- **Interest Profile:** Select tags/interests (music, coffee, hiking, etc.).  
- **Proximity Matching:** Show nearby users with overlapping interests.  
- **Event & Hangout Discovery:** Join open micro-events (e.g., “study session at the library”).  
- **Friendship Suggestions (AI-ready):** Recommend potential connections based on shared availability and interests.  
- **Chat + Icebreakers:** In-app chat with starter prompts.  
- **Safety Layer:** Verified accounts and radius-based location to protect privacy.  


Essentially, syncUp aims to **turn urban isolation into connectedness**, fostering both personal and community growth by making social coordination seamless, fun, and meaningful.  

## Tech Stack
### Front-End
- Vita, React, Tailwind CSS
### Back-End
- FireBase
### APIs & Integration
- Mapbox
- Google AI Studio

## What's next for syncUp?
### AI Enhancements
- Use smart clustering and embeddings to match users by activity patterns & interests
- Predict best hangout windows based on friend calendar overlap
- Learn from sentiment & engagement patterns to recommend hangouts and check-ins between friends
### Calendar API Integration
- Automatic Google/Apple calendar import & integration
- Parse social, busy, & free time blocks from user's existing calendars
### Mobile Push Notifications
- Utilize push notifications to encourage spontaneous situational hangouts with nearby friends
