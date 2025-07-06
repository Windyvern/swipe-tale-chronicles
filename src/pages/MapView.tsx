
import { useState } from 'react';
import { Map } from '@/components/Map';
import { TwoPanelStoryViewer } from '@/components/TwoPanelStoryViewer';
import { sampleStories } from '@/data/sampleStories';
import { Story } from '@/types/story';
import { X, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapView = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showMobileList, setShowMobileList] = useState(false);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setShowMobileList(false);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {selectedStory ? (
          <div className="relative min-h-screen">
            <button
              onClick={handleCloseStory}
              className="absolute top-4 left-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all duration-200"
            >
              <X size={20} />
            </button>
            <TwoPanelStoryViewer 
              initialStoryId={selectedStory.id}
              stories={sampleStories}
            />
          </div>
        ) : (
          <div className="relative h-screen">
            {/* Mobile Map/List Toggle */}
            <div className="absolute top-4 right-4 z-20">
              <Button
                onClick={() => setShowMobileList(!showMobileList)}
                className="rounded-full shadow-lg"
                size="sm"
              >
                <List size={16} />
              </Button>
            </div>

            {showMobileList ? (
              <div className="h-full overflow-y-auto bg-white p-4">
                <h2 className="text-xl font-bold mb-4">Stories</h2>
                <div className="space-y-4">
                  {sampleStories.map((story) => (
                    <button
                      key={story.id}
                      onClick={() => handleStorySelect(story)}
                      className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex gap-3">
                        {story.thumbnail && (
                          <img
                            src={`https://images.unsplash.com/${story.thumbnail}?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80`}
                            alt={story.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{story.title}</h3>
                          <p className="text-sm text-gray-600">{story.handle}</p>
                          <p className="text-xs text-gray-500 mt-1">{story.address}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <Map
                stories={sampleStories}
                onStorySelect={handleStorySelect}
                selectedStoryId={selectedStory?.id}
              />
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        {selectedStory ? (
          <>
            {/* Map Panel */}
            <div className="w-1/3 relative">
              <button
                onClick={handleCloseStory}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200"
              >
                <X size={20} />
              </button>
              <Map
                stories={sampleStories}
                onStorySelect={handleStorySelect}
                selectedStoryId={selectedStory.id}
              />
            </div>
            
            {/* Story Viewer Panel */}
            <div className="w-2/3">
              <TwoPanelStoryViewer 
                initialStoryId={selectedStory.id}
                stories={sampleStories}
              />
            </div>
          </>
        ) : (
          <div className="w-full">
            <Map
              stories={sampleStories}
              onStorySelect={handleStorySelect}
              selectedStoryId={selectedStory?.id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
