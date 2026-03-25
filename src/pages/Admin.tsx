import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Bell,
  Newspaper,
  Video,
  Calendar,
  Settings,
  Image as ImageIcon,
  Type,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  XCircle,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// We'll define the same interfaces used in DataContext to ensure type safety
interface Notice { title: string; date: string; content: string; }
interface News { title: string; date: string; image: string; content?: string; }
interface Event { date: string; month: string; title: string; time: string; location: string; }
interface VideoItem { title: string; seed: string; }
interface Teacher { name_en: string; role_en: string; image_url: string; }

interface SiteData {
  teachers: Teacher[];
  notices: Notice[];
  news: News[];
  videos: VideoItem[];
  events: Event[];
  images: { hero: string; about: string; };
  titles: { hero: string; };
}

const TABS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'teachers', label: 'Teachers', icon: Users },
  { id: 'notices', label: 'Notices', icon: Bell },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'events', label: 'Events', icon: Calendar },
] as const;

type TabId = typeof TABS[number]['id'];

const Admin = () => {
  const [content, setContent] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Notification state
  const [notification, setNotification] = useState<{show: boolean, type: 'success' | 'error', message: string}>({
    show: false, type: 'success', message: ''
  });

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSave = () => {
    fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        showNotification('success', 'Changes saved successfully!');
      } else {
        showNotification('error', 'Failed to save changes.');
      }
    })
    .catch(() => {
       showNotification('error', 'Network error. Failed to save.');
    });
  };

  if (!content) return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  );

  // Helper functions for array manipulations
  const updateArrayItem = <K extends keyof SiteData>(key: K, index: number, field: string, value: any) => {
    const newArray = [...(content[key] as any[])];
    newArray[index] = { ...newArray[index], [field]: value };
    setContent({ ...content, [key]: newArray });
  };

  const addArrayItem = <K extends keyof SiteData>(key: K, emptyItem: any) => {
    setContent({ ...content, [key]: [emptyItem, ...(content[key] as any[])] });
  };

  const removeArrayItem = <K extends keyof SiteData>(key: K, index: number) => {
    const newArray = [...(content[key] as any[])];
    newArray.splice(index, 1);
    setContent({ ...content, [key]: newArray });
  };


  // Subcomponents for different sections
  const GeneralTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
          <ImageIcon className="w-5 h-5 text-primary-500" />
          Images
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Section Image URL</label>
            <input 
              value={content.images?.hero || ''} 
              onChange={e => setContent({...content, images: {...content.images, hero: e.target.value}})} 
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About Section Image URL</label>
            <input 
              value={content.images?.about || ''} 
              onChange={e => setContent({...content, images: {...content.images, about: e.target.value}})} 
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
          <Type className="w-5 h-5 text-primary-500" />
          Titles & Typography
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Title</label>
            <input 
              value={content.titles?.hero || ''} 
              onChange={e => setContent({...content, titles: {...content.titles, hero: e.target.value}})} 
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ArrayTab = ({ 
    title, 
    dataKey, 
    fields,
    emptyTemplate
  }: {
    title: string;
    dataKey: keyof SiteData;
    fields: {key: string, label: string, type: 'text' | 'textarea'} [];
    emptyTemplate: any;
  }) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
        <button 
          onClick={() => addArrayItem(dataKey, emptyTemplate)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      <div className="space-y-4">
        {(content[dataKey] as any[] || []).map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative group">
            <button 
              onClick={() => removeArrayItem(dataKey, index)}
              className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Delete item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="space-y-4 pr-12">
              {fields.map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      value={item[field.key] || ''} 
                      onChange={e => updateArrayItem(dataKey, index, field.key, e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50 dark:bg-gray-700 dark:text-white min-h-[100px]"
                    />
                  ) : (
                    <input 
                      value={item[field.key] || ''} 
                      onChange={e => updateArrayItem(dataKey, index, field.key, e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50 dark:bg-gray-700 dark:text-white"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {(content[dataKey] as any[] || []).length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            No items found. Click 'Add New' to create one.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex font-sans pt-16">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400 font-bold text-xl mb-8">
            <LayoutDashboard className="w-6 h-6" />
            Panel
          </div>
          <nav className="space-y-2">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full p-4 lg:p-8">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
              {activeTab} Settings
            </h1>
          </div>
          
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md active:transform active:scale-95"
          >
            <Save className="w-5 h-5" />
            <span className="hidden sm:inline">Save Changes</span>
          </button>
        </header>

        {/* Dynamic Content Area */}
        {activeTab === 'general' && <GeneralTab />}
        
        {activeTab === 'notices' && (
          <ArrayTab 
            title="Manage Notices" 
            dataKey="notices" 
            emptyTemplate={{title: '', date: new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}), content: ''}}
            fields={[
              {key: 'title', label: 'Notice Title', type: 'text'},
              {key: 'date', label: 'Date', type: 'text'},
              {key: 'content', label: 'Content', type: 'textarea'}
            ]}
          />
        )}

        {activeTab === 'news' && (
          <ArrayTab 
            title="Manage News" 
            dataKey="news" 
            emptyTemplate={{title: '', date: '', image: ''}}
            fields={[
              {key: 'title', label: 'News Title', type: 'text'},
              {key: 'date', label: 'Date', type: 'text'},
              {key: 'image', label: 'Image URL', type: 'text'}
            ]}
          />
        )}

        {activeTab === 'videos' && (
          <ArrayTab 
            title="Manage Videos" 
            dataKey="videos" 
            emptyTemplate={{title: '', seed: ''}}
            fields={[
              {key: 'title', label: 'Video Title', type: 'text'},
              {key: 'seed', label: 'Video Seed/Identifier', type: 'text'}
            ]}
          />
        )}

        {activeTab === 'events' && (
          <ArrayTab 
            title="Manage Events" 
            dataKey="events" 
            emptyTemplate={{title: '', date: '', month: '', time: '', location: ''}}
            fields={[
              {key: 'title', label: 'Event Title', type: 'text'},
              {key: 'date', label: 'Date Day (e.g. 15)', type: 'text'},
              {key: 'month', label: 'Month (e.g. MAR)', type: 'text'},
              {key: 'time', label: 'Time', type: 'text'},
              {key: 'location', label: 'Location', type: 'text'}
            ]}
          />
        )}

        {activeTab === 'teachers' && (
          <ArrayTab 
            title="Manage Teachers" 
            dataKey="teachers" 
            emptyTemplate={{name_en: '', role_en: '', image_url: ''}}
            fields={[
              {key: 'name_en', label: 'Entity Name (English)', type: 'text'},
              {key: 'role_en', label: 'Role (English)', type: 'text'},
              {key: 'image_url', label: 'Profile Image URL', type: 'text'}
            ]}
          />
        )}

      </main>

      {/* Floating Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-6 left-1/2 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg z-50 text-white ${
              notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Admin;
