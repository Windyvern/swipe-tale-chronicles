
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { Story } from '@/types/story';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  stories: Story[];
  onStorySelect: (story: Story) => void;
  selectedStoryId?: string;
}

export const Map = ({ stories, onStorySelect, selectedStoryId }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    // Initialize marker cluster group
    markersRef.current = L.markerClusterGroup({
      maxClusterRadius: 50,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `<div class="cluster-marker">${count}</div>`,
          className: 'custom-cluster-icon',
          iconSize: L.point(40, 40)
        });
      }
    });

    mapInstanceRef.current.addLayer(markersRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markersRef.current) return;

    // Clear existing markers
    markersRef.current.clearLayers();

    // Add markers for each story
    stories.forEach((story) => {
      if (!story.geo) return;

      const thumbnailPanel = story.panels.find(p => p.id === story.thumbnailPanelId) || story.panels[0];
      const thumbnailUrl = thumbnailPanel?.media 
        ? `https://images.unsplash.com/${thumbnailPanel.media}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80`
        : null;

      const isSelected = story.id === selectedStoryId;

      const markerIcon = L.divIcon({
        html: `
          <div class="story-marker ${isSelected ? 'selected' : ''}" data-story-id="${story.id}">
            ${thumbnailUrl 
              ? `<img src="${thumbnailUrl}" alt="${story.title}" class="marker-thumbnail" />` 
              : `<div class="marker-placeholder">${story.title[0]}</div>`
            }
            <div class="marker-title">${story.title}</div>
          </div>
        `,
        className: 'custom-story-marker',
        iconSize: [60, 80],
        iconAnchor: [30, 80]
      });

      const marker = L.marker([story.geo.lat, story.geo.lng], { icon: markerIcon });
      
      marker.on('click', () => {
        onStorySelect(story);
      });

      markersRef.current.addLayer(marker);
    });
  }, [stories, onStorySelect, selectedStoryId]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <style jsx>{`
        .story-marker {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          padding: 4px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .story-marker:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        .story-marker.selected {
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
          border: 2px solid #3b82f6;
        }
        .marker-thumbnail {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          object-fit: cover;
        }
        .marker-placeholder {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
        }
        .marker-title {
          font-size: 10px;
          font-weight: 500;
          margin-top: 2px;
          color: #374151;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 56px;
        }
        .cluster-marker {
          background: #3b82f6;
          color: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        .custom-cluster-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};
