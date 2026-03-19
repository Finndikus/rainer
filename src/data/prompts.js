export const CATEGORIES = [
  'All',
  'Writing',
  'Data Analysis',
  'Methodology',
  'Literature',
  'Review & Feedback'
];

export const PROMPTS = [
  {
    id: 'sci-1',
    title: 'Peer Reviewer (Double-Blind)',
    useCase: 'Get rigorous, critical feedback on an academic manuscript.',
    promptText: 'Act as a strict, impartial peer reviewer for a high-impact scientific journal. Review the following abstract/excerpt for methodological rigor, clarity, novel contribution, and potential biases. Point out weaknesses directly: [Insert Text]',
    category: 'Review & Feedback',
    instructions: 'Paste an excerpt of your paper in the bracketed area. The AI will output a formal critique highlighting gaps in your logic and suggesting improvements.'
  },
  {
    id: 'sci-2',
    title: 'Statistical Analyst Advisor',
    useCase: 'Choose the correct statistical test for your research data.',
    promptText: 'Act as a senior biostatistician. I have a dataset with [X independent variables, continuous/categorical] and [Y dependent variables, continuous/categorical]. My research question is [Question]. What statistical models or methods should I use, and what assumptions do I need to check?',
    category: 'Data Analysis',
    instructions: 'Fill in the blanks with your exact variables and research question. The AI will provide a step-by-step roadmap for your statistical analysis.'
  },
  {
    id: 'sci-3',
    title: 'Literature Synthesizer',
    useCase: 'Condense multiple papers into a cohesive literature review paragraph.',
    promptText: 'Act as an expert academic writer. Synthesize the findings from the following three abstracts into a single, cohesive paragraph suitable for the "Introduction" section of a research paper. Emphasize the consensus and the conflicting results: [Insert Abstracts]',
    category: 'Literature',
    instructions: 'Copy and paste the abstracts of several related papers. The AI will write a smooth, academic synthesis, resolving the differing viewpoints.'
  },
  {
    id: 'sci-4',
    title: 'Methodology Formulator',
    useCase: 'Draft a robust methodology section for a grant proposal.',
    promptText: 'Act as an expert methodologist. I am proposing a study to investigate [Research Topic] in [Target Population]. Outline a robust, modern methodology, including study design, sampling strategy, data collection instruments, and potential limitations.',
    category: 'Methodology',
    instructions: 'Describe your topic and population. The output will be a highly structured methodological blueprint ready to be adapted for your proposal.'
  },
  {
    id: 'sci-5',
    title: 'Academic Abstract Generator',
    useCase: 'Distill a full paper draft into a strict 250-word abstract.',
    promptText: 'Act as an editor for a prestigious scientific journal. Read the following paper introduction and conclusion, and generate a 250-word abstract structured into: Background, Methods, Results, and Conclusions. [Insert Text]',
    category: 'Writing',
    instructions: 'Provide the core of your paper. The AI will condense it into a structured, highly dense academic abstract meeting standard journal guidelines.'
  }
];
