export function buildOutlinePrompt(topic) {
    return `You are a curriculum designer for "Text-to-Learn", a product that turns a single
  topic into a structured online course.
  
  Design a course for this topic: "${topic}"
  
  Rules:
  - 3 to 6 modules, ordered from foundational to advanced.
  - Each module has 2 to 5 lessons, each with a short, specific, learner-facing title
    (not a chapter number, an actual concept e.g. "Overfitting and Underfitting").
  - Keep the whole course scoped to what a motivated beginner/intermediate learner
    can realistically finish — don't try to cover an entire degree.
  - description is 1-2 sentences, written for someone deciding whether to start the course.
  - tags is an array with exactly 1 short category tag (e.g. "Machine Learning", "Law",
    "Web Development", "History").
  
  Respond with ONLY a JSON object matching exactly this shape, no extra commentary:
  {
    "title": string,
    "description": string,
    "tags": [string],
    "modules": [
      {
        "title": string,
        "lessons": [
          { "title": string }
        ]
      }
    ]
  }`;
  }
  
  export function buildLessonPrompt({ courseTitle, courseDescription, moduleTitle, lessonTitle }) {
    return `You are writing one lesson inside the course "${courseTitle}" (${courseDescription}).
  
  This lesson is part of the module "${moduleTitle}" and covers: "${lessonTitle}".
  
  Write the full lesson as a JSON object with this exact shape:
  {
    "title": "${lessonTitle}",
    "objectives": [string, string, string],
    "content": [ ...blocks... ]
  }
  
  "objectives" is 3 short bullet points describing what the learner will be able to do
  after this lesson.
  
  "content" is an ordered array of 5 to 9 blocks that teach the lesson. Each block is one
  of the following shapes:
  
  - Heading: { "type": "heading", "text": string } — use 1-3 of these to break up sections.
  - Paragraph: { "type": "paragraph", "text": string } — 2-5 sentences of clear,
    well-explained teaching prose. Use several of these; this is most of the lesson.
  - Code: { "type": "code", "language": string, "text": string } — ONLY include this if
    the topic is programming/technical and a short code example genuinely helps. Omit
    entirely for non-technical subjects (law, history, biology, etc.).
  - Video: { "type": "video", "query": string } — exactly ONE of these, with a short
    YouTube search query that would find a good explainer video for this exact lesson.
  - MCQ: { "type": "mcq", "question": string, "options": [string, string, string],
    "answer": number, "explanation": string } — include 3-6 of these blocks 
    throughout the lesson to test understanding. You can place them after 
    complex sections or at the very end. "answer" is the 0-based index of the 
    correct option. "explanation" explains why that option is correct.
  
  Order blocks like a well-taught lesson: intro paragraph, heading + explanation for each
  sub-topic, an optional code example where relevant, the video, then the MCQ last.
  
  Respond with ONLY the JSON object, no extra commentary, no markdown code fences.`;
  }