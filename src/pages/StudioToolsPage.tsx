import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShotPlanItem } from '../types';
import {
  Sliders,
  Plus,
  Trash2,
  CheckSquare,
  Square,
  Printer,
  Download,
  Film,
  Camera,
  CheckCircle2
} from 'lucide-react';

export const StudioToolsPage: React.FC = () => {
  const { shotList, addShot, deleteShot, checklistState, toggleChecklistItem, showToast } = useApp();
  const [activeToolTab, setActiveToolTab] = useState<'shot-planner' | 'checklist'>('shot-planner');

  // Shot Planner Form State
  const [isAddingShot, setIsAddingShot] = useState(false);
  const [sceneNo, setSceneNo] = useState('1');
  const [shotNo, setShotNo] = useState('1A');
  const [shotType, setShotType] = useState('Wide Shot');
  const [angle, setAngle] = useState('Eye Level');
  const [movement, setMovement] = useState('Static');
  const [lens, setLens] = useState('35mm Prime');
  const [lighting, setLighting] = useState('Daylight Interior Soft Key');
  const [action, setAction] = useState('');
  const [estDuration, setEstDuration] = useState('4s');

  const handleCreateShot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!action.trim()) {
      showToast('Please describe the action for this shot', 'error');
      return;
    }
    const newShot: ShotPlanItem = {
      id: 'shot-' + Date.now(),
      sceneNumber: sceneNo,
      shotNumber: shotNo,
      shotType,
      angle,
      movement,
      lens,
      lightingSetup: lighting,
      action,
      estDuration
    };
    addShot(newShot);
    setAction('');
    setShotNo(prev => {
      const match = prev.match(/(\d+)([A-Z]?)/);
      if (match) {
        const nextChar = match[2] ? String.fromCharCode(match[2].charCodeAt(0) + 1) : 'B';
        return `${match[1]}${nextChar}`;
      }
      return '1B';
    });
    setIsAddingShot(false);
  };

  // Production Checklists
  const PRE_PROD_TASKS = [
    { id: 'pre-1', label: 'Lock Final Feature Screenplay (Courier 12pt format)' },
    { id: 'pre-2', label: 'Complete Script Breakdown by Scene, Cast, and Department' },
    { id: 'pre-3', label: 'Draw Detailed Storyboards for Action & VFX Sequences' },
    { id: 'pre-4', label: 'Prepare Day-Out-of-Days (DOOD) Shooting Schedule' },
    { id: 'pre-5', label: 'Complete Location Scouting (Recce) & Secure Film Permits' },
    { id: 'pre-6', label: 'Confirm Principal Cast Agreements & Costume Trials' },
    { id: 'pre-7', label: 'Hire Camera Package (ARRI/RED, Anamorphic Lenses, Monitors)' },
    { id: 'pre-8', label: 'Construct Key Sets in Studios (RFC / Annapurna)' }
  ];

  const PROD_TASKS = [
    { id: 'prod-1', label: 'Publish and Distribute Daily Call Sheets by 7:00 PM' },
    { id: 'prod-2', label: 'Set Up 3-Point Lighting & Secure Catchlights in Actors\' Eyes' },
    { id: 'prod-3', label: 'Check Sound Recordist Sync Levels (48kHz/24-bit audio)' },
    { id: 'prod-4', label: 'Verify 180-Degree Axis Rule on Multi-Camera Setups' },
    { id: 'prod-5', label: 'Record Atmosphere Room Tone at Every Location' },
    { id: 'prod-6', label: 'Backup Camera Raw Media Cards (Dual Hard Drive Checksum)' },
    { id: 'prod-7', label: 'Maintain Script Supervisor Continuity Log & Slate Numbers' }
  ];

  const POST_PROD_TASKS = [
    { id: 'post-1', label: 'Ingest Raw Dailies & Generate Offline Editorial Proxies' },
    { id: 'post-2', label: 'Assemble Assembly Cut and Secure Director\'s Rough Cut' },
    { id: 'post-3', label: 'Lock Picture (No Further Visual Edits Permitted)' },
    { id: 'post-4', label: 'Export EDL / XML for Sound Design and VFX Pulls' },
    { id: 'post-5', label: 'Record ADR Dialogue in Soundproof Dubbing Suite' },
    { id: 'post-6', label: 'Foley Recording (Footsteps, Cloth, Impacts, Weapons)' },
    { id: 'post-7', label: 'Record and Mix Original Theatrical Background Score' },
    { id: 'post-8', label: 'Digital Intermediate (DI) Color Grading (ACES pipeline)' },
    { id: 'post-9', label: 'Dolby Atmos 7.1.4 Surround Sound Print Master' },
    { id: 'post-10', label: 'Generate Encrypted DCI 4K Digital Cinema Package (DCP)' }
  ];

  const allChecklistTasks = [...PRE_PROD_TASKS, ...PROD_TASKS, ...POST_PROD_TASKS];
  const totalChecked = allChecklistTasks.filter(t => checklistState[t.id]).length;
  const progressPercent = Math.round((totalChecked / allChecklistTasks.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          <Sliders className="w-4 h-4" />
          <span>Interactive Production Studio Tools</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel">
          Filmmaker's Toolkit
        </h1>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          Plan camera setups with precision using the Shot Planner and monitor your film project's progress using the comprehensive 3-stage Production Checklist.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
        <button
          onClick={() => setActiveToolTab('shot-planner')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeToolTab === 'shot-planner'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Shot Planner ({shotList.length})</span>
        </button>

        <button
          onClick={() => setActiveToolTab('checklist')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeToolTab === 'checklist'
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Production Checklist ({progressPercent}%)</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. SHOT PLANNER TOOL                                     */}
      {/* ======================================================== */}
      {activeToolTab === 'shot-planner' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white font-cinzel">
                Camera Shot List & Schedule
              </h3>
              <p className="text-xs text-stone-400">
                Organize each setup with scene number, camera angle, lens choice, and lighting instructions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddingShot(!isAddingShot)}
                className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Shot</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-medium text-stone-200 flex items-center gap-1.5"
                title="Print shot list"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print List</span>
              </button>
            </div>
          </div>

          {/* Add Shot Form */}
          {isAddingShot && (
            <form
              onSubmit={handleCreateShot}
              className="p-5 rounded-xl bg-[#0E1116] border border-amber-500/40 space-y-4 animate-in fade-in duration-150"
            >
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Add New Shot Entry
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-stone-400 block">Scene #</label>
                  <input
                    type="text"
                    value={sceneNo}
                    onChange={e => setSceneNo(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">Shot #</label>
                  <input
                    type="text"
                    value={shotNo}
                    onChange={e => setShotNo(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">Shot Sizing</label>
                  <select
                    value={shotType}
                    onChange={e => setShotType(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  >
                    <option value="Extreme Wide Shot">Extreme Wide Shot</option>
                    <option value="Wide Shot">Wide Shot</option>
                    <option value="Medium Full Shot">Medium Full Shot</option>
                    <option value="Medium Shot">Medium Shot</option>
                    <option value="Medium Close-Up">Medium Close-Up</option>
                    <option value="Close-Up">Close-Up</option>
                    <option value="Extreme Close-Up">Extreme Close-Up</option>
                    <option value="Over-the-Shoulder">Over-the-Shoulder</option>
                    <option value="Insert Shot">Insert Shot</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">Camera Angle</label>
                  <select
                    value={angle}
                    onChange={e => setAngle(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  >
                    <option value="Eye Level">Eye Level</option>
                    <option value="Low Angle">Low Angle</option>
                    <option value="High Angle">High Angle</option>
                    <option value="Bird's Eye">Bird's Eye</option>
                    <option value="Worm's Eye">Worm's Eye</option>
                    <option value="Dutch Tilt">Dutch Tilt</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">Movement</label>
                  <select
                    value={movement}
                    onChange={e => setMovement(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  >
                    <option value="Static">Static</option>
                    <option value="Slow Pan">Slow Pan</option>
                    <option value="Dolly In">Dolly In</option>
                    <option value="Dolly Track">Dolly Track</option>
                    <option value="Crane Up">Crane Up</option>
                    <option value="Steadicam">Steadicam</option>
                    <option value="Handheld">Handheld</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">Lens Choice</label>
                  <input
                    type="text"
                    value={lens}
                    onChange={e => setLens(e.target.value)}
                    placeholder="e.g. 50mm Anamorphic"
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">Lighting Setup</label>
                  <input
                    type="text"
                    value={lighting}
                    onChange={e => setLighting(e.target.value)}
                    placeholder="e.g. Warm rim + Tungsten key"
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">Est Duration</label>
                  <input
                    type="text"
                    value={estDuration}
                    onChange={e => setEstDuration(e.target.value)}
                    placeholder="e.g. 5s"
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>

                <div className="sm:col-span-4 space-y-1">
                  <label className="text-stone-400 block">Action / Subject Blocking</label>
                  <input
                    type="text"
                    value={action}
                    onChange={e => setAction(e.target.value)}
                    placeholder="Describe what occurs in frame..."
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingShot(false)}
                  className="px-4 py-1.5 rounded bg-stone-800 text-stone-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold"
                >
                  Save Shot
                </button>
              </div>
            </form>
          )}

          {/* Shot Table */}
          <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#0E1116]">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-[#12151D] border-b border-stone-800 text-[11px] uppercase tracking-wider text-stone-400 font-mono">
                <tr>
                  <th className="py-3 px-3">Shot</th>
                  <th className="py-3 px-3">Scene</th>
                  <th className="py-3 px-4">Sizing & Angle</th>
                  <th className="py-3 px-4">Movement & Lens</th>
                  <th className="py-3 px-4">Lighting</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-sans">
                {shotList.map(shot => (
                  <tr key={shot.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-amber-400">
                      {shot.shotNumber}
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-400">{shot.sceneNumber}</td>
                    <td className="py-3 px-4 font-medium text-white">
                      {shot.shotType} · {shot.angle}
                    </td>
                    <td className="py-3 px-4 text-stone-300">
                      {shot.movement} ({shot.lens})
                    </td>
                    <td className="py-3 px-4 text-stone-400">{shot.lightingSetup}</td>
                    <td className="py-3 px-4 text-stone-300 max-w-xs">{shot.action}</td>
                    <td className="py-3 px-3 font-mono text-stone-400">{shot.estDuration}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteShot(shot.id)}
                        className="text-stone-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PRODUCTION CHECKLIST TOOL                             */}
      {/* ======================================================== */}
      {activeToolTab === 'checklist' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          
          {/* Progress Overview Bar */}
          <div className="p-6 rounded-xl bg-[#0C0E14] border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-amber-400 uppercase tracking-widest font-semibold">
                Overall Film Project Completion
              </span>
              <span className="font-mono font-bold text-white text-sm">
                {totalChecked} / {allChecklistTasks.length} Completed ({progressPercent}%)
              </span>
            </div>

            {/* Progress bar container */}
            <div className="w-full h-2.5 rounded-full bg-stone-900 border border-stone-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pre-Production Checklist */}
            <div className="p-5 rounded-xl bg-[#0E1116] border border-stone-800 space-y-4">
              <div className="border-b border-stone-800 pb-2 flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Pre-Production
                </h4>
                <span className="text-[11px] text-stone-500">
                  {PRE_PROD_TASKS.filter(t => checklistState[t.id]).length}/{PRE_PROD_TASKS.length}
                </span>
              </div>

              <div className="space-y-2">
                {PRE_PROD_TASKS.map(task => {
                  const isDone = !!checklistState[task.id];
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleChecklistItem(task.id)}
                      className={`w-full p-2.5 rounded border text-left text-xs transition-colors flex items-start gap-2.5 ${
                        isDone
                          ? 'bg-amber-500/10 border-amber-500/30 text-stone-300 line-through'
                          : 'bg-stone-900/60 border-stone-800/80 text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{task.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Production Checklist */}
            <div className="p-5 rounded-xl bg-[#0E1116] border border-stone-800 space-y-4">
              <div className="border-b border-stone-800 pb-2 flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Production
                </h4>
                <span className="text-[11px] text-stone-500">
                  {PROD_TASKS.filter(t => checklistState[t.id]).length}/{PROD_TASKS.length}
                </span>
              </div>

              <div className="space-y-2">
                {PROD_TASKS.map(task => {
                  const isDone = !!checklistState[task.id];
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleChecklistItem(task.id)}
                      className={`w-full p-2.5 rounded border text-left text-xs transition-colors flex items-start gap-2.5 ${
                        isDone
                          ? 'bg-amber-500/10 border-amber-500/30 text-stone-300 line-through'
                          : 'bg-stone-900/60 border-stone-800/80 text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{task.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Post-Production Checklist */}
            <div className="p-5 rounded-xl bg-[#0E1116] border border-stone-800 space-y-4">
              <div className="border-b border-stone-800 pb-2 flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Post-Production
                </h4>
                <span className="text-[11px] text-stone-500">
                  {POST_PROD_TASKS.filter(t => checklistState[t.id]).length}/{POST_PROD_TASKS.length}
                </span>
              </div>

              <div className="space-y-2">
                {POST_PROD_TASKS.map(task => {
                  const isDone = !!checklistState[task.id];
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleChecklistItem(task.id)}
                      className={`w-full p-2.5 rounded border text-left text-xs transition-colors flex items-start gap-2.5 ${
                        isDone
                          ? 'bg-amber-500/10 border-amber-500/30 text-stone-300 line-through'
                          : 'bg-stone-900/60 border-stone-800/80 text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{task.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
