# syncUp
In today’s fast-paced world, staying connected with friends and meeting new people nearby can be challenging. We noticed that coordinating social activities often involves multiple apps, manual scheduling, and uncertainty about who’s available and when. There is no simple way to know when friends are free, nearby, or engaged in an activity you could join. Coordinating social time can be stressful, especially with **conflicting schedules** and last-minute changes. Busy lifestyles also make it difficult to **keep up with friends** without fear of avoid overcommitting.

We were inspired by the desire to strengthen human connections and make social coordination effortless. Urban neighborhoods and campuses can feel particularly isolating, where residents and students rarely interact meaningfully. As such, we wanted to build a solution that makes **connecting easier, more spontaneous, and stress-free**. 
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

## Our Challenges
Working with Google AI Studio was a challenge for the both of us, as this was our first time working with prompt engineering at this scale. One of the challenges we faced related to this first phase was building the right base. We experimented with a variety of prompts and platforms until we had reached an appropriate base to develop upon.

## Our Accomplishments
Working as a team of two, we are incredibly proud of the amount of progress we in carrying out our app's implementation. While there is still much to improve for syncUp, we are proud of our app's design and its approach to solving modern issues in the social world, all within such a tight deadline. 

## Our Lessons
A key lesson that our team learned during the development of syncUp is the power of AI, when used strategically. When experimenting with prompt engineering, we found it was vital to plan out our app concept in heavy detail, including implementation details and file structure, as this improved the quality of the resulting foundation.

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
