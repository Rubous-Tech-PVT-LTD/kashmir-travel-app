import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../utils/api';
import SEO from '../components/SEO';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Calendar, User, ChevronLeft, Loader } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogAPI.getBySlug(slug);
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader size={48} className="animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Blog not found</h1>
        <button 
          onClick={() => navigate('/blogs')}
          className="text-emerald-600 flex items-center gap-2 hover:underline"
        >
          <ChevronLeft size={20} /> Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={`${blog.title} | Kashmir Travel Blog`}
        description={blog.excerpt || blog.title}
        image={blog.coverImage}
        url={`https://habakhatoon.com/blogs/${blog.slug}`}
      />
      <Navbar />

      <div className="relative h-[60vh] min-h-[400px]">
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center text-white">
            <button 
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold mb-8 hover:bg-white/30 transition shadow-xl"
            >
              <ChevronLeft size={16} /> All Blog Stories
            </button>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 [text-shadow:0_4px_12px_rgba(0,0,0,0.5)]">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm font-medium">
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <User size={18} />
                {blog.author}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div 
          className="prose prose-lg prose-emerald max-w-none text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      <Footer />
    </div>
  );
}
