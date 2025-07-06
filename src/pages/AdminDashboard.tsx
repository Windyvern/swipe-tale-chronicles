
import { useState } from 'react';
import { Plus, Map, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleEditor } from '@/components/admin/ArticleEditor';
import { ArticlesList } from '@/components/admin/ArticlesList';
import { sampleStories } from '@/data/sampleStories';

const AdminDashboard = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleEditArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setIsCreatingNew(false);
  };

  const handleCreateNew = () => {
    setSelectedArticleId(null);
    setIsCreatingNew(true);
  };

  const handleBackToList = () => {
    setSelectedArticleId(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your story articles and map settings</p>
        </div>

        {/* Main Content */}
        {selectedArticleId || isCreatingNew ? (
          <ArticleEditor
            articleId={selectedArticleId}
            onBack={handleBackToList}
          />
        ) : (
          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <FileText size={16} />
                Articles
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <Map size={16} />
                Map Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Articles</h2>
                <Button onClick={handleCreateNew} className="flex items-center gap-2">
                  <Plus size={16} />
                  New Article
                </Button>
              </div>
              
              <ArticlesList
                articles={sampleStories}
                onEditArticle={handleEditArticle}
              />
            </TabsContent>

            <TabsContent value="map" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Map Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">
                      <p>Map settings and configuration options will be available here.</p>
                      <p className="mt-2">Features coming soon:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Default map center and zoom level</li>
                        <li>Marker clustering settings</li>
                        <li>Custom map styles</li>
                        <li>Geocoding API configuration</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
