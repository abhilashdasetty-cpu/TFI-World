export interface DecadeMilestone {
  decade: string;
  eraTitle: string;
  yearRange: string;
  summary: string;
  keyEvents: string[];
  pioneeringFilmmakers: string[];
  iconicFilms: { title: string; year: number; significance: string }[];
  technicalEvolution: string;
}

export const TELUGU_CINEMA_HISTORY: DecadeMilestone[] = [
  {
    decade: '1930s',
    eraTitle: 'Birth of Telugu Talkies & Pioneers',
    yearRange: '1931 – 1939',
    summary: 'The birth of Telugu sound cinema. Pioneering director H.M. Reddy produced Bhakta Prahlada (1931), making Telugu the fourth language in India to produce a talking film. The decade was rooted in mythological and devotional adaptations of stage theatre.',
    keyEvents: [
      '1931: Release of Bhakta Prahlada, the first Telugu talkie film directed by H.M. Reddy.',
      '1936: Premabandham directed by P.V. Das marked early social themes.',
      '1938: Raithu Bidda directed by Gudavalli Ramabrahmam introduced social realism and tenant farmer protests against the Zamindari system, causing the British administration to ban it in several regions.',
      '1939: Vande Mataram challenged dowry and caste orthodoxies.'
    ],
    pioneeringFilmmakers: ['H. M. Reddy', 'Gudavalli Ramabrahmam', 'P. V. Das', 'C. Pullaiah'],
    iconicFilms: [
      { title: 'Bhakta Prahlada', year: 1931, significance: 'First Telugu sound film, initiating the vernacular cinema industry.' },
      { title: 'Raithu Bidda', year: 1938, significance: 'Pioneered political and agrarian social drama in Indian cinema.' },
      { title: 'Vande Mataram', year: 1939, significance: 'Early feminist and anti-dowry social commentary.' }
    ],
    technicalEvolution: 'Variable optical sound recording on 35mm black-and-white nitrate film with bulky stationary camera blimps.'
  },
  {
    decade: '1950s',
    eraTitle: 'The Golden Era of Telugu Cinema',
    yearRange: '1950 – 1959',
    summary: 'Widely regarded as the pinnacle of artistic, technical, and musical excellence. The twin titans N.T. Rama Rao and Akkineni Nageswara Rao rose to unassailable superstardom, backed by iconic studio powerhouses Vijaya Vauhini and Bharani Studios.',
    keyEvents: [
      '1951: Pathala Bhairavi and Malliswari screened at the inaugural International Film Festival of India (IFFI 1952).',
      '1953: Devadasu starring ANR and Savitri established the eternal standard for tragic romance.',
      '1955: Missamma redefined romantic comedy with timeless wit and music.',
      '1957: Mayabazar by K.V. Reddy was released, universally acclaimed as one of the greatest masterpieces of world cinema.'
    ],
    pioneeringFilmmakers: ['K. V. Reddy', 'L. V. Prasad', 'B. N. Reddy', 'Kamalakara Kameswara Rao', 'Marcus Bartley (Cinematographer)'],
    iconicFilms: [
      { title: 'Mayabazar', year: 1957, significance: 'Masterpiece of optical trick cinematography, world-building, and ensemble acting.' },
      { title: 'Devadasu', year: 1953, significance: 'The definitive tragic romantic adaptation in Indian cinema.' },
      { title: 'Missamma', year: 1955, significance: 'The peak of classical screwball romantic comedy.' },
      { title: 'Pathala Bhairavi', year: 1951, significance: 'Folkloric fantasy benchmark that ran for over a year.' }
    ],
    technicalEvolution: 'Trick optical printing, matte painting on glass by Marcus Bartley, and magnetic audio tape mastering.'
  },
  {
    decade: '1970s',
    eraTitle: 'The Color Revolution & Technological Audacity',
    yearRange: '1970 – 1979',
    summary: 'Transition from black-and-white to Eastman color. Superstar Krishna shook the industry with daring technical innovations: India\'s first authentic cowboy film and Telugu\'s first CinemaScope production.',
    keyEvents: [
      '1971: Mosagallaku Mosagadu by Superstar Krishna introduced cowboy westerns to India.',
      '1974: Alluri Seetharama Raju became the first Telugu film shot in CinemaScope anamorphic widescreen.',
      '1976: Akkineni Nageswara Rao established Annapurna Studios in Hyderabad, beginning the permanent migration of Telugu cinema from Chennai.',
      '1977: NTR wrote, directed, and starred in triple roles in the mythological juggernaut Daana Veera Soora Karna.',
      '1979: Sankarabharanam by K. Viswanath revived classical Carnatic music and won international film festival honors.'
    ],
    pioneeringFilmmakers: ['Dasari Narayana Rao', 'K. Viswanath', 'Bapu', 'Superstar Krishna', 'K. Raghavendra Rao'],
    iconicFilms: [
      { title: 'Alluri Seetharama Raju', year: 1974, significance: 'First Telugu CinemaScope epic celebrating tribal freedom struggle.' },
      { title: 'Sankarabharanam', year: 1979, significance: 'Global artistic triumph celebrating classical musical heritage.' },
      { title: 'Daana Veera Soora Karna', year: 1977, significance: 'Mythological tour-de-force with legendary monologue delivery.' },
      { title: 'Mosagallaku Mosagadu', year: 1971, significance: 'First Indian cowboy western filmed on desert locations.' }
    ],
    technicalEvolution: 'CinemaScope 2.35:1 anamorphic lenses, Eastman color film processing, and multi-track location sound.'
  },
  {
    decade: '1980s – 1990s',
    eraTitle: 'The Commercial Explosion & Modern Craft',
    yearRange: '1980 – 1999',
    summary: 'Megastar Chiranjeevi redefined Telugu mass heroism with western breakdance and daring stuntwork. Director Ram Gopal Varma and Akkineni Nagarjuna created Siva (1989), permanently modernizing camera movement and sound design across Indian cinema.',
    keyEvents: [
      '1983: Khaidi propelled Chiranjeevi to historic stardom and established fast-paced editing and action.',
      '1986: Simhasanam became South India\'s first 70mm film with six-track stereophonic sound.',
      '1989: Siva introduced steadycam operation and gritty sync-style sound realism.',
      '1991: Singeetam Srinivasa Rao\'s Aditya 369 pioneered time-travel sci-fi in Indian cinema.',
      '1992: The Week featured Chiranjeevi on its cover with the banner "Bigger Than Bachchan".'
    ],
    pioneeringFilmmakers: ['Ram Gopal Varma', 'K. Raghavendra Rao', 'A. Kodandarami Reddy', 'K. Balachander', 'Singeetam Srinivasa Rao'],
    iconicFilms: [
      { title: 'Siva', year: 1989, significance: 'The turning point of modern Indian visual styling and steadycam movement.' },
      { title: 'Khaidi', year: 1983, significance: 'The blueprint for modern commercial mass hero spectacles.' },
      { title: 'Aditya 369', year: 1991, significance: 'First sci-fi time-machine adventure in South Indian cinema.' },
      { title: 'Rudraveena', year: 1988, significance: 'National Award-winning musical drama on social reform.' }
    ],
    technicalEvolution: 'Steadycam rigs, 70mm blow-ups, 6-track Dolby Stereo, Avid non-linear digital editing.'
  },
  {
    decade: '2000s',
    eraTitle: 'The New Wave & Stylized Commercial Cinema',
    yearRange: '2000 – 2009',
    summary: 'A new generation of visionary directors (S.S. Rajamouli, Puri Jagannadh, Trivikram Srinivas, Sukumar) teamed with young icons (Mahesh Babu, Pawan Kalyan, Jr. NTR, Allu Arjun, Prabhas, Ram Charan), creating industry hits that expanded Telugu cinema\'s international box office in North America.',
    keyEvents: [
      '2001: Kushi set an unmatched youth trend in romantic comedy and style.',
      '2003: Okkadu and Simhadri established new benchmarks for mass storytelling.',
      '2005: Athadu set the benchmark for Hollywood-grade gun action and sophisticated dialogues.',
      '2006: Pokiri ran for 500 days and revolutionized hero attitude.',
      '2009: Magadheera grossed unprecedented sums and proved Telugu cinema could execute visual effects on par with global productions.'
    ],
    pioneeringFilmmakers: ['S. S. Rajamouli', 'Puri Jagannadh', 'Trivikram Srinivas', 'Sukumar', 'Srinu Vaitla'],
    iconicFilms: [
      { title: 'Magadheera', year: 2009, significance: 'Broke all South Indian box office records with epic fantasy VFX.' },
      { title: 'Pokiri', year: 2006, significance: 'Cultural hurricane that redefined the fearless Telugu hero archetype.' },
      { title: 'Athadu', year: 2005, significance: 'Masterclass in cinematic framing, bullet-time photography, and dialogue.' },
      { title: 'Arya', year: 2004, significance: 'Revitalized youth romantic cinema with kinetic choreography.' }
    ],
    technicalEvolution: 'Digital Intermediate (DI) color grading, 3D CGI visual effects pipelines, Phantom high-speed cameras.'
  },
  {
    decade: '2010s – 2020s+',
    eraTitle: 'The Pan-Indian & Global Epoch',
    yearRange: '2010 – Present',
    summary: 'Telugu cinema shattered regional barriers to become the dominant engine of Indian entertainment worldwide. S.S. Rajamouli\'s Baahubali and RRR commanded global box offices, earning Academy Awards and Golden Globes, while films like Pushpa, Kalki 2898 AD, and Salaar solidified Tollywood\'s international leadership.',
    keyEvents: [
      '2015 & 2017: Baahubali duology grossed ₹2,400+ Crores, establishing the Pan-Indian cinema business model.',
      '2019: Jersey won two National Film Awards and international emotional acclaim.',
      '2021: Allu Arjun won the National Film Award for Best Actor for Pushpa: The Rise.',
      '2022: RRR became an international pop culture phenomenon, winning the Academy Award (Oscar) and Golden Globe for Naatu Naatu.',
      '2024: Kalki 2898 AD and Pushpa 2: The Rule collected over ₹1,000+ Crores worldwide, cementing Telugu cinema\'s global sci-fi and mass dominance.'
    ],
    pioneeringFilmmakers: ['S. S. Rajamouli', 'Sukumar', 'Nag Ashwin', 'Sandeep Reddy Vanga', 'Prashanth Neel'],
    iconicFilms: [
      { title: 'RRR', year: 2022, significance: 'Oscar & Golden Globe-winning epic that conquered Hollywood and global audiences.' },
      { title: 'Baahubali 2: The Conclusion', year: 2017, significance: 'The biggest Indian cinematic spectacle in history.' },
      { title: 'Kalki 2898 AD', year: 2024, significance: 'Pioneered Indian sci-fi world-building marrying Mahabharata with dystopia.' },
      { title: 'Pushpa: The Rise', year: 2021, significance: 'Earned Telugu cinema\'s first National Award for Best Actor for Allu Arjun.' }
    ],
    technicalEvolution: 'Large-format ARRI ALEXA LF / IMAX cameras, Dolby Atmos 3D immersive sound, Unreal Engine virtual production, photorealistic CGI creatures.'
  }
];
