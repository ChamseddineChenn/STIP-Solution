import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiArticleLine,
  RiBriefcaseLine,
  RiEyeLine,
  RiUserLine,
  RiLoader4Line,
} from 'react-icons/ri';
import { blogAPI, jobAPI, applicationAPI } from '../services/api';

const StatCard = ({ icon: Icon, title, value, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-hover transition-all duration-300 border border-border group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {trend && (
          <p
            className={`text-xs mt-2 ${
              trend > 0 ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {trend > 0 ? '+' : ''}
            {trend}% ce mois
          </p>
        )}
      </div>
      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
  </div>
);

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'article':
        return <RiArticleLine className="w-5 h-5 text-primary" />;
      case 'job':
        return <RiBriefcaseLine className="w-5 h-5 text-primary" />;
      default:
        return <RiEyeLine className="w-5 h-5 text-primary" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "À l'instant";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="shrink-0">{getActivityIcon(activity.type)}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{activity.title}</span>
          {' - '}
          <span
            className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
              activity.published
                ? 'bg-green-50 text-green-700'
                : 'bg-yellow-50 text-yellow-700'
            }`}
          >
            {activity.published ? 'Publié' : 'Brouillon'}
          </span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {formatDate(activity.date)}
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { icon: RiArticleLine, title: 'Articles publiés', value: '0', trend: 0 },
    { icon: RiBriefcaseLine, title: "Offres d'emploi", value: '0', trend: 0 },
    { icon: RiEyeLine, title: 'Vues ce mois', value: '0', trend: 0 },
    { icon: RiUserLine, title: 'Candidatures', value: '0', trend: 0 },
  ]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);

      // Fetch blogs, jobs, and applications
      const [blogRes, jobRes, appRes] = await Promise.all([
        blogAPI.getAll({ limit: 100 }),
        jobAPI.getAll({ limit: 100 }),
        applicationAPI.getAll({ limit: 100 }),
      ]);

      const blogs = blogRes.data.success ? blogRes.data.data : [];
      const jobs = jobRes.data.success ? jobRes.data.data : [];
      const applications = appRes.data.success ? appRes.data.data : [];

      // Convert to activities
      const blogActivities = blogs.map((blog) => ({
        type: 'article',
        title: blog.mainTitle,
        published: blog.published,
        date: blog.createdAt || new Date(),
      }));

      const jobActivities = jobs.map((job) => ({
        type: 'job',
        title: job.title,
        published: job.published,
        date: job.createdAt || new Date(),
      }));

      // Combine and sort by date
      const allActivities = [...blogActivities, ...jobActivities]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setActivities(allActivities);

      // Update stats
      const publishedBlogs = blogs.filter((b) => b.published).length;
      const publishedJobs = jobs.filter((j) => j.published).length;
      const totalApplications = applications.length;

      setStats((prevStats) =>
        prevStats.map((stat) => {
          if (stat.title === 'Articles publiés') {
            return { ...stat, value: publishedBlogs.toString() };
          }
          if (stat.title === "Offres d'emploi") {
            return { ...stat, value: publishedJobs.toString() };
          }
          if (stat.title === 'Candidatures') {
            return { ...stat, value: totalApplications.toString() };
          }
          return stat;
        })
      );
    } catch (error) {
      console.error('Erreur lors du chargement des activités:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-500 mt-1">
          Bienvenue sur le panneau d'administration STIP
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-card border border-border mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/blogs/create')}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-primary/10 transition-all duration-200 active:scale-[0.98] group cursor-pointer"
          >
            <RiArticleLine className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-200">
              Nouvel article
            </span>
          </button>
          <button
            onClick={() => navigate('/jobs/create')}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-primary/10 transition-all duration-200 active:scale-[0.98] group cursor-pointer"
          >
            <RiBriefcaseLine className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-200">
              Nouvelle offre d'emploi
            </span>
          </button>
          <button
            onClick={() => window.open('https://stip.ca', '_blank')}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-primary/10 transition-all duration-200 active:scale-[0.98] group cursor-pointer"
          >
            <RiEyeLine className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-200">
              Voir le site
            </span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-card border border-border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Activité récente
        </h2>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <RiLoader4Line className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : activities.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucune activité</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
