
import { TwoPanelStoryViewer } from "@/components/TwoPanelStoryViewer";
import { sampleStories } from "@/data/sampleStories";
import { Button } from "@/components/ui/button";
import { Map, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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

      <TwoPanelStoryViewer stories={sampleStories} />
    </div>
  );
};

export default Index;
