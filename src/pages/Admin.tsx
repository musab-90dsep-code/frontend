import { useState, useEffect } from 'react';

const Admin = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  const handleSave = () => {
    fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    }).then(() => alert('Saved!'));
  };

  if (!content) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <button onClick={handleSave} className="bg-primary-dark text-white px-4 py-2 rounded mb-6">Save Changes</button>
      
      <div className="space-y-10">
        <div>
          <h2 className="text-xl font-bold mb-2">Notices</h2>
          {content.notices.map((n, i) => (
            <div key={i} className="mb-4 p-4 border rounded">
              <input value={n.title} onChange={e => {
                const newNotices = [...content.notices];
                newNotices[i].title = e.target.value;
                setContent({...content, notices: newNotices});
              }} className="border p-1 w-full mb-2" placeholder="Title" />
              <textarea value={n.content} onChange={e => {
                const newNotices = [...content.notices];
                newNotices[i].content = e.target.value;
                setContent({...content, notices: newNotices});
              }} className="border p-1 w-full" placeholder="Content" />
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Images</h2>
          <input value={content.images.hero} onChange={e => setContent({...content, images: {...content.images, hero: e.target.value}})} className="border p-1 w-full" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Titles</h2>
          <input value={content.titles.hero} onChange={e => setContent({...content, titles: {...content.titles, hero: e.target.value}})} className="border p-1 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
