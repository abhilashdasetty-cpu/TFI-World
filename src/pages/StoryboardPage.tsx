import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { StoryboardProject, StoryboardPanel } from '../types';
import {
  PenTool,
  Plus,
  Play,
  Pause,
  Printer,
  Trash2,
  MoveUp,
  MoveDown,
  Edit,
  Camera,
  Film,
  Download,
  Upload,
  Check,
  X,
  RotateCcw
} from 'lucide-react';

export const StoryboardPage: React.FC = () => {
  const { projects, activeProject, setActiveProject, saveProject, deleteProject, showToast } = useApp();

  const [isEditingProjectMeta, setIsEditingProjectMeta] = useState(false);
  const [projectTitle, setProjectTitle] = useState(activeProject?.title || 'Untitled Film Scene');
  const [projectLogline, setProjectLogline] = useState(activeProject?.logline || '');
  const [projectDirector, setProjectDirector] = useState(activeProject?.director || 'Director');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '2.39:1' | '4:3' | '9:16'>(activeProject?.aspectRatio || '2.39:1');

  // Panel Editing State
  const [editingPanel, setEditingPanel] = useState<StoryboardPanel | null>(null);
  const [isNewPanel, setIsNewPanel] = useState(false);

  // Animatic Player State
  const [isAnimaticPlaying, setIsAnimaticPlaying] = useState(false);
  const [currentAnimaticIndex, setCurrentAnimaticIndex] = useState(0);

  // Canvas Drawing Modal State
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [drawingPanelId, setDrawingPanelId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#E6E8EE');
  const [brushSize, setBrushSize] = useState(3);

  // Sync title when active project changes
  useEffect(() => {
    if (activeProject) {
      setProjectTitle(activeProject.title);
      setProjectLogline(activeProject.logline);
      setProjectDirector(activeProject.director);
      setAspectRatio(activeProject.aspectRatio);
    }
  }, [activeProject]);

  // Handle Animatic Timer
  useEffect(() => {
    let timer: any;
    if (isAnimaticPlaying && activeProject && activeProject.panels.length > 0) {
      const currentPanel = activeProject.panels[currentAnimaticIndex];
      const durationMs = (currentPanel?.durationSeconds || 3) * 1000;

      timer = setTimeout(() => {
        if (currentAnimaticIndex < activeProject.panels.length - 1) {
          setCurrentAnimaticIndex(prev => prev + 1);
        } else {
          // Loop or stop
          setIsAnimaticPlaying(false);
          setCurrentAnimaticIndex(0);
          showToast('Animatic preview sequence finished', 'info');
        }
      }, durationMs);
    }
    return () => clearTimeout(timer);
  }, [isAnimaticPlaying, currentAnimaticIndex, activeProject, showToast]);

  // Save Project Metadata
  const handleSaveMeta = () => {
    if (!activeProject) return;
    const updated: StoryboardProject = {
      ...activeProject,
      title: projectTitle,
      logline: projectLogline,
      director: projectDirector,
      aspectRatio,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    saveProject(updated);
    setIsEditingProjectMeta(false);
  };

  // Create New Project
  const handleCreateNewProject = () => {
    const newProj: StoryboardProject = {
      id: 'proj-' + Date.now(),
      title: 'New Cinematic Sequence',
      logline: 'Write a brief description or premise of this cinematic scene.',
      director: 'Director Name',
      aspectRatio: '2.39:1',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      panels: [
        {
          id: 'panel-' + Date.now(),
          panelNumber: 1,
          sceneNumber: 1,
          shotType: 'Wide Shot',
          cameraAngle: 'Eye Level',
          cameraMovement: 'Static',
          lens: '35mm',
          durationSeconds: 3,
          sceneDescription: 'EXT. Location — Day. Hero stands near the temple steps.',
          actionDescription: 'Wind picks up fallen leaves; camera holds on wide composition.',
          dialogue: '',
          soundCue: 'Distant temple bells'
        }
      ]
    };
    saveProject(newProj);
    setActiveProject(newProj);
    showToast('Created new Storyboard project', 'success');
  };

  // Add / Save Panel
  const handleSavePanel = (panel: StoryboardPanel) => {
    if (!activeProject) return;

    let updatedPanels = [...activeProject.panels];
    if (isNewPanel) {
      updatedPanels.push(panel);
    } else {
      updatedPanels = updatedPanels.map(p => (p.id === panel.id ? panel : p));
    }

    // Renumber panels
    updatedPanels = updatedPanels.map((p, idx) => ({ ...p, panelNumber: idx + 1 }));

    const updatedProject = {
      ...activeProject,
      panels: updatedPanels,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    saveProject(updatedProject);
    setEditingPanel(null);
    setIsNewPanel(false);
  };

  // Move Panel Up / Down
  const handleMovePanel = (index: number, direction: 'up' | 'down') => {
    if (!activeProject) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= activeProject.panels.length) return;

    const copy = [...activeProject.panels];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    const renumbered = copy.map((p, idx) => ({ ...p, panelNumber: idx + 1 }));
    saveProject({ ...activeProject, panels: renumbered });
  };

  // Delete Panel
  const handleDeletePanel = (id: string) => {
    if (!activeProject) return;
    if (activeProject.panels.length <= 1) {
      showToast('A storyboard must have at least one panel', 'error');
      return;
    }
    const filtered = activeProject.panels.filter(p => p.id !== id);
    const renumbered = filtered.map((p, idx) => ({ ...p, panelNumber: idx + 1 }));
    saveProject({ ...activeProject, panels: renumbered });
    showToast('Panel removed', 'info');
  };

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveCanvasSketch = () => {
    if (!canvasRef.current || !drawingPanelId || !activeProject) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');

    const updatedPanels = activeProject.panels.map(p =>
      p.id === drawingPanelId ? { ...p, sketchDataUrl: dataUrl } : p
    );
    saveProject({ ...activeProject, panels: updatedPanels });
    setIsDrawingOpen(false);
    setDrawingPanelId(null);
    showToast('Sketch saved to panel', 'success');
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#111319';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Open Canvas for Panel
  const openCanvasForPanel = (panel: StoryboardPanel) => {
    setDrawingPanelId(panel.id);
    setIsDrawingOpen(true);
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill dark slate background
      ctx.fillStyle = '#111319';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load existing sketch if present
      if (panel.sketchDataUrl) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.src = panel.sketchDataUrl;
      }
    }, 50);
  };

  // Image Upload for Panel
  const handleImageUpload = (panelId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeProject) return;

    const reader = new FileReader();
    reader.onload = event => {
      const dataUrl = event.target?.result as string;
      const updatedPanels = activeProject.panels.map(p =>
        p.id === panelId ? { ...p, sketchDataUrl: dataUrl } : p
      );
      saveProject({ ...activeProject, panels: updatedPanels });
      showToast('Reference image attached to panel', 'success');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            <PenTool className="w-4 h-4" />
            <span>Interactive Production Studio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel mt-1">
            Storyboard Studio
          </h1>
          <p className="text-sm text-stone-300 max-w-2xl mt-1 leading-relaxed">
            Architect your scenes frame-by-frame. Add shots, specify camera angles, draw sketches, test animatic timing, and export formatted printable boards.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCreateNewProject}
            className="px-3.5 py-2 rounded-md bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-medium text-stone-200 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>New Project</span>
          </button>

          {/* Animatic Playback Toggle */}
          <button
            onClick={() => {
              setIsAnimaticPlaying(!isAnimaticPlaying);
              if (!isAnimaticPlaying) setCurrentAnimaticIndex(0);
            }}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isAnimaticPlaying
                ? 'bg-amber-400 text-black'
                : 'bg-stone-900 border border-stone-700 text-stone-200 hover:text-white'
            }`}
          >
            {isAnimaticPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Animatic</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-amber-400" />
                <span>Play Animatic</span>
              </>
            )}
          </button>

          {/* Print / PDF Export */}
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-md bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-medium text-stone-200 transition-colors flex items-center gap-1.5"
            title="Export printable storyboard to PDF or printer"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Export Printable PDF</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PROJECT HEADER CARD                                      */}
      {/* ======================================================== */}
      {activeProject && (
        <div className="bg-[#0C0E14] rounded-xl border border-stone-800 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="font-mono text-amber-400 uppercase tracking-widest">
                  Aspect Ratio: {activeProject.aspectRatio}
                </span>
                <span aria-hidden="true">·</span>
                <span>Director: {activeProject.director}</span>
                <span aria-hidden="true">·</span>
                <span>{activeProject.panels.length} Panels</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-cinzel">
                {activeProject.title}
              </h2>
              <p className="text-xs text-stone-300 max-w-2xl leading-relaxed italic">
                "{activeProject.logline}"
              </p>
            </div>

            <button
              onClick={() => setIsEditingProjectMeta(!isEditingProjectMeta)}
              className="px-3 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-200 flex items-center gap-1.5 self-start"
            >
              <Edit className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEditingProjectMeta ? 'Close Settings' : 'Edit Scene Details'}</span>
            </button>
          </div>

          {/* Project Edit Form */}
          {isEditingProjectMeta && (
            <div className="pt-4 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs animate-in fade-in duration-150">
              <div className="space-y-1">
                <label className="text-stone-400 block">Project / Scene Title</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Director Name</label>
                <input
                  type="text"
                  value={projectDirector}
                  onChange={e => setProjectDirector(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Aspect Ratio</label>
                <select
                  value={aspectRatio}
                  onChange={e => setAspectRatio(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="2.39:1">2.39:1 (Cinemascope Epic)</option>
                  <option value="16:9">16:9 (Standard Widescreen)</option>
                  <option value="4:3">4:3 (Vintage Academy)</option>
                  <option value="9:16">9:16 (Vertical Cinematic)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Action / Save</label>
                <button
                  onClick={handleSaveMeta}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded text-xs transition-colors"
                >
                  Save Settings
                </button>
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="text-stone-400 block">Scene Logline / Synopsis</label>
                <textarea
                  rows={2}
                  value={projectLogline}
                  onChange={e => setProjectLogline(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* ANIMATIC LIVE PLAYER BANNER                              */}
      {/* ======================================================== */}
      {isAnimaticPlaying && activeProject && activeProject.panels.length > 0 && (
        <div className="p-6 rounded-xl bg-gradient-to-r from-amber-950/40 via-[#10141D] to-black border-2 border-amber-500 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="font-mono font-bold uppercase tracking-wider">
                LIVE ANIMATIC PLAYBACK — PANEL {currentAnimaticIndex + 1} OF {activeProject.panels.length}
              </span>
            </div>
            <span className="font-mono">
              Timer: {activeProject.panels[currentAnimaticIndex]?.durationSeconds}s
            </span>
          </div>

          {/* Current Animatic View */}
          <div className="aspect-[2.39/1] max-h-72 bg-black rounded-lg border border-stone-800 flex items-center justify-center relative overflow-hidden mx-auto w-full">
            {activeProject.panels[currentAnimaticIndex]?.sketchDataUrl ? (
              <img
                src={activeProject.panels[currentAnimaticIndex]?.sketchDataUrl}
                alt="Animatic frame"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center p-6 space-y-2">
                <span className="text-sm font-bold text-amber-400 font-cinzel">
                  {activeProject.panels[currentAnimaticIndex]?.shotType}
                </span>
                <p className="text-xs text-stone-300">
                  {activeProject.panels[currentAnimaticIndex]?.actionDescription}
                </p>
                {activeProject.panels[currentAnimaticIndex]?.dialogue && (
                  <p className="text-xs text-amber-200 italic">
                    "{activeProject.panels[currentAnimaticIndex]?.dialogue}"
                  </p>
                )}
              </div>
            )}

            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-stone-400 bg-black/60 px-3 py-1 rounded backdrop-blur-sm">
              <span>{activeProject.panels[currentAnimaticIndex]?.cameraAngle} · {activeProject.panels[currentAnimaticIndex]?.cameraMovement}</span>
              <span>Sound: {activeProject.panels[currentAnimaticIndex]?.soundCue || 'Ambient room tone'}</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STORYBOARD PANELS GRID                                   */}
      {/* ======================================================== */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-cinzel">
            Storyboard Sequence ({activeProject?.panels.length || 0} Panels)
          </h3>

          <button
            onClick={() => {
              const newPanelNum = (activeProject?.panels.length || 0) + 1;
              setEditingPanel({
                id: 'panel-' + Date.now(),
                panelNumber: newPanelNum,
                sceneNumber: 1,
                shotType: 'Medium Shot',
                cameraAngle: 'Eye Level',
                cameraMovement: 'Static',
                lens: '50mm',
                durationSeconds: 3,
                sceneDescription: 'EXT. Location — Day.',
                actionDescription: 'Describe character motion and key blocking.',
                dialogue: '',
                soundCue: ''
              });
              setIsNewPanel(true);
            }}
            className="px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Panel</span>
          </button>
        </div>

        {/* The Panels List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProject?.panels.map((panel, idx) => (
            <div
              key={panel.id}
              className="bg-[#0E1116] rounded-xl border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between overflow-hidden shadow-lg"
            >
              
              {/* Panel Frame Visual Area */}
              <div className="relative aspect-[16/9] bg-[#12151D] border-b border-stone-800 overflow-hidden flex items-center justify-center group">
                {panel.sketchDataUrl ? (
                  <img
                    src={panel.sketchDataUrl}
                    alt={`Panel ${panel.panelNumber}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-4 space-y-1">
                    <Camera className="w-6 h-6 text-stone-600 mx-auto" />
                    <span className="text-xs text-stone-400 block font-mono">
                      {panel.shotType}
                    </span>
                    <span className="text-[10px] text-stone-500 block">
                      {panel.cameraAngle} · {panel.cameraMovement}
                    </span>
                  </div>
                )}

                {/* Top overlay: Panel & Scene # */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[11px] text-amber-400 font-bold border border-amber-500/20">
                  PANEL #{panel.panelNumber} · SCENE #{panel.sceneNumber}
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[11px] text-stone-300">
                  {panel.durationSeconds}s
                </div>

                {/* Hover Quick Drawing / Image Attach */}
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => openCanvasForPanel(panel)}
                    className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold flex items-center gap-1"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Sketch</span>
                  </button>

                  <label className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleImageUpload(panel.id, e)}
                    />
                  </label>
                </div>
              </div>

              {/* Panel Details Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                    <span>{panel.shotType}</span>
                    <span>{panel.lens || '50mm'}</span>
                  </div>

                  <p className="text-stone-300 font-medium line-clamp-2">
                    {panel.actionDescription}
                  </p>

                  {panel.dialogue && (
                    <p className="text-amber-200/90 italic bg-black/40 p-2 rounded border border-stone-800/80 text-[11px]">
                      "{panel.dialogue}"
                    </p>
                  )}

                  {panel.soundCue && (
                    <p className="text-stone-400 text-[11px]">
                      Sound: {panel.soundCue}
                    </p>
                  )}
                </div>

                {/* Panel Footer Controls */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMovePanel(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded bg-stone-900 text-stone-400 hover:text-white disabled:opacity-30"
                      title="Move Panel Left / Up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMovePanel(idx, 'down')}
                      disabled={idx === (activeProject?.panels.length || 0) - 1}
                      className="p-1 rounded bg-stone-900 text-stone-400 hover:text-white disabled:opacity-30"
                      title="Move Panel Right / Down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingPanel(panel);
                        setIsNewPanel(false);
                      }}
                      className="text-stone-400 hover:text-white p-1"
                      title="Edit Panel Details"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeletePanel(panel.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete Panel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* EDIT PANEL MODAL                                         */}
      {/* ======================================================== */}
      {editingPanel && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-[#0E1116] rounded-xl border border-stone-800 p-6 max-w-xl w-full space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white font-cinzel">
                {isNewPanel ? 'Add Storyboard Panel' : `Edit Panel #${editingPanel.panelNumber}`}
              </h3>
              <button
                onClick={() => setEditingPanel(null)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-stone-400 block">Shot Type</label>
                <select
                  value={editingPanel.shotType}
                  onChange={e => setEditingPanel({ ...editingPanel, shotType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                >
                  <option value="Extreme Wide Shot">Extreme Wide Shot (EWS)</option>
                  <option value="Wide Shot">Wide Shot (WS)</option>
                  <option value="Medium Full Shot">Medium Full Shot (MFS)</option>
                  <option value="Medium Shot">Medium Shot (MS)</option>
                  <option value="Medium Close-Up">Medium Close-Up (MCU)</option>
                  <option value="Close-Up">Close-Up (CU)</option>
                  <option value="Extreme Close-Up">Extreme Close-Up (ECU)</option>
                  <option value="Over-the-Shoulder">Over-the-Shoulder (OTS)</option>
                  <option value="Point of View">Point of View (POV)</option>
                  <option value="Insert Shot">Insert Shot</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Camera Angle</label>
                <select
                  value={editingPanel.cameraAngle}
                  onChange={e => setEditingPanel({ ...editingPanel, cameraAngle: e.target.value as any })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                >
                  <option value="Eye Level">Eye Level</option>
                  <option value="Low Angle">Low Angle (Heroic)</option>
                  <option value="High Angle">High Angle (Vulnerable)</option>
                  <option value="Bird's Eye View">Bird's Eye View (Top-Down)</option>
                  <option value="Worm's Eye View">Worm's Eye View</option>
                  <option value="Dutch Tilt">Dutch Tilt (Canted Tension)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Camera Movement</label>
                <select
                  value={editingPanel.cameraMovement}
                  onChange={e => setEditingPanel({ ...editingPanel, cameraMovement: e.target.value as any })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                >
                  <option value="Static">Static</option>
                  <option value="Pan">Pan (Horizontal)</option>
                  <option value="Tilt">Tilt (Vertical)</option>
                  <option value="Dolly / Tracking">Dolly / Tracking</option>
                  <option value="Crane / Jib">Crane / Jib</option>
                  <option value="Steadicam">Steadicam</option>
                  <option value="Handheld">Handheld</option>
                  <option value="Zoom In / Out">Zoom In / Out</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Duration (Seconds)</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={editingPanel.durationSeconds}
                  onChange={e =>
                    setEditingPanel({ ...editingPanel, durationSeconds: parseInt(e.target.value) || 3 })
                  }
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-stone-400 block">Action & Visual Description</label>
                <textarea
                  rows={2}
                  value={editingPanel.actionDescription}
                  onChange={e => setEditingPanel({ ...editingPanel, actionDescription: e.target.value })}
                  placeholder="What happens in this frame? Describe character movement, camera track..."
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-stone-400 block">Character Dialogue / Punchline</label>
                <input
                  type="text"
                  value={editingPanel.dialogue || ''}
                  onChange={e => setEditingPanel({ ...editingPanel, dialogue: e.target.value })}
                  placeholder="Optional character line or voiceover"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-stone-400 block">Sound Design Cue</label>
                <input
                  type="text"
                  value={editingPanel.soundCue || ''}
                  onChange={e => setEditingPanel({ ...editingPanel, soundCue: e.target.value })}
                  placeholder="e.g. Gunshot echo, roaring rain, sword ring"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingPanel(null)}
                className="px-4 py-2 rounded bg-stone-800 text-stone-300 text-xs font-medium hover:bg-stone-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePanel(editingPanel)}
                className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold"
              >
                Save Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* HTML5 CANVAS SKETCHING PAD MODAL                         */}
      {/* ======================================================== */}
      {isDrawingOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#0E1116] rounded-xl border border-stone-800 p-5 max-w-3xl w-full space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white font-cinzel">
                  Cinematic Frame Drawing Pad
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Brush size */}
                <select
                  value={brushSize}
                  onChange={e => setBrushSize(parseInt(e.target.value))}
                  className="px-2 py-1 bg-stone-900 border border-stone-700 rounded text-xs text-white"
                >
                  <option value={2}>Fine Pen (2px)</option>
                  <option value={4}>Medium Brush (4px)</option>
                  <option value={8}>Bold Marker (8px)</option>
                  <option value={16}>Chalk Block (16px)</option>
                </select>

                {/* Colors */}
                <div className="flex items-center gap-1">
                  {['#FFFFFF', '#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#111319'].map(c => (
                    <button
                      key={c}
                      onClick={() => setBrushColor(c)}
                      className={`w-5 h-5 rounded-full border ${
                        brushColor === c ? 'ring-2 ring-amber-400 scale-110' : 'border-stone-700'
                      }`}
                      style={{ backgroundColor: c }}
                      title={c === '#111319' ? 'Eraser' : c}
                    />
                  ))}
                </div>

                <button
                  onClick={clearCanvas}
                  className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded"
                  title="Clear canvas"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsDrawingOpen(false)}
                  className="text-stone-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Canvas Surface */}
            <div className="aspect-[16/9] max-h-96 w-full bg-[#111319] border border-stone-800 rounded-lg overflow-hidden cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={800}
                height={450}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-full"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800">
              <span>Draw character silhouettes, camera directional vectors, and horizon lines.</span>
              <button
                onClick={saveCanvasSketch}
                className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors"
              >
                Save Sketch to Panel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
