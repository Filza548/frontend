'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/personal-training';

const statusConfig = {
  scheduled:  { bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',   dot: 'bg-amber-500' },
  confirmed:  { bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',      dot: 'bg-blue-500' },
  completed:  { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-500' },
  cancelled:  { bg: 'bg-red-500/10 text-red-400 border-red-500/30',         dot: 'bg-red-500' },
  no_show:    { bg: 'bg-gray-500/10 text-gray-400 border-gray-500/30',      dot: 'bg-gray-500' },
};

const statusLabel = {
  scheduled: 'Scheduled', confirmed: 'Confirmed', completed: 'Completed',
  cancelled: 'Cancelled', no_show: 'No Show',
};

const modeConfig = {
  online:  { bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',     icon: '🌐' },
  offline: { bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30', icon: '🏋️' },
};

const goalIcon = {
  weight_loss: '🔥', muscle_gain: '💪', endurance: '🏃',
  flexibility: '🧘', general_fitness: '⚡', rehabilitation: '🩺',
};

const goalLabel = {
  weight_loss: 'Weight Loss', muscle_gain: 'Muscle Gain', endurance: 'Endurance',
  flexibility: 'Flexibility', general_fitness: 'General Fitness', rehabilitation: 'Rehab',
};

const pkgLabel = {
  single: 'Single', package_5: 'Pack ×5', package_10: 'Pack ×10', monthly: 'Monthly',
};

export default function PersonalTrainingTable() {
  const [sessions, setSessions]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [filters, setFilters]     = useState({
    clientName: '', trainerName: '', status: '',
    sessionMode: '', fitnessGoal: '', packageType: '',
    startDate: '', endDate: '',
  });

  useEffect(() => { fetchSessions(); }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });
      const res = await axios.get(`${API_URL}${params.toString() ? `?${params}` : ''}`);
      let data = [];
      if (Array.isArray(res.data))      data = res.data;
      else if (res.data?.data)          data = res.data.data;
      else if (res.data?.sessions)      data = res.data.sessions;
      setSessions(data);
      setError('');
    } catch {
      setError('Unable to connect to server. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ clientName: '', trainerName: '', status: '', sessionMode: '', fitnessGoal: '', packageType: '', startDate: '', endDate: '' });
    setTimeout(() => fetchSessions(), 100);
  };

  const stats = [
    { label: 'Total Sessions', value: sessions.length,
      icon: '📋', light: 'bg-orange-500/10', text: 'text-orange-400' },
    { label: 'Confirmed',
      value: sessions.filter(s => s.status === 'confirmed').length,
      icon: '⚡', light: 'bg-blue-500/10', text: 'text-blue-400' },
    { label: 'Completed',
      value: sessions.filter(s => s.status === 'completed').length,
      icon: '✅', light: 'bg-emerald-500/10', text: 'text-emerald-400' },
    { label: 'Total Revenue',
      value: `$${sessions.filter(s => s.status === 'completed').reduce((sum, s) => sum + (Number(s.totalAmount) || 0), 0).toLocaleString()}`,
      icon: '💰', light: 'bg-red-500/10', text: 'text-red-400' },
  ];

  const filterSelect = 'w-full px-3 py-2.5 bg-gray-900 border-2 border-gray-700 rounded-xl text-gray-300 text-sm focus:outline-none focus:border-orange-500 transition-all';

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-gray-800 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm font-medium">Loading sessions...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 max-w-md text-center">
        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
        </div>
        <h3 className="text-lg font-black text-white mb-2 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Connection Error</h3>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <button onClick={fetchSessions} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold uppercase hover:from-orange-600 hover:to-red-600 transition-all">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation-delay:.04s } .fu2 { animation-delay:.10s }
        .fu3 { animation-delay:.16s } .fu4 { animation-delay:.22s }
        tr.rh:hover td { background: rgba(249,115,22,0.04); }
        select option { background: #111827; }
        ::-webkit-scrollbar { height: 4px; } 
        ::-webkit-scrollbar-track { background: #111827; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }
      `}</style>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <div className="mb-8 fu fu1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-2xl">💪</span>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white uppercase leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Personal Training
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">Manage sessions, trainers, and client progress</p>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 fu fu2">
          {stats.map((s, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 ${s.light} rounded-xl flex items-center justify-center text-xl`}>{s.icon}</div>
                <span className="text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{s.value}</span>
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest ${s.text}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6 fu fu3">
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
            <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">Filters</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5">Client Name</label>
              <input type="text" name="clientName" value={filters.clientName} onChange={handleFilterChange} placeholder="Search client..." className={filterSelect} />
            </div>
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5">Trainer Name</label>
              <input type="text" name="trainerName" value={filters.trainerName} onChange={handleFilterChange} placeholder="Search trainer..." className={filterSelect} />
            </div>
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5">Status</label>
              <select name="status" value={filters.status} onChange={handleFilterChange} className={filterSelect}>
                <option value="">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5">Mode</label>
              <select name="sessionMode" value={filters.sessionMode} onChange={handleFilterChange} className={filterSelect}>
                <option value="">All Modes</option>
                <option value="online">🌐 Online</option>
                <option value="offline">🏋️ Offline</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5">Fitness Goal</label>
              <select name="fitnessGoal" value={filters.fitnessGoal} onChange={handleFilterChange} className={filterSelect}>
                <option value="">All Goals</option>
                <option value="weight_loss">🔥 Weight Loss</option>
                <option value="muscle_gain">💪 Muscle Gain</option>
                <option value="endurance">🏃 Endurance</option>
                <option value="flexibility">🧘 Flexibility</option>
                <option value="general_fitness">⚡ General Fitness</option>
                <option value="rehabilitation">🩺 Rehabilitation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5">Package</label>
              <select name="packageType" value={filters.packageType} onChange={handleFilterChange} className={filterSelect}>
                <option value="">All Packages</option>
                <option value="single">Single</option>
                <option value="package_5">Pack ×5</option>
                <option value="package_10">Pack ×10</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5">From Date</label>
              <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className={filterSelect} />
            </div>
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5">To Date</label>
              <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className={filterSelect} />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button onClick={resetFilters} className="px-4 py-2 text-sm text-gray-400 border-2 border-gray-700 rounded-xl hover:bg-gray-800 font-semibold transition-all">Reset</button>
            <button onClick={fetchSessions} className="px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold uppercase tracking-wide hover:from-orange-600 hover:to-red-600 transition-all shadow-md shadow-orange-500/20">Apply Filters</button>
            <button onClick={fetchSessions} className="px-4 py-2 text-sm border-2 border-gray-700 text-gray-400 rounded-xl hover:bg-gray-800 font-semibold transition-all flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Refresh
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        {sessions.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-16 text-center fu fu4">
            <div className="w-20 h-20 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-4xl">💪</div>
            <p className="text-gray-300 font-bold text-lg uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>No Sessions Found</p>
            <p className="text-gray-600 text-sm mt-1">Book a new training session to see it here</p>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden fu fu4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-500 to-red-500">
                    {['#','Client','Contact','Trainer','Goal','Mode','Package','Schedule','Duration','Features','Amount','Status'].map(h => (
                      <th key={h} className="px-4 py-3.5 text-left text-xs font-black text-white/90 uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {sessions.map((s, idx) => (
                    <tr key={s.id || idx} className="rh transition-colors">

                      {/* # */}
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-mono text-gray-600">#{String(s.id || idx+1).slice(-4)}</span>
                      </td>

                      {/* Client */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-400 text-sm font-black">{(s.clientName||'?')[0].toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-200">{s.clientName||'-'}</div>
                            {s.email && <div className="text-xs text-gray-600">{s.email}</div>}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-3.5">
                        <span className="text-sm text-gray-400">{s.phone||'-'}</span>
                      </td>

                      {/* Trainer */}
                      <td className="px-4 py-3.5">
                        <div className="text-sm font-semibold text-gray-200">{s.trainerName||'-'}</div>
                        {s.trainerSpecialization && <div className="text-xs text-gray-600">{s.trainerSpecialization}</div>}
                      </td>

                      {/* Goal */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span>{goalIcon[s.fitnessGoal]||'⚡'}</span>
                          <span className="text-sm text-gray-300">{goalLabel[s.fitnessGoal]||s.fitnessGoal||'-'}</span>
                        </div>
                      </td>

                      {/* Mode */}
                      <td className="px-4 py-3.5">
                        {s.sessionMode ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold ${modeConfig[s.sessionMode]?.bg||'bg-gray-800 text-gray-400 border-gray-700'}`}>
                            {modeConfig[s.sessionMode]?.icon} {s.sessionMode}
                          </span>
                        ) : '—'}
                      </td>

                      {/* Package */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-800 border border-gray-700 text-xs font-bold text-gray-300">
                          {pkgLabel[s.packageType]||s.packageType||'—'}
                        </span>
                      </td>

                      {/* Schedule */}
                      <td className="px-4 py-3.5">
                        <div className="text-sm text-gray-300">
                          {s.sessionDate ? new Date(s.sessionDate).toLocaleDateString('en-PK',{day:'numeric',month:'short'}) : '—'}
                        </div>
                        <div className="text-xs text-gray-600">{s.sessionTime?.slice(0,5)||''}</div>
                      </td>

                      {/* Duration */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-800 text-xs text-gray-400">
                          ⏱️ {s.durationMinutes||60}m
                        </span>
                      </td>

                      {/* Features */}
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col gap-1">
                          {s.customWorkout    && <span className="text-xs text-orange-400 font-medium">🏋️ Workout</span>}
                          {s.nutritionAdvice  && <span className="text-xs text-green-400 font-medium">🥗 Nutrition</span>}
                          {s.progressTracking && <span className="text-xs text-blue-400 font-medium">📊 Tracking</span>}
                          {!s.customWorkout && !s.nutritionAdvice && !s.progressTracking && <span className="text-gray-700 text-sm">—</span>}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-3.5">
                        <div className="text-sm font-black text-white">{s.totalAmount ? `$${Number(s.totalAmount).toLocaleString()}` : '—'}</div>
                        {s.pricePerSession && <div className="text-xs text-gray-600">${Number(s.pricePerSession)}/session</div>}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        {s.status ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${statusConfig[s.status]?.bg||'bg-gray-800 text-gray-400 border-gray-700'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[s.status]?.dot||'bg-gray-500'}`}></span>
                            {statusLabel[s.status]||s.status}
                          </span>
                        ) : '—'}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-900 border-t border-gray-800 flex justify-between items-center">
              <div className="text-xs text-gray-600">
                Showing <span className="font-black text-orange-400">{sessions.length}</span> session{sessions.length !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-gray-700">Last updated: {new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}