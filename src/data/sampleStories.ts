
import { Story } from "@/types/story";

export const sampleStories: Story[] = [
  {
    id: "1",
    title: "The Future of Technology",
    author: "Alex Chen",
    publishedAt: "2024-01-15",
    panels: [
      {
        id: "1-1",
        type: "text",
        title: "The Future is Here",
        content: "Exploring how technology is reshaping our world in ways we never imagined.",
      },
      {
        id: "1-2",
        type: "image",
        title: "AI Revolution",
        content: "Artificial Intelligence is transforming industries across the globe.",
        media: "photo-1488590528505-98d2b5aba04b",
      },
      {
        id: "1-3",
        type: "quote",
        content: "The best way to predict the future is to invent it.",
        title: "Alan Kay",
      },
      {
        id: "1-4",
        type: "image",
        title: "Connected World",
        content: "Every device, every person, connected in an intricate web of data.",
        media: "photo-1518770660439-4636190af475",
      },
    ],
  },
  {
    id: "2",
    title: "Journey Through Nature",
    author: "Maria Rodriguez",
    publishedAt: "2024-01-14",
    panels: [
      {
        id: "2-1",
        type: "image",
        title: "Serene Waters",
        content: "Finding peace in the quiet moments of nature.",
        media: "photo-1506744038136-46273834b3fb",
      },
      {
        id: "2-2",
        type: "text",
        title: "Digital Detox",
        content: "Sometimes we need to disconnect from technology to reconnect with ourselves.",
      },
      {
        id: "2-3",
        type: "quote",
        content: "In every walk with nature, one receives far more than they seek.",
        title: "John Muir",
      },
      {
        id: "2-4",
        type: "image",
        title: "The Great Outdoors",
        content: "Nature's beauty reminds us of what truly matters.",
        media: "photo-1649972904349-6e44c42644a7",
      },
    ],
  },
  {
    id: "3",
    title: "Creative Coding",
    author: "David Kim",
    publishedAt: "2024-01-13",
    panels: [
      {
        id: "3-1",
        type: "image",
        title: "Code as Art",
        content: "When programming becomes a creative expression.",
        media: "photo-1461749280684-dccba630e2f6",
      },
      {
        id: "3-2",
        type: "text",
        title: "Building Dreams",
        content: "Every line of code is a step towards bringing imagination to life.",
      },
      {
        id: "3-3",
        type: "image",
        title: "Modern Workspace",
        content: "Where creativity meets technology.",
        media: "photo-1486312338219-ce68d2c6f44d",
      },
      {
        id: "3-4",
        type: "quote",
        content: "Code is poetry written in a language that machines can understand.",
        title: "Anonymous Developer",
      },
    ],
  },
];
