import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUIZZES_DATA } from '../data/quizzesData';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { Quiz, QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  BookOpen,
  Camera,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Search,
  Award,
  ChevronRight,
  Eye,
  Sliders
} from 'lucide-react';

export const LearningPage: React.FC = () => {
  const { user, saveQuizResult, showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'quizzes' | 'angles' | 'glossary'>('quizzes');

  // Quiz Engine State
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Camera Angle Explorer State
  const [selectedAngle, setSelectedAngle] = useState<'eye' | 'low' | 'high' | 'birds' | 'worms' | 'dutch' | 'ots' | 'cu'>('low');

  // Glossary Search & Category State
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>('All');

  // Start Quiz
  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Submit Answer
  const handleConfirmAnswer = () => {
    if (selectedOption === null || !activeQuiz) return;
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  // Next Question
  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz Finished
      setQuizFinished(true);
      saveQuizResult(activeQuiz.id, score + (selectedOption === activeQuiz.questions[currentQuestionIndex].correctIndex ? 1 : 0), activeQuiz.questions.length);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  // Glossary categories
  const glossaryCategories = ['All', 'Cinematography', 'Directing', 'Editing', 'Sound & Music', 'VFX & Animation', 'Telugu Cinema Slang'];

  const filteredGlossary = GLOSSARY_TERMS.filter(item => {
    const matchesCat = selectedGlossaryCategory === 'All' || item.category === selectedGlossaryCategory;
    const matchesSearch =
      glossarySearch.trim().length === 0 ||
      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.exampleInCinema.toLowerCase().includes(glossarySearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>Cinema Learning Hub & Interactive Tools</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel">
          Cinema Knowledge Centre
        </h1>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          Test your Telugu cinema knowledge with interactive quizzes, master visual camera angles with live cinematic diagrams, and search our 50+ term filmmaking glossary.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
        <button
          onClick={() => {
            setActiveSubTab('quizzes');
            setActiveQuiz(null);
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeSubTab === 'quizzes'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Cinema Quizzes</span>
        </button>

        <button
          onClick={() => setActiveSubTab('angles')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeSubTab === 'angles'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Camera Angle Explorer</span>
        </button>

        <button
          onClick={() => setActiveSubTab('glossary')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeSubTab === 'glossary'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Film Glossary</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. QUIZ ENGINE                                           */}
      {/* ======================================================== */}
      {activeSubTab === 'quizzes' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {!activeQuiz ? (
            /* Quiz Selection Grid */
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white font-cinzel">
                  Select a Cinema Certification Quiz
                </h3>
                <p className="text-xs text-stone-400">
                  Multiple choice questions with instant explanations and score evaluation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {QUIZZES_DATA.map(quiz => {
                  const completedRecord = user.completedQuizIds.find(q => q.quizId === quiz.id);

                  return (
                    <div
                      key={quiz.id}
                      className="bg-[#0E1116] rounded-xl border border-stone-800 p-6 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition-all"
                    >
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                          {quiz.category}
                        </span>
                        <h4 className="text-base font-bold text-white font-cinzel">
                          {quiz.title}
                        </h4>
                        <p className="text-xs text-stone-400 leading-relaxed">
                          {quiz.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-800 space-y-3">
                        <div className="flex items-center justify-between text-xs text-stone-400">
                          <span>{quiz.questions.length} Questions</span>
                          <span>{quiz.timeLimitMinutes} Mins</span>
                        </div>

                        {completedRecord && (
                          <div className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between font-mono">
                            <span>Best: {completedRecord.score} / {completedRecord.total}</span>
                            <span>{completedRecord.date}</span>
                          </div>
                        )}

                        <button
                          onClick={() => handleStartQuiz(quiz)}
                          className="w-full py-2 px-4 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          {completedRecord ? 'Retake Quiz' : 'Start Quiz'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : quizFinished ? (
            /* Quiz Completed Results Card */
            <div className="max-w-xl mx-auto p-8 rounded-xl bg-[#0C0E14] border border-amber-500/40 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Quiz Completed
                </span>
                <h3 className="text-2xl font-bold text-white font-cinzel">
                  {activeQuiz.title}
                </h3>
              </div>

              <div className="p-4 rounded-lg bg-[#12151D] border border-stone-800">
                <p className="text-xs text-stone-400">Your Final Score</p>
                <div className="text-4xl font-black text-white font-mono mt-1">
                  {score} / {activeQuiz.questions.length}
                </div>
                <p className="text-xs text-amber-300 mt-1">
                  {score === activeQuiz.questions.length
                    ? '★ Perfect Master Score! You possess elite cinema knowledge!'
                    : score >= activeQuiz.questions.length / 2
                    ? 'Great performance! You have strong cinema fundamentals.'
                    : 'Good effort! Review the academy lessons to sharpen your knowledge.'}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handleStartQuiz(activeQuiz)}
                  className="px-4 py-2 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-medium text-stone-200"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider"
                >
                  All Quizzes
                </button>
              </div>
            </div>
          ) : (
            /* Active Question Card */
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-xl bg-[#0E1116] border border-stone-800 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs">
                <span className="font-mono text-amber-400 font-semibold uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                </span>
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="text-stone-400 hover:text-white"
                >
                  Exit Quiz
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {activeQuiz.questions[currentQuestionIndex].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {activeQuiz.questions[currentQuestionIndex].options.map((opt, idx) => {
                  const isChosen = selectedOption === idx;
                  const isCorrectAnswer = idx === activeQuiz.questions[currentQuestionIndex].correctIndex;

                  let optionStyle = 'bg-stone-900 border-stone-800 text-stone-200 hover:border-stone-700';
                  if (isChosen && !isAnswerSubmitted) {
                    optionStyle = 'bg-amber-500/20 border-amber-400 text-white font-medium';
                  } else if (isAnswerSubmitted) {
                    if (isCorrectAnswer) {
                      optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-medium';
                    } else if (isChosen && !isCorrectAnswer) {
                      optionStyle = 'bg-red-500/20 border-red-500 text-red-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full p-3.5 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerSubmitted && isCorrectAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswerSubmitted && isChosen && !isCorrectAnswer && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Banner */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-lg bg-[#12151D] border border-stone-800 space-y-1 animate-in fade-in duration-150">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                    Explanation
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {activeQuiz.questions[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              <div className="pt-2 flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleConfirmAnswer}
                    className="px-6 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider disabled:opacity-40 transition-colors"
                  >
                    Confirm Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    {currentQuestionIndex < activeQuiz.questions.length - 1 ? 'Next Question →' : 'View Results'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. CAMERA ANGLE EXPLORER                                 */}
      {/* ======================================================== */}
      {activeSubTab === 'angles' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div>
            <h3 className="text-xl font-bold text-white font-cinzel">
              Interactive Camera Angle Explorer
            </h3>
            <p className="text-xs text-stone-400">
              Understand the psychological impact of camera placement in visual storytelling.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'low', name: 'Low Angle (Heroic)' },
              { id: 'eye', name: 'Eye Level (Neutral)' },
              { id: 'high', name: 'High Angle (Vulnerable)' },
              { id: 'birds', name: 'Bird\'s-Eye View (God View)' },
              { id: 'worms', name: 'Worm\'s-Eye View (Epic Scale)' },
              { id: 'dutch', name: 'Dutch Tilt (Tension/Madness)' },
              { id: 'ots', name: 'Over-the-Shoulder (Dialogue)' },
              { id: 'cu', name: 'Close-Up (Internal Emotion)' }
            ].map(ang => (
              <button
                key={ang.id}
                onClick={() => setSelectedAngle(ang.id as any)}
                className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${
                  selectedAngle === ang.id
                    ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                    : 'bg-[#0E1116] border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                {ang.name}
              </button>
            ))}
          </div>

          {/* Interactive Visualizer Canvas / Explanation */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#0C0E14] border border-amber-500/30 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Visualizer Simulation Box */}
            <div className="aspect-[16/9] rounded-lg bg-[#08090C] border border-stone-800 relative overflow-hidden flex items-center justify-center p-6">
              
              {/* Dynamic Camera Angle Representation */}
              {selectedAngle === 'low' && (
                <div className="text-center space-y-2">
                  <div className="w-24 h-40 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-xl mx-auto shadow-2xl scale-110 flex items-center justify-center text-black font-bold text-xs">
                    HERO STATURE
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 block">
                    CAMERA POSITION: Below eye-line, tilted upwards (+30°)
                  </span>
                </div>
              )}

              {selectedAngle === 'eye' && (
                <div className="text-center space-y-2">
                  <div className="w-20 h-32 bg-stone-700 rounded-t-xl mx-auto flex items-center justify-center text-xs text-stone-300 font-bold">
                    SUBJECT
                  </div>
                  <span className="text-[11px] font-mono text-stone-400 block">
                    CAMERA POSITION: Level horizon line (0° tilt)
                  </span>
                </div>
              )}

              {selectedAngle === 'high' && (
                <div className="text-center space-y-2">
                  <div className="w-14 h-20 bg-stone-800 border border-stone-700 rounded-t-xl mx-auto flex items-center justify-center text-[10px] text-stone-400">
                    SUBJECT
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 block">
                    CAMERA POSITION: Looking down (-35° tilt)
                  </span>
                </div>
              )}

              {selectedAngle === 'dutch' && (
                <div className="text-center space-y-2 rotate-12 transition-transform">
                  <div className="w-20 h-32 bg-gradient-to-t from-red-800 to-amber-600 rounded-t-xl mx-auto flex items-center justify-center text-xs text-white font-bold">
                    TILTED WORLD
                  </div>
                  <span className="text-[11px] font-mono text-red-300 block">
                    CAMERA POSITION: Dutch Angle (15° Dutch canted roll)
                  </span>
                </div>
              )}

              {selectedAngle === 'birds' && (
                <div className="text-center space-y-2">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-amber-400 mx-auto flex items-center justify-center text-xs text-amber-300 font-mono">
                    TOP VIEW
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 block">
                    CAMERA POSITION: 90° Overhead Crane
                  </span>
                </div>
              )}

              {selectedAngle === 'worms' && (
                <div className="text-center space-y-2">
                  <div className="w-28 h-44 bg-gradient-to-t from-stone-900 to-amber-500 rounded-t-xl mx-auto shadow-2xl flex items-center justify-center text-black font-bold">
                    TITAN
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 block">
                    CAMERA POSITION: Ground plane looking straight up (+60°)
                  </span>
                </div>
              )}

              {selectedAngle === 'ots' && (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-28 bg-stone-900 border border-stone-800 rounded-t-lg opacity-40">
                    <span className="text-[9px] block p-1 text-stone-500">SHOULDER</span>
                  </div>
                  <div className="w-16 h-28 bg-amber-500 rounded-t-lg flex items-center justify-center text-[10px] text-black font-bold">
                    SPEAKER
                  </div>
                </div>
              )}

              {selectedAngle === 'cu' && (
                <div className="text-center space-y-2">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-black font-bold text-sm shadow-2xl">
                    FACE / EYES
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 block">
                    Focal Length: 85mm Prime
                  </span>
                </div>
              )}
            </div>

            {/* Explanation Column */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white font-cinzel">
                {selectedAngle === 'low' && 'Low Angle Shot: The Elevation of Power'}
                {selectedAngle === 'eye' && 'Eye-Level Shot: Democratic Realism'}
                {selectedAngle === 'high' && 'High Angle Shot: Vulnerability & Isolation'}
                {selectedAngle === 'dutch' && 'Dutch Angle (Canted): Psychological Unease'}
                {selectedAngle === 'birds' && 'Bird\'s-Eye View: The Omniscient Perspective'}
                {selectedAngle === 'worms' && 'Worm\'s-Eye View: Monumental Scale'}
                {selectedAngle === 'ots' && 'Over-the-Shoulder (OTS): Spatial Conversation'}
                {selectedAngle === 'cu' && 'Close-Up (CU): The Soul of the Actor'}
              </h4>

              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedAngle === 'low' &&
                  'By positioning the optical sensor below the subject\'s eye line and angling upwards, the character commands the frame, appears taller, and psychological authority is transferred to them. This is the cornerstone framing of Telugu hero elevation scenes.'}
                {selectedAngle === 'eye' &&
                  'The standard default height (approx. 5ft 6in). Because the viewer is on equal footing with the character, this angle invites empathy and realistic identification without emotional manipulation.'}
                {selectedAngle === 'high' &&
                  'The camera looks down from above. This shrinks the subject against the floor, emphasizing weakness, helplessness, entrapment, or insignificance within a grand hostile world.'}
                {selectedAngle === 'dutch' &&
                  'The camera is tilted diagonally on its roll axis so the horizon line is skewed. It causes instant subconscious discomfort, signaling mental illness, corruption, betrayal, or imminent chaos.'}
                {selectedAngle === 'birds' &&
                  'Looking straight down at 90 degrees. Commonly used in tactical war films, maze chases, or establishing the geometric scale of massive crowds in epic cinema.'}
                {selectedAngle === 'worms' &&
                  'The camera is placed literally at ground level touching the dirt. Used in martial arts and combat entries when boots hit the earth, sending dust clouds directly into the camera lens.'}
                {selectedAngle === 'ots' &&
                  'Framing from behind one character\'s shoulder towards another. Establishes who is in dialogue and maintains physical spatial orientation according to the 180-degree rule.'}
                {selectedAngle === 'cu' &&
                  'Fills the screen with the actor\'s face. Every micro-expression, eye quiver, and tear drop becomes magnified for the audience, communicating pure raw internal empathy.'}
              </p>

              <div className="p-4 rounded-lg bg-[#12151D] border border-stone-800 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                  Classic Telugu Cinema Case Study
                </span>
                <p className="text-xs text-stone-300 italic">
                  {selectedAngle === 'low' && 'RRR (2022): Ram Charan\'s 1000-man police station intro uses low-angle 360-degree crane tracks to show unstoppable solitary resolve.'}
                  {selectedAngle === 'high' && 'Jersey (2019): Arjun sitting alone in the locker room after being denied a match is framed from high above, exposing his isolation.'}
                  {selectedAngle === 'eye' && 'Athadu (2005): Dinner table conversations between Mahesh Babu and the family use natural eye-level framing to establish warmth.'}
                  {selectedAngle === 'dutch' && '1: Nenokkadine (2014): Sukumar uses canted angles to mirror Gautham\'s hallucinated reality.'}
                  {selectedAngle === 'birds' && 'Baahubali (2015): The waterfall climbing sequence uses top-down helicopter shots to reveal the impossible vertical drop.'}
                  {selectedAngle === 'worms' && 'Akhanda (2021): Balakrishna\'s Aghora entry uses worm\'s-eye view when his trident strikes the rock surface.'}
                  {selectedAngle === 'ots' && 'Pokiri (2006): Confrontation between Pandu and Ali Bhai across the prison interrogation desk.'}
                  {selectedAngle === 'cu' && 'Jersey (2019): Nani\'s emotional breakdown on the railway platform holding the team jersey.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CINEMA GLOSSARY                                       */}
      {/* ======================================================== */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white font-cinzel">
                Filmmaking & Cinema Glossary
              </h3>
              <p className="text-xs text-stone-400">
                Terminology across cinematography, directing, editing, sound, and Telugu cinema craft.
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={glossarySearch}
                onChange={e => setGlossarySearch(e.target.value)}
                placeholder="Search terminology..."
                className="w-full pl-9 pr-4 py-2 bg-[#0E1116] border border-stone-800 rounded-md text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {glossaryCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedGlossaryCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedGlossaryCategory === cat
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-lg bg-[#0E1116] border border-stone-800 space-y-2 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm font-bold text-white font-cinzel">
                    {item.term}
                  </h4>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {item.definition}
                </p>

                <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400 italic">
                  <span className="text-amber-300/80 not-italic font-semibold">Example: </span>
                  {item.exampleInCinema}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
