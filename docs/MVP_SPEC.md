
# MVP Specification for SyncUp

## Project Overview
Build a web app called SyncUp, designed to help users connect with friends or meet new local people based on proximity, shared availability, and interests.

### Modes
- **Friends Mode (“My Circle”):** Coordinate with existing friends.
- **Community Mode (“Discover”):** Meet new local people.

## Mode 1: Friends Mode (“My Circle”)
- **Friend System:** Add friends by username.
- **Live Map View:** Show approximate friend locations with status icons.
- **Availability Sync:** Mock integration with calendars to show "free," "busy," or "social" status.
- **Activity Sharing:** Post “Join Me” events visible only to friends.
- **Notifications (Simulated):** Trigger alerts when friends are nearby and free.
- **Privacy Controls:** Toggle visibility and location sharing.

## Mode 2: Community Mode (“Discover”)
- **Interest Profile:** Users select interests.
- **Proximity Matching:** Approximate radius-based matching.
- **Event & Hangout Discovery:** Display open “micro-events.”
- **Chat + Icebreaker Prompts:** Built-in messaging with AI-generated starter prompts via Gemini API.
- **Safety Layer:** Radius-only visibility, no exact location display.

## MVP Completion Definition
- Users can log in (mocked) and toggle between modes.
- Map view and friend lists are functional with mock data.
- Users can post a “Join Me” activity.
- Community discovery shows potential matches.
- AI icebreaker generation is functional.
- All privacy and visibility controls are present in the UI.
