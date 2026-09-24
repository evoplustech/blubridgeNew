import React, { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || window.location.origin;
const API = `${BACKEND_URL}/api`;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useDocumentTitle('Blog | BluBridge');

  return (
    <div className="min-h-screen bg-[#f0f1f9]">      {/* Hero */}
      <section className="py-24 bg-[#f0f1f9] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#328CC1] rounded-full filter blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-[#0B1F3B] mb-6">
              BluBridge Blog
            </h1>
            <p className="text-xl text-[#2F3A4A]">
              Insights on AI infrastructure, cloud computing, and the future of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 bg-[#f0f1f9]">
        <div className="container-custom">
          {loading ? (
            <div className="text-center text-white">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-[#2F3A4A]">No blog posts yet. Check back soon!</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="bg-white/5 border-[#d4d8e8] hover:border-[#0066FF]/50 transition-all duration-300 h-full overflow-hidden group">
                    <div className="h-56 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="text-[#328CC1] text-sm mb-2">{new Date(post.created_at).toLocaleDateString()}</div>
                      <h3 className="text-xl font-bold text-[#0B1F3B] mb-3">{post.title}</h3>
                      <p className="text-[#2F3A4A] mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center space-x-2 text-[#328CC1]">
                        <span>Read more</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;