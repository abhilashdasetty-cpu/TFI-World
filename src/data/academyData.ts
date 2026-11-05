import { ProductionStageLesson } from '../types';

export interface PipelineStage {
  id: string;
  name: string;
  stageGroup: 'Pre-Production' | 'Production' | 'Post-Production';
  shortDesc: string;
  detailedOverview: string;
  teluguCinemaReference: string;
  keyToolsAndDeliverables: string[];
}

export const PRODUCTION_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'concept',
    name: 'Concept & Idea',
    stageGroup: 'Pre-Production',
    shortDesc: 'The germination of the core emotional hook, premise, and world-building.',
    detailedOverview: 'Every cinematic masterpiece begins with a high-concept premise or raw emotional core. In Telugu cinema, concepts often balance grand mythic archetypes with contemporary emotional dilemmas. Writers synthesize high-concept premises into loglines (e.g. "What if a common fly seeks revenge on an invincible billionaire tycoon?" — Eega) and pitch decks detailing genre, target audience, and scale.',
    teluguCinemaReference: 'S.S. Rajamouli and his father V. Vijayendra Prasad developed the concept of Eega during a routine drive, asking what smallest organism could challenge human arrogance.',
    keyToolsAndDeliverables: ['Logline (1-2 sentences)', 'Dramatic Premise (Theme & Antagonist)', 'World Bible & Lore Document', 'Pitch Deck']
  },
  {
    id: 'script',
    name: 'Screenplay & Dialogues',
    stageGroup: 'Pre-Production',
    shortDesc: 'Converting the treatment into standard 3-act structure, scene headings, and punchlines.',
    detailedOverview: 'Screenwriting translates the abstract concept into dramatic action, beats, subtext, and scene momentum. In Telugu cinema, dialogues carry supreme weight, where a single line can define an actor\'s public iconography for decades. The script undergoes multiple revisions: Step Outline → Scene Breakdown → First Draft → Master Dialogue Draft.',
    teluguCinemaReference: 'Trivikram Srinivas (e.g., Athadu, Julayi) crafted dialogues that balance philosophical gravitas with colloquial wit, creating lines that became everyday Telugu idioms.',
    keyToolsAndDeliverables: ['Standard Industry Screenplay (Courier 12pt format)', 'Scene-by-Scene Step Outline', 'Punch & Character Dialogue Polish', 'Character Arc Bios']
  },
  {
    id: 'storyboard',
    name: 'Storyboarding & Pre-vis',
    stageGroup: 'Pre-Production',
    shortDesc: 'Translating written text into sequential pictorial panels, shot compositions, and animatics.',
    detailedOverview: 'Storyboarding is the visual blueprint of the film. Panels illustrate camera framing, aspect ratios, lens choices, character actions, camera movements (pans, tilts, tracks), and duration. For complex action sequences, Telugu filmmakers commission digital animatics (3D pre-visualization with temporary music and sound effects) to test pacing before spending crores on set.',
    teluguCinemaReference: 'For the Waterfall Climbing sequence in Baahubali and the Interval Tiger Fight in RRR, Rajamouli\'s team spent 6+ months drawing thousands of storyboard panels and 3D pre-vis frames.',
    keyToolsAndDeliverables: ['Sequential Storyboard Panels', 'Animatic Reel with Temp Audio', 'Camera Framing & Angle Notes', 'VFX Shot Breakdown Sheet']
  },
  {
    id: 'planning',
    name: 'Production Planning & Recce',
    stageGroup: 'Pre-Production',
    shortDesc: 'Location scouting, casting, budgeting, costume trials, set construction, and shooting schedules.',
    detailedOverview: 'The production department breaks down the locked script for budget, cast dates, locations, props, and equipment. The First Assistant Director (1st AD) constructs the day-out-of-days shooting schedule, while the art director builds sets in Ramoji Film City or Annapurna Studios.',
    teluguCinemaReference: 'Art director Sabu Cyril built the colossal royal palace of Mahishmati across several acres inside Ramoji Film City, including functioning elevators and massive statues.',
    keyToolsAndDeliverables: ['Day-Out-of-Days Schedule', 'Production Budget Ledger', 'Location Scout (Recce) Photos & Permits', 'Set Construction Blueprints']
  },
  {
    id: 'shooting',
    name: 'Principal Photography',
    stageGroup: 'Production',
    shortDesc: 'The camera rolls: directing actors, lighting sets, moving camera rigs, and capturing sound.',
    detailedOverview: 'The intense phase where director, cinematographer (DoP), sound recordist, and actors collaborate on set to capture footage. Telugu cinema is famous for pioneering camera rigs, robotic cranes (Technocranes), Phantom high-speed cameras (1000fps for slow-motion punch impacts), and intricate steadycam choreography.',
    teluguCinemaReference: 'Cinematographer K.K. Senthil Kumar and S.S. Rajamouli used custom camera gimbal rigs and drone lighting grids to shoot RRR\'s night bridge rescue sequence in Ukraine and Hyderabad.',
    keyToolsAndDeliverables: ['Camera Raw Dailies (ARRIRAW/RED RAW)', 'Sound Rolls (24-bit/48kHz synced audio)', 'Continuity & Script Supervisor Logs', 'Daily Call Sheets']
  },
  {
    id: 'editing',
    name: 'Picture Editorial',
    stageGroup: 'Post-Production',
    shortDesc: 'Selecting the best takes, pacing scenes, assembling rough cuts, and locking the picture.',
    detailedOverview: 'The editor sifts through hundreds of hours of raw footage to assemble the scene for maximum dramatic impact and emotional rhythm. Editorial passes proceed through Assembly Cut → Director’s Cut → Fine Cut → Locked Picture. Every frame cut determines tension, comedic timing, or visceral action flow.',
    teluguCinemaReference: 'National Award-winning editor Navin Nooli edited Jersey and Rangasthalam, holding emotional close-ups for crucial seconds to let the actor\'s grief resonate without dialogue.',
    keyToolsAndDeliverables: ['Assembly & Fine Cut Timeline', 'Picture Lock EDL / XML Export', 'Offline Proxy Workflow', 'VFX Pull Lists']
  },
  {
    id: 'sound',
    name: 'Sound Design & Score',
    stageGroup: 'Post-Production',
    shortDesc: 'Dialogue cleanup, ADR/dubbing, Foley sound effects, background score, and Dolby Atmos mixing.',
    detailedOverview: 'Sound gives cinema 50% of its emotional resonance. This stage includes Dialogue Editing, ADR (Automated Dialogue Replacement / Dubbing), Foley (recording real-world footsteps, cloth rustles, sword clashes), Atmospheric Background FX, and original musical scoring that elevates the on-screen heroism.',
    teluguCinemaReference: 'Oscar-winner M. M. Keeravani\'s symphonic score for Baahubali and RRR and Devi Sri Prasad\'s rustic sound palette in Rangasthalam (which won the National Film Award for Best Audiography).',
    keyToolsAndDeliverables: ['ADR Master Dubbing Track', 'Foley Sound Library & Hits', 'Original Background Score Stems', 'Dolby Atmos 7.1.4 Print Master']
  },
  {
    id: 'vfx',
    name: 'VFX & Color Grading',
    stageGroup: 'Post-Production',
    shortDesc: 'Digital extensions, CGI creatures, green-screen compositing, and cinematic DI color grading.',
    detailedOverview: 'VFX artists integrate computer-generated assets (creatures, massive armies, futuristic cities) with live-action plates using rotoscoping, matchmoving, 3D tracking, and compositing. Concurrently, the Colorist performs Digital Intermediate (DI) color grading to establish mood (e.g. golden warm tones, cold dystopian shadows).',
    teluguCinemaReference: 'VFX supervisor Srinivas Mohan supervised 2,000+ VFX shots for RRR (including photorealistic tigers, wolves, and train blasts) and Makuta VFX built the entire fly anatomy for Eega.',
    keyToolsAndDeliverables: ['CGI Composited 4K Plates', 'DI Color Graded Master (ACES / DaVinci Resolve)', 'Clean Plates & Matte Paintings', 'Stereoscopic Deliverables']
  },
  {
    id: 'final-film',
    name: 'Mastering & Theatrical Release',
    stageGroup: 'Post-Production',
    shortDesc: 'DCP creation, subtitles, Censor Board certification, and worldwide digital distribution.',
    detailedOverview: 'The finalized picture and Dolby Atmos soundtrack are rendered into high-security encrypted Digital Cinema Packages (DCP) formatted for IMAX, Dolby Cinema, and standard DCI projectors worldwide. Film undergoes certification with the Central Board of Film Certification (CBFC) before simultaneous multi-language global premieres.',
    teluguCinemaReference: 'Kalki 2898 AD and RRR released across 10,000+ screens globally in Telugu, Hindi, Tamil, Kannada, Malayalam, Japanese, and English.',
    keyToolsAndDeliverables: ['DCI-Compliant 4K DCP Hard Drives', 'KDM Encryption Keys', 'Multilingual Subtitle SRT/XML', 'CBFC Censor Certificate']
  }
];

