export const CATEGORIES = [
  'All',
  'Academic',
  'Business',
  'Creative',
  'Technical',
  'Language'
];

export const PROMPTS = [
  {
    id: '1',
    title: 'Presentation Creator',
    useCase: 'Generate a structured outline for a presentation.',
    promptText: 'Act as a professional slide designer. Create a 10-slide outline for [Topic] including visual suggestions and speaker notes.',
    category: 'Creative',
    instructions: 'Replace "[Topic]" with the subject of your presentation. Use the output as a framework in tools like PowerPoint or Keynote to rapidly build your slides.'
  },
  {
    id: '2',
    title: 'Email Professionalizer',
    useCase: 'Elevate the tone of a casual or rough draft email.',
    promptText: 'Rewrite the following email to be more persuasive and professional while maintaining a friendly tone: [Insert Text].',
    category: 'Business',
    instructions: 'Paste your draft email text in place of "[Insert Text]". The AI will return a polished, corporate-ready version that remains approachable.'
  },
  {
    id: '3',
    title: 'Executive Summary',
    useCase: 'Distill lengthy documents into key takeaways.',
    promptText: 'Condense the following complex document into 5 bullet points for a CEO-level briefing.',
    category: 'Business',
    instructions: 'Paste the contents of your long document after the prompt. This is ideal for quickly summarizing long reports, meeting transcripts, or strategic documents.'
  },
  {
    id: '4',
    title: 'English Formulator',
    useCase: 'Translate thoughts into high-level business English.',
    promptText: 'Transform my casual German/English thoughts into high-level, idiomatic business English suitable for a formal report.',
    category: 'Language',
    instructions: 'Provide your notes or sentences in casual English (or German) after this prompt. The AI will output sophisticated vocabulary and perfect grammar suitable for formal communication.'
  },
  {
    id: '5',
    title: "The 'Deep Dive' Researcher",
    useCase: 'Build a roadmap to master a new subject.',
    promptText: 'Create a comprehensive reading list and a conceptual roadmap for a beginner to become an expert in [Topic].',
    category: 'Academic',
    instructions: 'Replace "[Topic]" with any subject you wish to learn. The AI will generate a step-by-step learning journey, complete with book recommendations and core concepts to grasp.'
  },
  {
    id: '6',
    title: 'Code Review Assistant',
    useCase: 'Analyze code for bugs and improvements.',
    promptText: 'Act as a Senior Software Engineer. Please review the following code for potential bugs, performance bottlenecks, and adherence to clean code principles: [Insert Code].',
    category: 'Technical',
    instructions: 'Paste your code snippet in place of "[Insert Code]". Use this prompt to get actionable feedback before submitting a pull request.'
  }
];
