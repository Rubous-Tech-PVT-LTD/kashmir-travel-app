import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../utils/api';
import { Btn, FormField, Modal, Badge } from '../components/AdminPanelUI';
import { Plus, Trash2, Edit2, Search, FileText, Calendar, User } from 'lucide-react';

const INITIAL_BLOG_FORM = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  coverImage: '',
  author: 'Haba Khatoon Travels',
  tags: '',
};

export default function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [blogForm, setBlogForm] = useState(INITIAL_BLOG_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getBlogs();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setBlogForm(prev => ({
      ...prev,
      title,
      slug: editingId ? prev.slug : generateSlug(title)
    }));
  };

  const handleSaveBlog = async () => {
    if (!blogForm.title || !blogForm.content || !blogForm.slug) {
      return setError('Title, Slug and Content are required');
    }

    try {
      setSubmitting(true);
      setError('');
      
      const payload = {
        ...blogForm,
        tags: blogForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      if (editingId) {
        const data = await adminAPI.updateBlog(editingId, payload);
        if (data.success) {
          setBlogs(blogs.map(b => b._id === editingId ? data.data : b));
        }
      } else {
        const data = await adminAPI.createBlog(payload);
        if (data.success) {
          setBlogs([data.data, ...blogs]);
        }
      }
      
      setShowForm(false);
      setEditingId(null);
      setBlogForm(INITIAL_BLOG_FORM);
    } catch (err) {
      setError(err.message || 'Failed to save blog');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt || '',
      coverImage: blog.coverImage || '',
      author: blog.author || 'Haba Khatoon Travels',
      tags: blog.tags ? blog.tags.join(', ') : '',
    });
    setEditingId(blog._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const data = await adminAPI.deleteBlog(id);
      if (data.success) {
        setBlogs(blogs.filter(b => b._id !== id));
      }
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Blog Posts</h2>
          <p className="text-slate-500 text-sm">Write and edit articles for your Kashmir travel blog.</p>
        </div>
        <Btn onClick={() => { setBlogForm(INITIAL_BLOG_FORM); setEditingId(null); setShowForm(true); }}>
          <Plus size={18} className="mr-2" /> New Blog Post
        </Btn>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by title..." 
            className="flex-1 outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={blog.coverImage} className="w-12 h-12 rounded-lg object-cover" alt="" />
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{blog.title}</div>
                          <div className="text-xs text-slate-400 font-mono">/{blog.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="success">Published</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(blog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(blog._id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    {loading ? 'Loading articles...' : 'No blog posts found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <Modal 
          title={editingId ? 'Edit Blog Post' : 'Create New Article'} 
          onClose={() => setShowForm(false)}
        >
          <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
            {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm">{error}</div>}
            
            <FormField label="Title" required>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={blogForm.title}
                onChange={handleTitleChange}
                placeholder="e.g., Best Places to Visit in Kashmir during Winter"
              />
            </FormField>

            <FormField label="URL Slug (Permanent Link)" required>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg bg-slate-50 font-mono text-sm"
                value={blogForm.slug}
                onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Author">
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg"
                  value={blogForm.author}
                  onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                />
              </FormField>
              <FormField label="Tags (comma separated)">
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg"
                  value={blogForm.tags}
                  placeholder="Kashmir, Winter, Guide"
                  onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
                />
              </FormField>
            </div>

            <FormField label="Cover Image URL">
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg"
                value={blogForm.coverImage}
                onChange={(e) => setBlogForm({...blogForm, coverImage: e.target.value})}
                placeholder="https://image-url.com/photo.jpg"
              />
            </FormField>

            <FormField label="Excerpt (Short Summary)" required>
              <textarea 
                className="w-full px-4 py-2 border rounded-lg h-20"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                placeholder="A brief summary for the blog list page..."
              />
            </FormField>

            <FormField label="Content (HTML Support)" required>
              <textarea 
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm h-64"
                value={blogForm.content}
                onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                placeholder="Write your article here. You can use <p>, <h2>, <strong> etc."
              />
            </FormField>

            <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white">
              <Btn variant="secondary" onClick={() => setShowForm(false)}>Cancel</Btn>
              <Btn onClick={handleSaveBlog} disabled={submitting}>
                {submitting ? 'Saving...' : 'Publish Article'}
              </Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
