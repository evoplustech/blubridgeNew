import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { FileText, MessageSquare, Briefcase, TrendingUp } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/admin/dashboard/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Footer Forms',
      icon: FileText,
      total: stats?.footer_forms?.total || 0,
      new: stats?.footer_forms?.new || 0,
      link: '/admin/footer-forms',
      color: 'bg-blue-500'
    },
    {
      title: 'Contact Forms',
      icon: MessageSquare,
      total: stats?.contact_forms?.total || 0,
      new: stats?.contact_forms?.new || 0,
      link: '/admin/contact-forms',
      color: 'bg-emerald-500'
    },
    {
      title: 'Career Applications',
      icon: Briefcase,
      total: stats?.career_applications?.total || 0,
      new: stats?.career_applications?.new || 0,
      link: '/admin/careers',
      color: 'bg-purple-500'
    },
    {
      title: 'Total Submissions',
      icon: TrendingUp,
      total: stats?.total_submissions || 0,
      new: null,
      link: null,
      color: 'bg-[#0B1F3B]'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3B]">Dashboard</h1>
          <p className="text-[#6B7280] mt-1">Overview of all form submissions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">{card.title}</p>
                  <p className="text-3xl font-bold text-[#0B1F3B] mt-2">
                    {loading ? '...' : card.total}
                  </p>
                  {card.new !== null && card.new > 0 && (
                    <p className="text-sm text-emerald-600 mt-1">
                      +{card.new} new
                    </p>
                  )}
                </div>
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              {card.link && (
                <Link 
                  to={card.link}
                  className="inline-block mt-4 text-sm text-[#328CC1] hover:text-[#0B1F3B] font-medium"
                >
                  View all →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <h2 className="text-lg font-semibold text-[#0B1F3B] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/admin/footer-forms"
              className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg hover:bg-[#E5E7EB] transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-[#374151]">Manage Footer Forms</span>
            </Link>
            <Link 
              to="/admin/contact-forms"
              className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg hover:bg-[#E5E7EB] transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-emerald-500" />
              <span className="font-medium text-[#374151]">Manage Contact Forms</span>
            </Link>
            <Link 
              to="/admin/careers"
              className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg hover:bg-[#E5E7EB] transition-colors"
            >
              <Briefcase className="w-5 h-5 text-purple-500" />
              <span className="font-medium text-[#374151]">Manage Applications</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
