
import { MapPin, Bookmark, Share2, Tag } from "lucide-react";
import { Story, StoryPanelData } from "@/types/story";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StoryMetadataProps {
  story: Story;
  currentPanel: StoryPanelData;
}

export const StoryMetadata = ({ story, currentPanel }: StoryMetadataProps) => {
  const handleSave = () => {
    console.log("Save story:", story.id);
    // TODO: Implement save functionality
  };

  const handleShare = () => {
    console.log("Share story:", story.id);
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: `Check out this story: ${story.title}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="h-screen overflow-y-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{story.title}</h1>
        <p className="text-lg text-gray-600 mb-1">@{story.author.toLowerCase().replace(' ', '.')}</p>
        
        {/* Location (mock data) */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          <span>Paris, France</span>
        </div>

        {/* Published Date */}
        <p className="text-sm text-gray-400">
          Published {new Date(story.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Tags */}
      {story.tags && story.tags.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Current Panel Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Panel</h3>
        {currentPanel.title && (
          <h4 className="font-semibold text-gray-900 mb-1">{currentPanel.title}</h4>
        )}
        {currentPanel.content && (
          <p className="text-sm text-gray-600">{currentPanel.content}</p>
        )}
        <div className="mt-2 text-xs text-gray-400">
          Type: {currentPanel.type} • Duration: {currentPanel.duration || 5}s
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
        <div className="prose prose-sm text-gray-700">
          <p>
            Experience this captivating story through an immersive visual journey. 
            Each panel has been carefully crafted to tell a compelling narrative that 
            engages and inspires. Swipe through to discover the full story.
          </p>
          <p className="mt-3">
            This story contains {story.panels.length} panels, each offering a unique 
            perspective on the theme. Perfect for both quick browsing and deep 
            engagement with the content.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <Button 
          onClick={handleSave} 
          variant="outline" 
          className="flex-1"
        >
          <Bookmark size={16} className="mr-2" />
          Save
        </Button>
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="flex-1"
        >
          <Share2 size={16} className="mr-2" />
          Share
        </Button>
      </div>

      {/* Story Stats */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Story Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Panels:</span>
            <span className="ml-1 font-medium">{story.panels.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Author:</span>
            <span className="ml-1 font-medium">{story.author}</span>
          </div>
          <div>
            <span className="text-gray-500">Type:</span>
            <span className="ml-1 font-medium">Visual Story</span>
          </div>
          <div>
            <span className="text-gray-500">Duration:</span>
            <span className="ml-1 font-medium">
              ~{Math.ceil(story.panels.length * 5 / 60)} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
