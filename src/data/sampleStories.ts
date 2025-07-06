
import { Story } from "@/types/story";

export const sampleStories: Story[] = [
  {
    id: "story-1",
    title: "Urban Photography Journey",
    author: "Alex Chen",
    publishedAt: "2024-01-15T10:00:00Z",
    thumbnail: "photo-1518770660439-4636190af475",
    tags: ["photography", "urban", "street", "art"],
    panels: [
      {
        id: "panel-1",
        type: "text",
        title: "Welcome to the City",
        content: "Join me on a photographic journey through the heart of the metropolis, where every corner tells a story.",
        duration: 6
      },
      {
        id: "panel-2",
        type: "image",
        title: "Morning Light",
        content: "The city awakens as golden hour paints the buildings in warm hues.",
        media: "photo-1518770660439-4636190af475",
        duration: 8
      },
      {
        id: "panel-3",
        type: "image",
        title: "Street Life",
        content: "Capturing the energy and movement of people navigating their daily routines.",
        media: "photo-1461749280684-dccba630e2f6",
        duration: 7
      },
      {
        id: "panel-4",
        type: "quote",
        content: "In every walk with nature, one receives far more than they seek.",
        title: "John Muir",
        duration: 5
      },
      {
        id: "panel-5",
        type: "image",
        title: "Reflections",
        content: "Architecture creates beautiful patterns when reflected in glass and water.",
        media: "photo-1518005020951-eccb494ad742",
        duration: 6
      }
    ]
  },
  {
    id: "story-2",
    title: "Tech Innovation Spotlight",
    author: "Sarah Martinez",
    publishedAt: "2024-01-20T14:30:00Z",
    thumbnail: "photo-1488590528505-98d2b5aba04b",
    tags: ["technology", "innovation", "startup", "future"],
    panels: [
      {
        id: "panel-6",
        type: "text",
        title: "The Future is Here",
        content: "Exploring breakthrough technologies that are reshaping our world and daily experiences.",
        duration: 5
      },
      {
        id: "panel-7",
        type: "image",
        title: "Digital Workspace",
        content: "Modern technology enables seamless collaboration across global teams.",
        media: "photo-1488590528505-98d2b5aba04b",
        duration: 7
      },
      {
        id: "panel-8",
        type: "image",
        title: "Innovation Hub",
        content: "Where creativity meets technology to solve tomorrow's challenges.",
        media: "photo-1581091226825-a6a2a5aee158",
        duration: 6
      },
      {
        id: "panel-9",
        type: "text",
        title: "Looking Forward",
        content: "The intersection of artificial intelligence and human creativity opens unlimited possibilities.",
        duration: 8
      }
    ]
  },
  {
    id: "story-3",
    title: "Nature's Tranquility",
    author: "Emma Thompson",
    publishedAt: "2024-01-25T09:15:00Z",
    thumbnail: "photo-1500673922987-e212871fec22",
    tags: ["nature", "landscape", "peaceful", "meditation"],
    panels: [
      {
        id: "panel-10",
        type: "image",
        title: "Serene Waters",
        content: "Find peace in the gentle rhythm of nature's own meditation.",
        media: "photo-1500673922987-e212871fec22",
        duration: 10
      },
      {
        id: "panel-11",
        type: "quote",
        content: "Nature does not hurry, yet everything is accomplished.",
        title: "Lao Tzu",
        duration: 6
      },
      {
        id: "panel-12",
        type: "text",
        title: "Mindful Moments",
        content: "In nature's embrace, we rediscover the rhythm of our own hearts and the clarity of our minds.",
        duration: 7
      }
    ]
  }
];
