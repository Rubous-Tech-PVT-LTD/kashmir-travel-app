import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../utils/api';
import SEO from '../components/SEO';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Calendar, User, ArrowRight, Loader } from 'lucide-react';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogAPI.getAll();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Kashmir Travel Blog | Haba Khatoon Travels"
        description="Read the latest travel stories, guides, and tips about Kashmir. Discover hidden gems, best times to visit, and local culture."
        url="https://habakhatoon.com/blogs"
      />
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">Kashmir Travel Stories</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Insights, guides, and inspiration for your next journey to the paradise on earth.
          </p>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader size={48} className="animate-spin text-emerald-600" />
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div 
                key={blog._id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                onClick={() => navigate(`/blogs/${blog.slug}`)}
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <span className="bg-emerald-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Kashmir</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {blog.author}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {(blog.excerpt || '').replace(/<[^>]*>?/gm, '')}
                  </p>
                  
                  <div className="flex items-center text-emerald-600 font-bold text-sm gap-2">
                    Read Full Story <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-slate-500 text-xl font-medium">No blog posts found. Check back soon!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