export const PRODUCTION_LESSONS: ProductionStageLesson[] = [
  // PRE-PRODUCTION LESSONS
  {
    id: 'pre-1',
    stage: 'Pre-Production',
    topic: 'Screenplay Formatting & Dramatic Structure',
    shortSummary: 'Mastering the 3-act structure, inciting incidents, midpoint shifts, and industry script rules.',
    fullContent: `Screenwriting is both a science and a literary art. A feature screenplay typically adheres to a three-act structure:
- Act 1 (Setup): The protagonist\'s status quo, the Inciting Incident that disrupts normal life, and Plot Point 1 that launches them into the unknown.
- Act 2 (Confrontation): Escalating stakes, pinch points, the Midpoint reversal (where the protagonist shifts from reactive to proactive), and the "All Hope is Lost" moment.
- Act 3 (Resolution): The Climax where internal and external conflicts intersect, followed by the resolution.

In Telugu cinema, hero introduction scenes are meticulously calibrated: the hero is rarely introduced casually; instead, narrative tension is built through secondary characters discussing his mythical presence before his physical arrival.`,
    teluguCinemaCaseStudy: {
      movie: 'Athadu (2005)',
      craftsperson: 'Trivikram Srinivas',
      craftInsight: 'Trivikram opens the film with an intense 15-minute dialogue-free bank heist assassination mission to establish Nandu\'s hyper-competence, before plunging him into a pastoral family home in Basarlapudi where he must pretend to be Pardhu.'
    },
    keyTakeaways: [
      'One page of properly formatted script equals approximately one minute of screen time.',
      'Show, Don\'t Tell: write only what can be seen and heard on screen.',
      'Character flaws must directly fuel the central conflict.'
    ]
  },
  {
    id: 'pre-2',
    stage: 'Pre-Production',
    topic: 'Storyboarding & Shot Composition Mastery',
    shortSummary: 'How to translate written beats into visual grammar, rule of thirds, lead room, and shot continuity.',
    fullContent: `A storyboard is the director and cinematographer\'s mutual handshake. It establishes:
1. Aspect Ratio: e.g. 2.39:1 (Cinemascope) for epic panoramas or 1.85:1 for intimate vertical framing.
2. Shot Sizing: Wide Shots (establishing geography), Medium Shots (relationship between two characters), Close-Ups (internal emotional revelation).
3. The 180-Degree Rule: An imaginary axis drawn between two characters. The camera must remain on one side of this line to preserve consistent screen direction (left-to-right eye gaze).
4. Vectors and Lead Room: When a character is moving or looking in a direction, giving them visual space in the frame creates comfort, while clipping their gaze against the border creates claustrophobia.`,
    teluguCinemaCaseStudy: {
      movie: 'Baahubali: The Beginning (2015)',
      craftsperson: 'S.S. Rajamouli & Storyboard Artist Sabu Cyril',
      craftInsight: 'Every beat of the avalanche sequence was drawn in over 400 pencil sketches to ensure stunt doubles, CGI snow simulations, and camera tracks aligned flawlessly.'
    },
    keyTakeaways: [
      'Storyboards save up to 40% of production budgets by eliminating unnecessary camera setups.',
      'Always mark camera movement with clear arrows: single arrow for camera pan, double outline for zoom.',
      'Include sound cues and lens specifications on storyboard panels.'
    ]
  },

  // PRODUCTION LESSONS
  {
    id: 'prod-1',
    stage: 'Production',
    topic: 'Cinematography: Camera Angles & Emotional Subtext',
    shortSummary: 'Why camera placement changes the audience\'s psychological perception of character power.',
    fullContent: `The camera is never a passive observer; its position is an ethical and psychological statement:
- Low-Angle Shot (looking up at the subject): Makes the character appear dominant, heroic, intimidating, or god-like. Classic for hero elevations.
- Eye-Level Shot: Creates intimacy, neutrality, and psychological equality with the viewer.
- High-Angle Shot (looking down at the subject): Renders the character vulnerable, small, trapped, or powerless.
- Dutch Angle / Canted Shot: Tilted horizon line to communicate disorientation, madness, corruption, or imminent disaster.
- Worm\'s-Eye View: Camera placed flat on the ground looking up, exaggerating scale and boots during combat.
- Bird\'s-Eye View / Top-Down God Shot: Detaches the viewer, giving an omniscient view of labyrinthine environments or tactical battle layouts.`,
    teluguCinemaCaseStudy: {
      movie: 'RRR (2022)',
      craftsperson: 'K. K. Senthil Kumar (Director of Photography)',
      craftInsight: 'In the 1000-man police station confrontation, Senthil used low-angle 360-degree crane tracks on Ram Charan to convey unstoppable solitary conviction against an overwhelming ocean of rioters.'
    },
    keyTakeaways: [
      'Choose camera angles based on who holds emotional power in the scene.',
      'Focal length alters spatial compression: 24mm exaggerates depth and distance; 85mm compresses backgrounds and isolates characters.',
      'Do not change angles randomly without narrative motivation.'
    ]
  },
  {
    id: 'prod-2',
    stage: 'Production',
    topic: 'Three-Point Lighting & Cinematic Mood',
    shortSummary: 'Harnessing Key Light, Fill Light, and Backlight (Rim/Hair light) to sculpt three-dimensional depth on a two-dimensional sensor.',
    fullContent: `Lighting separates amateur videography from cinematic art. The classic Three-Point Lighting framework consists of:
1. Key Light: The primary light source defining shadows and highlights on the subject.
2. Fill Light: Softer secondary light positioned opposite the key light to fill in harsh shadows. The ratio between Key and Fill determines contrast:
   - High-Key Lighting (1:1 or 2:1): Bright, low contrast, used in comedies and bright family romances.
   - Low-Key Lighting (8:1 or 16:1): High contrast, deep shadows, used in crime thrillers, neo-noirs, and intense character studies.
3. Backlight / Hair / Rim Light: Placed behind the subject to create a thin outline of light along shoulders and hair, separating the subject from dark background walls.
Practical Lights (lamps, neon signs, torches in the scene) add authentic world immersion.`,
    teluguCinemaCaseStudy: {
      movie: 'Pushpa: The Rise (2021)',
      craftsperson: 'Mirosław Kuba Brożek (DoP)',
      craftInsight: 'In the forest night smuggling sequences, Brożek used massive diffused backlight grids simulating moonlight piercing through tree canopies, paired with warm campfire key lights to sculpt Pushpa\'s chiseled silhouette.'
    },
    keyTakeaways: [
      'Shadows are just as important as light in defining character psychology.',
      'Always protect the "catchlight" (the reflection of light in the actor\'s eyes) to keep them looking alive and emotionally expressive.',
      'Color temperature (Warm 3200K Tungsten vs Cool 5600K Daylight) can contrast internal safety against external threat.'
    ]
  },

  // POST-PRODUCTION LESSONS
  {
    id: 'post-1',
    stage: 'Post-Production',
    topic: 'The Invisible Art of Film Editing',
    shortSummary: 'Rhythm, match cuts, J-cuts, L-cuts, and pacing the emotional heartbeat of a scene.',
    fullContent: `Film editing is where the movie is made for the third time. Key techniques include:
- The Match Cut: Linking two shots with matching compositional shapes or actions across time and space.
- J-Cut: The audio of the upcoming shot begins a second or two before the visual cut appears, pulling the viewer forward smoothly.
- L-Cut: The video cuts to a new shot while the audio from the previous shot lingers, allowing us to see a character\'s silent reaction to what was just spoken.
- Montage: Compressing long timeframes into a rhythmic sequence set to music to demonstrate character growth or training.
- Metric vs Rhythmic Pacing: Cutting on musical beats versus cutting on the emotional breathing rhythm of an actor.`,
    teluguCinemaCaseStudy: {
      movie: 'Jersey (2019)',
      craftsperson: 'Navin Nooli (National Award for Best Editing)',
      craftInsight: 'During Arjun\'s Ranji trophy trials, Navin intercuts close-ups of Arjun\'s trembling hands and determined eyes with rapid bat-on-ball crack sounds, alternating between deafening roar and sudden vacuum silence.'
    },
    keyTakeaways: [
      'Cut on action: if a character turns or throws a punch, make the edit midway through the movement for seamless transition.',
      'Reaction shots are often more powerful than the action shot itself.',
      'Pacing should mimic heart rate: slow during tension build-up, rapid during catharsis.'
    ]
  },
  {
    id: 'post-2',
    stage: 'Post-Production',
    topic: 'Foley, Sound Design & Theatrical Dolby Atmos',
    shortSummary: 'How sound artists recreate every footstep, cloth rustle, punch impact, and vehicle roar from scratch in a soundstage.',
    fullContent: `Over 80% of what you hear in a modern feature film was recorded after filming ended.
1. Foley: Named after Jack Foley, Foley artists perform everyday sound effects in sync with the picture on specialized Foley stages with pits filled with gravel, mud, marble, and wooden floorboards.
2. Sound FX Design: Creating unnatural or hyper-stylized sounds (e.g. superhero punches, laser blasts, monster roars, sword slashes) by layering and pitch-shifting real audio.
3. Dolby Atmos Mixing: Moving sound objects in a 3D spherical soundfield with overhead height speakers, allowing audience members to track a bullet or rain droplets moving directly above them.`,
    teluguCinemaCaseStudy: {
      movie: 'Siva (1989)',
      craftsperson: 'Ram Gopal Varma & Sound Recordist',
      craftInsight: 'When Siva pulls the bicycle chain off the pedal in the college corridor, RGV amplified the metallic rattle and removed background crowd noise, creating an indelible auditory signature that sent chills through theatres.'
    },
    keyTakeaways: [
      'A punch in an action movie is often made by layering a slab of meat being hit, a leather jacket snap, and an explosive low-frequency sub-bass boom.',
      'Sound design directs the audience\'s eye to what matters before the visual even registers.',
      'Silence is the most powerful tool in the sound designer\'s arsenal.'
    ]
  }
];

