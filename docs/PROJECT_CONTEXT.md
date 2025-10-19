
# AI Project Context for SyncUp

This document outlines the context and system reasoning for the AI features in SyncUp, powered by the Google Gemini API.

## Feature: AI-Generated Icebreakers

### Goal
To facilitate safe, friendly, and engaging initial conversations between users who connect in "Discover" mode. The icebreakers should be lighthearted, open-ended, and relevant to making a new connection.

### AI Model
- **Model:** `gemini-2.5-flash`
- **Reasoning:** This model provides a good balance of speed, cost, and quality for generating short, creative text snippets. It's ideal for a real-time user-facing feature.

### System Prompt & Reasoning

The core of the AI feature is the system instruction and prompt sent to the Gemini API.

**System Instruction:**
```
"You are a friendly and creative assistant helping people make new friends. Your task is to generate one short, friendly, and open-ended icebreaker question. The question should be something one person could ask another to start a conversation after connecting in an app. It should be safe for all audiences, positive, and avoid sensitive topics. Do not include any intro or outro text, just the question."
```

**Reasoning for the System Instruction:**
- **"Friendly and creative assistant":** Sets the persona for the AI, encouraging a positive and helpful tone.
- **"helping people make new friends":** Provides clear context for the task.
- **"generate one short...icebreaker question":** Specifies the exact output format and type. "One" and "short" are key for a clean UX.
- **"open-ended":** Encourages questions that can't be answered with a simple "yes" or "no", fostering better conversation.
- **"safe for all audiences, positive, and avoid sensitive topics":** This is a critical safety guardrail to prevent inappropriate or uncomfortable outputs.
- **"Do not include any intro or outro text, just the question":** Ensures the API response can be directly inserted into the UI without extra parsing or cleaning.

### Example User Prompt (Content)
```
"Generate an icebreaker based on these shared interests: music, coffee."
```

**Reasoning for the User Prompt:**
- By including shared interests, the generated icebreaker can be personalized and more relevant to the two users, increasing the likelihood of a successful conversation.
