
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Grid3X3, MapPin, Bookmark, Share2 } from "lucide-react";
import { StoryPanel } from "./StoryPanel";
import { ProgressBar } from "./ProgressBar";
import { StoryGalleryOverlay } from "./StoryGalleryOverlay";
import { StoryMetadata } from "./StoryMetadata";
import { sampleStories } from "@/data/sampleStories";
import { useSwipeGestures } from "@/hooks/useSwipeGestures";

export const TwoPanelStoryViewer = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showGallery, setShowGallery] = useState(false);

  const currentStory = sampleStories[currentStoryIndex];
  const currentPanel = currentStory?.panels[currentPanelIndex];

  const goToNextPanel = useCallback(() => {
    if (currentPanelIndex < currentStory.panels.length - 1) {
      setCurrentPanelIndex(prev => prev + 1);
    } else if (currentStoryIndex < sampleStories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setCurrentPanelIndex(0);
    } else {
      // Loop back to beginning
      setCurrentStoryIndex(0);
      setCurrentPanelIndex(0);
    }
  }, [currentStoryIndex, currentPanelIndex, currentStory]);

  const goToPreviousPanel = useCallback(() => {
    if (currentPanelIndex > 0) {
      setCurrentPanelIndex(prev => prev - 1);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setCurrentPanelIndex(sampleStories[currentStoryIndex - 1].panels.length - 1);
    }
  }, [currentStoryIndex, currentPanelIndex]);

  const jumpToPanel = (panelIndex: number) => {
    setCurrentPanelIndex(panelIndex);
    setShowGallery(false);
  };

  // Auto-advance timer
  useEffect(() => {
    if (!isAutoPlaying || showGallery) return;

    const timer = setTimeout(() => {
      goToNextPanel();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentPanelIndex, currentStoryIndex, isAutoPlaying, goToNextPanel, showGallery]);

  // Swipe gesture support for left panel only
  const swipeHandlers = useSwipeGestures({
    onSwipeLeft: goToNextPanel,
    onSwipeRight: goToPreviousPanel,
  });

  const handlePanelClick = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    
    if (clickX < width / 2) {
      goToPreviousPanel();
    } else {
      goToNextPanel();
    }
  };

  if (!currentStory || !currentPanel) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Layout - Single Panel */}
      <div className="md:hidden">
        <div 
          className="relative min-h-screen overflow-hidden"
          {...swipeHandlers}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4">
            <ProgressBar
              totalPanels={currentStory.panels.length}
              currentPanel={currentPanelIndex}
              storyTitle={currentStory.title}
              author={currentStory.author}
            />
          </div>

          {/* Gallery Button */}
          <button
            onClick={() => setShowGallery(true)}
            className="absolute top-20 left-4 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all duration-200"
          >
            <Grid3X3 size={20} />
          </button>

          {/* Story Panel */}
          <div 
            className="w-full h-screen cursor-pointer"
            onClick={handlePanelClick}
          >
            <StoryPanel panel={currentPanel} />
          </div>

          {/* Story Gallery Overlay */}
          {showGallery && (
            <StoryGalleryOverlay
              story={currentStory}
              currentPanelIndex={currentPanelIndex}
              onPanelSelect={jumpToPanel}
              onClose={() => setShowGallery(false)}
            />
          )}
        </div>
      </div>

      {/* Desktop Layout - Two Panels */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Panel - Story Viewer */}
        <div className="w-1/2 relative overflow-hidden">
          <div 
            className="relative h-screen"
            {...swipeHandlers}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4">
              <ProgressBar
                totalPanels={currentStory.panels.length}
                currentPanel={currentPanelIndex}
                storyTitle={currentStory.title}
                author={currentStory.author}
              />
            </div>

            {/* Gallery Button */}
            <button
              onClick={() => setShowGallery(true)}
              className="absolute top-20 left-4 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all duration-200"
            >
              <Grid3X3 size={20} />
            </button>

            {/* Story Panel */}
            <div 
              className="w-full h-screen cursor-pointer"
              onClick={handlePanelClick}
            >
              <StoryPanel panel={currentPanel} />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPreviousPanel}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-all duration-200"
              disabled={currentStoryIndex === 0 && currentPanelIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={goToNextPanel}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-all duration-200"
            >
              <ChevronRight size={24} />
            </button>

            {/* Story Gallery Overlay */}
            {showGallery && (
              <StoryGalleryOverlay
                story={currentStory}
                currentPanelIndex={currentPanelIndex}
                onPanelSelect={jumpToPanel}
                onClose={() => setShowGallery(false)}
              />
            )}
          </div>
        </div>

        {/* Right Panel - Story Metadata */}
        <div className="w-1/2 bg-white">
          <StoryMetadata 
            story={currentStory}
            currentPanel={currentPanel}
          />
        </div>
      </div>
    </div>
  );
};
