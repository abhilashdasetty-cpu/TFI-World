import { Quiz } from '../types';

export const QUIZZES_DATA: Quiz[] = [
  {
    id: 'quiz-history',
    title: 'Telugu Cinema History & Milestones',
    category: 'Telugu Cinema History',
    description: 'Test your knowledge on the pioneers, golden era classics, and revolutionary milestones of Telugu cinema.',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 'qh-1',
        question: 'Which film was the very first Telugu sound talkie movie, released in 1931?',
        options: ['Malliswari', 'Bhakta Prahlada', 'Mayabazar', 'Pathala Bhairavi'],
        correctIndex: 1,
        explanation: 'Bhakta Prahlada was directed by H.M. Reddy and released on September 15, 1931, marking the birth of Telugu sound cinema.'
      },
      {
        id: 'qh-2',
        question: 'Which iconic 1957 mythological film was voted "The Greatest Indian Film of All Time" by CNN-IBN in 2013?',
        options: ['Mayabazar', 'Daana Veera Soora Karna', 'Lava Kusa', 'Missamma'],
        correctIndex: 0,
        explanation: 'Mayabazar (1957), directed by K.V. Reddy starring NTR, ANR, and S.V. Ranga Rao, is celebrated as the pinnacle of Indian cinema craft.'
      },
      {
        id: 'qh-3',
        question: 'Who introduced CinemaScope, 70mm stereophonic sound, and cowboy westerns to Telugu cinema?',
        options: ['N.T. Rama Rao', 'Superstar Krishna', 'Chiranjeevi', 'Akkineni Nageswara Rao'],
        correctIndex: 1,
        explanation: 'Superstar Krishna was the fearless technological pioneer of Telugu cinema with films like Alluri Seetharama Raju (CinemaScope) and Mosagallaku Mosagadu.'
      },
      {
        id: 'qh-4',
        question: 'Which 1989 film directed by Ram Gopal Varma and starring Nagarjuna revolutionized Indian sound design and steadycam action?',
        options: ['Geethanjali', 'Khaidi', 'Siva', 'Vikramarkudu'],
        correctIndex: 2,
        explanation: 'Siva (1989) introduced realistic sound effects, steadycam camera movements, and gritty realism, permanently altering Indian cinema grammar.'
      },
      {
        id: 'qh-5',
        question: 'Who was the first Telugu actor in 69 years to win the National Film Award for Best Actor?',
        options: ['Mahesh Babu', 'Allu Arjun', 'Jr. NTR', 'Prabhas'],
        correctIndex: 1,
        explanation: 'Allu Arjun won the National Film Award for Best Actor at the 69th National Film Awards for his performance in Pushpa: The Rise (2021).'
      }
    ]
  },
  {
    id: 'quiz-filmmaking',
    title: 'Filmmaking & Production Pipeline',
    category: 'Filmmaking Stages',
    description: 'Evaluate your understanding of pre-production, on-set shooting, lighting, and post-production techniques.',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 'qf-1',
        question: 'What is the standard rule for shutter speed in cinematic 24fps motion pictures to achieve natural motion blur?',
        options: ['360-degree rule (1/24s)', '180-degree rule (1/48s)', '90-degree rule (1/96s)', '45-degree rule (1/120s)'],
        correctIndex: 1,
        explanation: 'The 180-degree shutter rule states that shutter speed should be 1/(2 × frame rate). For 24fps, it is 1/48s, mimicking natural eye motion blur.'
      },
      {
        id: 'qf-2',
        question: 'Which camera angle looks up at a character from a low vantage point to communicate power and heroism?',
        options: ['High Angle', 'Low Angle', 'Bird\'s-Eye View', 'Dutch Tilt'],
        correctIndex: 1,
        explanation: 'Low-angle shots look up at the subject, elevating their stature and making them appear dominant, authoritative, and larger-than-life.'
      },
      {
        id: 'qf-3',
        question: 'What is the primary function of the "Fill Light" in a standard Three-Point Lighting setup?',
        options: [
          'To create the main highlight and primary cast shadow',
          'To soften and control the contrast of shadows created by the key light',
          'To illuminate the background wall exclusively',
          'To shine directly into the camera lens for flare effects'
        ],
        correctIndex: 1,
        explanation: 'The Fill light sits opposite the Key light to soften harsh shadows and establish the scene\'s contrast ratio without creating new competing shadows.'
      },
      {
        id: 'qf-4',
        question: 'In audio post-production, what does the term "Foley" refer to?',
        options: [
          'Synthesizing electronic music scores with MIDI',
          'Performing and recording everyday physical sound effects (footsteps, cloth, impacts) in sync with video',
          'Exporting encrypted Digital Cinema Packages (DCP)',
          'Compressing audio files into MP3 format'
        ],
        correctIndex: 1,
        explanation: 'Named after sound pioneer Jack Foley, Foley involves artists manually recreating synchronous organic sound effects in a dedicated studio stage.'
      },
      {
        id: 'qf-5',
        question: 'What imaginary guideline must the camera not cross during a scene to maintain consistent left-to-right eye gaze between two characters?',
        options: ['The Golden Ratio', 'The 180-Degree Line', 'The Rule of Fifths', 'The Anamorphic Axis'],
        correctIndex: 1,
        explanation: 'The 180-Degree Rule establishes an imaginary axis between two characters; crossing it causes characters to appear to suddenly look away from each other.'
      }
    ]
  },
  {
    id: 'quiz-storyboard',
    title: 'Storyboarding & Visual Language',
    category: 'Storyboarding',
    description: 'Test your grasp of shot types, camera movements, lens focal lengths, and scene sequencing.',
    timeLimitMinutes: 4,
    questions: [
      {
        id: 'qs-1',
        question: 'Which shot type is primarily used to establish the geographical location and scale of an environment?',
        options: ['Extreme Close-Up (ECU)', 'Extreme Wide Shot (EWS) / Establishing Shot', 'Medium Close-Up (MCU)', 'Insert Shot'],
        correctIndex: 1,
        explanation: 'Extreme Wide Shots (Establishing Shots) show the full environment and spatial context before cutting into character interactions.'
      },
      {
        id: 'qs-2',
        question: 'What is an "Animatic" in the pre-production workflow?',
        options: [
          'The final rendered theatrical movie',
          'An animated sequence of storyboard panels timed to scratch audio, dialogue, and temp music',
          'A written screenplay document',
          'A color-graded digital intermediate reel'
        ],
        correctIndex: 1,
        explanation: 'An animatic is a preliminary video reel made by timing sequential storyboard drawings to temporary dialogue and sound cues to test scene pacing.'
      },
      {
        id: 'qs-3',
        question: 'What camera movement involves swiveling the camera horizontally left or right from a fixed tripod head?',
        options: ['Tilt', 'Pan', 'Dolly', 'Pedestal'],
        correctIndex: 1,
        explanation: 'A Pan moves the camera horizontally on a fixed axis (left or right), while a Tilt moves it vertically (up or down).'
      },
      {
        id: 'qs-4',
        question: 'What is a "Dutch Tilt" or "Canted Angle" commonly used for in storytelling?',
        options: [
          'To convey stability and peacefulness',
          'To generate psychological disorientation, tension, unease, or moral corruption',
          'To simulate wide landscape geography',
          'To test microphone sync levels'
        ],
        correctIndex: 1,
        explanation: 'A Dutch Tilt tilts the horizon line diagonally to induce psychological unease, delirium, or imminent danger in the viewer.'
      }
    ]
  }
];
