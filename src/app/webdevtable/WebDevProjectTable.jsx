'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/web-dev-projects';

const statusConfig = {
  planning:    { bg: 'bg-slate-50 text-slate-600 border-slate-200',     dot: 'bg-slate-400' },
  in_progress: { bg: 'bg-blue-50 text-blue-700 border-blue-200',        dot: 'bg-blue-500' },
  review:      { bg: 'bg-amber-50 text-amber-700 border-amber-200',     dot: 'bg-amber-500' },
  completed:   { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  cancelled:   { bg: 'bg-red-50 text-red-600 border-red-200',           dot: 'bg-red-400' },
};

const statusLabel = {
  planning:    'Planning',
  in_progress: 'In Progress',
  review:      'Review',
  completed:   'Completed',
  cancelled:   'Cancelled',
};

const techBadge = {
  react:       'bg-sky-50 text-sky-700 border-sky-200',
  nextjs:      'bg-gray-900 text-white border-gray-700',
  vue:         'bg-green-50 text-green-700 border-green-200',
  angular:     'bg-red-50 text-red-700 border-red-200',
  html_css:    'bg-orange-50 text-orange-700 border-orange-200',
  nodejs:      'bg-lime-50 text-lime-700 border-lime-200',
  fullstack:   'bg-blue-50 text-blue-700 border-blue-200',
};

const techLabel = {
  react: 'React', nextjs: 'Next.js', vue: 'Vue', angular: 'Angular',
  html_css: 'HTML/CSS', nodejs: 'Node.js', fullstack: 'Full Stack',
};

const projectTypeLabel = {
  landing_page: 'Landing Page', ecommerce: 'E-Commerce', portfolio: 'Portfolio',
  web_app: 'Web App', cms: 'CMS', api_integration: 'API Integration',
};

const projectTypeIcon = {
  landing_page: '🖥️', ecommerce: '🛒', portfolio: '🎨',
  web_app: '⚙️', cms: '📝', api_integration: '🔗',
};

export default function WebDevProjectTable() {
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [filters, setFilters]     = useState({
    clientName: '', status: '', projectType: '', techStack: '',
  });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });
      const url = `${API_URL}${params.toString() ? `?${params}` : ''}`;
      const res = await axios.get(url);

      let data = [];
      if (Array.isArray(res.data))        data = res.data;
      else if (res.data?.data)            data = res.data.data;
      else if (res.data?.projects)        data = res.data.projects;

      setProjects(data);
      setError('');
    } catch (err) {
      setError('Unable to connect to server. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters  = () => fetchProjects();
  const resetFilters  = () => {
    setFilters({ clientName: '', status: '', projectType: '', techStack: '' });
    setTimeout(() => fetchProjects(), 100);
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = [
    { label: 'Total Projects',  value: projects.length,
      icon: '📁', light: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'In Progress',
      value: projects.filter(p => p.status === 'in_progress').length,
      icon: '⚡', light: 'bg-sky-50', text: 'text-sky-600' },
    { label: 'Completed',
      value: projects.filter(p => p.status === 'completed').length,
      icon: '✅', light: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Total Budget',
      value: `PKR ${projects.reduce((s, p) => s + (Number(p.projectBudget) || 0), 0).toLocaleString()}`,
      icon: '💰', light: 'bg-indigo-50', text: 'text-indigo-600' },
  ];

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm font-medium">Loading projects...</p>
      </div>
    </div>
  );

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-10 max-w-md text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Connection Error</h3>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <button onClick={fetchProjects} className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-sky-600 transition-all shadow-md">
          Try Again
        </button>
      </div>
    </div>
  );

  // ── Main ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        .fu  { animation: fadeUp .45s ease both; }
        .fu1 { animation-delay:.05s }
        .fu2 { animation-delay:.12s }
        .fu3 { animation-delay:.19s }
        .fu4 { animation-delay:.26s }
        tr.row-hover:hover td { background: #eff6ff; }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <div className="mb-8 fu fu1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-sky-400 rounded-2xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                Web Dev Projects
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">Manage clients, track tech stacks, and monitor project status</p>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 fu fu2">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 ${s.light} rounded-xl flex items-center justify-center text-xl`}>{s.icon}</div>
                <span className="text-2xl font-extrabold text-gray-800" style={{ fontFamily: "'Syne', sans-serif" }}>{s.value}</span>
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest ${s.text}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-6 fu fu3">
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            <span className="text-sm font-bold text-gray-700">Filters</span>
            <div className="flex-1 h-px bg-blue-50"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Client Name */}
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-widest mb-1.5">Client Name</label>
              <input type="text" name="clientName" value={filters.clientName} onChange={handleFilterChange}
                placeholder="Search client..."
                className="w-full px-3 py-2.5 border-2 border-blue-100 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all" />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-widest mb-1.5">Status</label>
              <select name="status" value={filters.status} onChange={handleFilterChange}
                className="w-full px-3 py-2.5 border-2 border-blue-100 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white">
                <option value="">All Status</option>
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-widest mb-1.5">Project Type</label>
              <select name="projectType" value={filters.projectType} onChange={handleFilterChange}
                className="w-full px-3 py-2.5 border-2 border-blue-100 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white">
                <option value="">All Types</option>
                <option value="landing_page">Landing Page</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="portfolio">Portfolio</option>
                <option value="web_app">Web App</option>
                <option value="cms">CMS</option>
                <option value="api_integration">API Integration</option>
              </select>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-widest mb-1.5">Tech Stack</label>
              <select name="techStack" value={filters.techStack} onChange={handleFilterChange}
                className="w-full px-3 py-2.5 border-2 border-blue-100 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white">
                <option value="">All Stacks</option>
                <option value="react">React.js</option>
                <option value="nextjs">Next.js</option>
                <option value="vue">Vue.js</option>
                <option value="angular">Angular</option>
                <option value="html_css">HTML / CSS</option>
                <option value="nodejs">Node.js</option>
                <option value="fullstack">Full Stack</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button onClick={resetFilters}
              className="px-4 py-2 text-sm text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-all">
              Reset
            </button>
            <button onClick={applyFilters}
              className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-sky-600 transition-all shadow-sm">
              Apply Filters
            </button>
            <button onClick={fetchProjects}
              className="px-4 py-2 text-sm border-2 border-blue-100 text-blue-600 rounded-xl hover:bg-blue-50 font-medium transition-all flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-16 text-center fu fu4">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold text-lg mb-1">No projects found</p>
            <p className="text-gray-400 text-sm">Submit a new project to see it here</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden fu fu4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-sky-500">
                    {['#', 'Client', 'Contact', 'Project Type', 'Tech Stack', 'Timeline', 'Budget', 'Features', 'Status', 'Repo / Live'].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-left text-xs font-bold text-white/90 uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50">
                  {projects.map((p, idx) => (
                    <tr key={p.id || idx} className="row-hover transition-colors">

                      {/* # */}
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-mono text-gray-400">#{String(p.id || idx + 1).slice(-4)}</span>
                      </td>

                      {/* Client */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 text-sm font-bold">{(p.clientName || '?')[0].toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{p.clientName || '-'}</div>
                            {p.email && <div className="text-xs text-gray-400">{p.email}</div>}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-3.5">
                        <span className="text-sm text-gray-600">{p.phone || '-'}</span>
                      </td>

                      {/* Project Type */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{projectTypeIcon[p.projectType] || '📁'}</span>
                          <span className="text-sm font-medium text-gray-700">{projectTypeLabel[p.projectType] || p.projectType || '-'}</span>
                        </div>
                      </td>

                      {/* Tech Stack */}
                      <td className="px-4 py-3.5">
                        {p.techStack ? (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${techBadge[p.techStack] || 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                            {techLabel[p.techStack] || p.techStack}
                          </span>
                        ) : <span className="text-gray-400 text-sm">—</span>}
                      </td>

                      {/* Timeline */}
                      <td className="px-4 py-3.5">
                        <div className="text-xs">
                          <div className="flex items-center gap-1 text-gray-600 mb-0.5">
                            <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span>{p.startDate ? new Date(p.startDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }) : '—'}</span>
                          </div>
                          {p.deadline && (
                            <div className="flex items-center gap-1 text-gray-400">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              <span>{new Date(p.deadline).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="px-4 py-3.5">
                        <span className="text-sm font-bold text-gray-800">
                          {p.projectBudget ? `PKR ${Number(p.projectBudget).toLocaleString()}` : '—'}
                        </span>
                      </td>

                      {/* Features */}
                      <td className="px-4 py-3.5">
                        <div className="flex gap-1.5 flex-wrap">
                          {p.isResponsive && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-md text-xs font-medium">
                              📱 Responsive
                            </span>
                          )}
                          {p.seoOptimized && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 text-sky-600 border border-sky-100 rounded-md text-xs font-medium">
                              🔍 SEO
                            </span>
                          )}
                          {!p.isResponsive && !p.seoOptimized && <span className="text-gray-400 text-sm">—</span>}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        {p.status ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig[p.status]?.bg || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[p.status]?.dot || 'bg-gray-400'}`}></span>
                            {statusLabel[p.status] || p.status}
                          </span>
                        ) : '—'}
                      </td>

                      {/* Repo / Live */}
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col gap-1">
                          {p.repositoryUrl && (
                            <a href={p.repositoryUrl} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                              Repo
                            </a>
                          )}
                          {p.liveUrl && (
                            <a href={p.liveUrl} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800 font-medium hover:underline">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                              Live
                            </a>
                          )}
                          {!p.repositoryUrl && !p.liveUrl && <span className="text-gray-400 text-sm">—</span>}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-sky-50 border-t border-blue-100 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Showing <span className="font-bold text-blue-600">{projects.length}</span> project{projects.length !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-gray-400">Last updated: {new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
