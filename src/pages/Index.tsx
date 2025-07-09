
import { TwoPanelStoryViewer } from "@/components/TwoPanelStoryViewer";
import { useStories } from "@/hooks/useStories";
import { Button } from "@/components/ui/button";
import { Map, Settings, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: stories, isLoading, error } = useStories();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="animate-spin" size={24} />
          <span>Loading stories...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl mb-2">Error loading stories</h2>
          <p className="text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl mb-2">No stories found</h2>
          <p className="text-gray-400">Check back later for new content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <Link to="/map">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Map size={16} className="mr-2" />
            Map View
          </Button>
        </Link>
        <Link to="/admin">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Settings size={16} className="mr-2" />
            Admin
          </Button>
        </Link>
      </div>

      <TwoPanelStoryViewer stories={stories} />
    </div>
  );
};

export default Index;
