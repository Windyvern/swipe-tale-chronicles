
export interface StoryPanelData {
  id: string;
  type: "text" | "image" | "video" | "quote";
  title?: string;
  content?: string;
  media?: string; // URL or ID for images/videos
  duration?: number; // in seconds
}

export interface Story {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  panels: StoryPanelData[];
  thumbnail?: string;
  tags?: string[];
}