export const MULTIMEDIA_CURRICULUM = [
  {
    category: 'Graphics',
    title: 'Raster vs. Vector & Cinematic Poster Typography',
    description: 'Understand pixel-based image editing (Photoshop) vs mathematically defined vector graphics (Illustrator), color profiles (RGB for screen, CMYK for print), resolution (72dpi vs 300dpi), and title typography design for film publicity.',
    topics: [
      'Raster graphics store color per pixel; enlarging beyond native dimensions causes pixelation.',
      'Vector graphics use mathematical equations between points, allowing infinite enlargement without loss of quality (ideal for movie logos).',
      'Color Spaces: sRGB, Display P3, Adobe RGB, and ACES (Academy Color Encoding System) for cinema master files.',
      'Typography hierarchy: Display title font selection, kerning title characters for high visual impact, credit billing block layout.'
    ]
  },
  {
    category: 'Audio',
    title: 'Digital Acoustics, Microphones & Dialogue Recording',
    description: 'Sampling rates (44.1kHz vs 48kHz / 96kHz for film), bit depth (16-bit vs 24-bit / 32-bit float), microphone polar patterns (Cardioid, Hypercardioid, Shotgun), and on-set boom operation.',
    topics: [
      'Nyquist-Shannon Theorem: To accurately capture a sound frequency, the digital sampling rate must be at least double the highest frequency (hence 48kHz for cinema audio).',
      'Bit Depth determines Dynamic Range: 24-bit audio provides 144 dB of dynamic range, preventing clipping distortion on loud shouts and gunshots.',
      'Microphone Patterns: Shotgun boom mics reject off-axis side noise and isolate dialogue on busy film sets.',
      'ADR (Dubbing): Replacing noisy on-location production audio in sound booths while preserving lip sync and emotional breath.'
    ]
  },
  {
    category: 'Video',
    title: 'Frame Rates, Aspect Ratios & Sensor Dynamics',
    description: 'The science of 24fps theatrical projection, the 180-degree shutter rule, modern high dynamic range sensors (ARRIRAW, REDCODE RAW), and anamorphic lens distortion.',
    topics: [
      'Why 24fps? Established in 1927 for optical sound sync, 24 frames per second produces natural motion blur that human brains interpret as artistic and "cinematic".',
      'The 180° Shutter Rule: Shutter speed should always be set to 1/(2 × Frame Rate). At 24fps, shutter is 1/48s, yielding realistic natural motion blur.',
      'Aspect Ratios: 2.39:1 (Widescreen Anamorphic), 1.85:1 (Flat Theatrical), 1.43:1 (IMAX 70mm), 16:9 (Broadcast standard).',
      'Log Picture Profiles & RAW: Preserves up to 16+ stops of shadow and highlight data for the post-production colorist.'
    ]
  },
  {
    category: 'Animation',
    title: 'The 12 Core Principles of Animation & 3D Pipelines',
    description: 'The Disney & international golden principles of animation (Squash & Stretch, Anticipation, Staging, Straight Ahead vs Pose to Pose, Follow Through, Ease In/Out, Arcs, Secondary Action, Timing, Exaggeration, Solid Drawing, Appeal) applied to modern Telugu animation & VFX.',
    topics: [
      'Squash & Stretch: Gives weight and flexibility to animated objects, preserving total volume during deformation.',
      'Anticipation: Prepares the audience for an action (e.g. crouching down before leaping up).',
      'Timing & Spacing: The number of frames between poses determines physical mass and urgency.',
      'Rigging & Skeletal Hierarchies: Building bone structures and inverse kinematics (IK) for 3D digital characters (e.g. Eega or mythological monsters).'
    ]
  },
  {
    category: 'Visual Effects',
    title: 'CGI, Chroma Keying, Matchmoving & Compositing',
    description: 'How green/blue screen chroma keying extracts actors from backgrounds, camera tracking matches virtual cameras to real lenses, and multipass compositing fuses live footage with CGI.',
    topics: [
      'Chroma Keying: Using green or blue backdrops because human skin tones contain virtually no green or pure blue spectrum pigments.',
      'Matchmoving (3D Tracking): Calculating the real camera\'s XYZ position, focal length, and lens distortion frame-by-frame so CGI objects stay anchored to the floor.',
      'Compositing Passes: Diffuse, Specular, Ambient Occlusion, Shadow, Depth (Z-depth), and Motion Vector passes merged in Node-based compositors (Nuke / Fusion).',
      'Telugu VFX Milestones: From Mayabazar\'s in-camera optical illusions (1957) to Eega (2012), Baahubali (2015), and Kalki 2898 AD (2024).'
    ]
  }
];
