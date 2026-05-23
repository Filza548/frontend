"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/business-consultations`);

const STATUS_STYLES = {
  pending:      { bg: "#1C1400", text: "#FCD34D", dot: "#F59E0B", border: "#78350F" },
  scheduled:    { bg: "#0A0F2E", text: "#A5B4FC", dot: "#6366F1", border: "#3730A3" },
  "in-progress":{ bg: "#002218", text: "#6EE7B7", dot: "#10B981", border: "#065F46" },
  completed:    { bg: "#00200F", text: "#4ADE80", dot: "#22C55E", border: "#14532D" },
  cancelled:    { bg: "#1C0A0A", text: "#F87171", dot: "#EF4444", border: "#7F1D1D" },
};

const TYPE_COLORS = [
  "#10B981","#6366F1","#F59E0B","#3B82F6",
  "#EC4899","#14B8A6","#F97316","#8B5CF6",
];

export default function BusinessConsultationComponent() {
  const router = useRouter();
  const [consultations, setConsultations]   = useState([]);
  const [loading, setLoading]               = useState(false);
  const [errorMsg, setErrorMsg]             = useState("");
  const [deletingId, setDeletingId]         = useState(null);
  const [searchTerm, setSearchTerm]         = useState("");
  const [filterStatus, setFilterStatus]     = useState("all");
  const [filterType, setFilterType]         = useState("all");

  /* ── GET ALL ── */
  const fetchConsultations = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res  = await fetch(API_URL);
      const json = await res.json();
      setConsultations(json.data || []);
    } catch {
      setErrorMsg("Data load nahi hua. Backend check karein.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchConsultations(); }, []);

  /* ── DELETE ── */
  const handleDelete = async (id) => {
    if (!confirm("Kya aap sure hain is record ko delete karna chahte hain?")) return;
    setDeletingId(id);
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setConsultations((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setErrorMsg("Delete nahi hua. Dobara koshish karein.");
    } finally {
      setDeletingId(null);
    }
  };

  /* ── COLOR MAP FOR TYPES ── */
  const allTypes   = [...new Set(consultations.map((c) => c.consultationType))];
  const typeColors = {};
  allTypes.forEach((t, i) => { typeColors[t] = TYPE_COLORS[i % TYPE_COLORS.length]; });

  /* ── FILTER ── */
  const filtered = consultations.filter((c) => {
    const s =
      c.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.consultationType?.toLowerCase().includes(searchTerm.toLowerCase());
    const st = filterStatus === "all" || c.status === filterStatus;
    const tp = filterType   === "all" || c.consultationType === filterType;
    return s && st && tp;
  });

  /* ── STATS ── */
  const stats = [
    { label: "Tamam",       value: consultations.length,                               icon: "📂", color: "#6EE7B7" },
    { label: "Pending",     value: consultations.filter(c=>c.status==="pending").length,    icon: "⏳", color: "#FCD34D" },
    { label: "Scheduled",   value: consultations.filter(c=>c.status==="scheduled").length,  icon: "📅", color: "#A5B4FC" },
    { label: "In Progress", value: consultations.filter(c=>c.status==="in-progress").length,icon: "🔄", color: "#6EE7B7" },
    { label: "Completed",   value: consultations.filter(c=>c.status==="completed").length,  icon: "✅", color: "#4ADE80" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.container}>

        {/* ── HEADER ── */}
        <div style={styles.header}>
          <div>
            <div style={styles.badge}>💼 Business Consultation System</div>
            <h1 style={styles.title}>Consultations Ki List</h1>
            <p style={styles.subtitle}>
              Tamam business consultations yahan dekhein aur manage karein
            </p>
          </div>
          <button
            style={styles.addBtn}
            onClick={() => router.push("/business-consultations")}
          >
            + Naya Record
          </button>
        </div>

        {/* ── STATS ── */}
        <div style={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statIcon}>{s.icon}</div>
              <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── ERROR ── */}
        {errorMsg && <div style={styles.errorAlert}>{errorMsg}</div>}

        {/* ── FILTERS ── */}
        <div style={styles.filterBar}>
          <input
            style={styles.searchInput}
            placeholder="🔍  Business naam, owner, email ya consultation type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            style={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Sab Status</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            style={styles.filterSelect}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Sab Types</option>
            {allTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button style={styles.refreshBtn} onClick={fetchConsultations}>
            🔄
          </button>
        </div>

        {/* ── TABLE CARD ── */}
        <div style={styles.tableCard}>
          {loading ? (
            <div style={styles.centerBox}>
              <div style={styles.spinner} />
              <p style={{ color: "#065F46", marginTop: "16px", fontSize: "15px" }}>
                Data load ho raha hai...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={styles.centerBox}>
              <div style={{ fontSize: "56px" }}>📭</div>
              <p style={{ color: "#374151", marginTop: "12px", fontSize: "16px" }}>
                {searchTerm || filterStatus !== "all" || filterType !== "all"
                  ? "Koi record nahi mila"
                  : "Abhi koi consultation nahi hai"}
              </p>
              {(searchTerm || filterStatus !== "all" || filterType !== "all") && (
                <button
                  style={styles.clearBtn}
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setFilterType("all");
                  }}
                >
                  Filter Hatao
                </button>
              )}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {[
                      "#","Business","Owner","Phone",
                      "Type","Status","Budget","Meeting","Action",
                    ].map((h) => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => {
                    const sc = STATUS_STYLES[c.status] || STATUS_STYLES.pending;
                    const tc = typeColors[c.consultationType] || "#10B981";
                    return (
                      <tr
                        key={c.id}
                        style={{
                          ...styles.tr,
                          backgroundColor: i % 2 === 0 ? "#0A0F1E" : "#0D1422",
                        }}
                      >
                        {/* ID */}
                        <td style={styles.td}>
                          <span style={styles.idBadge}>{c.id}</span>
                        </td>

                        {/* Business */}
                        <td style={styles.td}>
                          <div style={styles.bizName}>{c.businessName}</div>
                          <div style={styles.bizEmail}>{c.email}</div>
                        </td>

                        {/* Owner */}
                        <td style={styles.td}>
                          <span style={styles.ownerName}>{c.ownerName}</span>
                        </td>

                        {/* Phone */}
                        <td style={styles.td}>
                          <span style={styles.phone}>{c.phone}</span>
                        </td>

                        {/* Type */}
                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.typeTag,
                              backgroundColor: tc + "18",
                              color: tc,
                              border: `1px solid ${tc}33`,
                            }}
                          >
                            {c.consultationType}
                          </span>
                        </td>

                        {/* Status */}
                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.statusBadge,
                              backgroundColor: sc.bg,
                              color: sc.text,
                              border: `1px solid ${sc.border}`,
                            }}
                          >
                            <span
                              style={{
                                ...styles.dot,
                                backgroundColor: sc.dot,
                              }}
                            />
                            {c.status}
                          </span>
                        </td>

                        {/* Budget */}
                        <td style={styles.td}>
                          <span style={styles.budget}>
                            {c.budget
                              ? `PKR ${Number(c.budget).toLocaleString()}`
                              : "—"}
                          </span>
                        </td>

                        {/* Meeting Date */}
                        <td style={styles.td}>
                          <span style={styles.date}>
                            {c.meetingDate
                              ? new Date(c.meetingDate).toLocaleDateString(
                                  "en-PK",
                                  { day: "2-digit", month: "short", year: "numeric" }
                                )
                              : "—"}
                          </span>
                        </td>

                        {/* Delete */}
                        <td style={styles.td}>
                          <button
                            style={styles.deleteBtn}
                            onClick={() => handleDelete(c.id)}
                            disabled={deletingId === c.id}
                          >
                            {deletingId === c.id ? "⏳" : "🗑️ Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* TABLE FOOTER */}
              <div style={styles.tableFooter}>
                Kul{" "}
                <strong style={{ color: "#10B981" }}>{filtered.length}</strong>{" "}
                records
                {(searchTerm || filterStatus !== "all" || filterType !== "all") &&
                  " (filter lagaya hua hai)"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh", backgroundColor: "#060C18",
    padding: "36px 24px",
    fontFamily: "'Segoe UI', sans-serif",
    position: "relative", overflow: "hidden",
  },
  blob1: {
    position: "fixed", top: "-160px", right: "-160px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(16,185,129,0.1), transparent)",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed", bottom: "-160px", left: "-160px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(245,158,11,0.08), transparent)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: "1280px", margin: "0 auto",
    position: "relative", zIndex: 1,
  },

  /* Header */
  header: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", marginBottom: "32px",
    flexWrap: "wrap", gap: "16px",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#064E3B", color: "#6EE7B7",
    fontSize: "12px", fontWeight: "700",
    padding: "4px 14px", borderRadius: "20px",
    marginBottom: "10px", letterSpacing: "0.5px",
  },
  title: {
    fontSize: "34px", fontWeight: "800",
    color: "#ECFDF5", margin: "0 0 6px 0",
  },
  subtitle: { color: "#065F46", fontSize: "15px", margin: 0 },
  addBtn: {
    background: "linear-gradient(135deg, #065F46, #10B981)",
    color: "#fff", border: "none",
    borderRadius: "12px", padding: "13px 24px",
    fontSize: "15px", fontWeight: "700", cursor: "pointer",
    boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
  },

  /* Stats */
  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(5,1fr)",
    gap: "14px", marginBottom: "28px",
  },
  statCard: {
    backgroundColor: "#0A0F1E",
    border: "1px solid #1F2937",
    borderRadius: "14px", padding: "18px 14px",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  },
  statIcon: { fontSize: "24px", marginBottom: "8px" },
  statValue: { fontSize: "30px", fontWeight: "800", lineHeight: 1 },
  statLabel: {
    color: "#374151", fontSize: "11px",
    fontWeight: "600", marginTop: "6px",
    textTransform: "uppercase", letterSpacing: "0.5px",
  },

  /* Error */
  errorAlert: {
    backgroundColor: "#1C0A0A", border: "1px solid #DC2626",
    borderRadius: "12px", padding: "14px 18px",
    color: "#F87171", marginBottom: "20px", fontWeight: "600",
  },

  /* Filter bar */
  filterBar: {
    display: "flex", gap: "12px",
    marginBottom: "20px", flexWrap: "wrap",
  },
  searchInput: {
    flex: 1, minWidth: "260px",
    backgroundColor: "#0A0F1E",
    border: "1.5px solid #1F2937",
    borderRadius: "10px", padding: "11px 16px",
    fontSize: "14px", color: "#E5F9F0", outline: "none",
  },
  filterSelect: {
    backgroundColor: "#0A0F1E",
    border: "1.5px solid #1F2937",
    borderRadius: "10px", padding: "11px 14px",
    fontSize: "14px", color: "#6EE7B7",
    outline: "none", cursor: "pointer",
  },
  refreshBtn: {
    backgroundColor: "#064E3B", color: "#6EE7B7",
    border: "1.5px solid #065F46", borderRadius: "10px",
    padding: "11px 16px", fontSize: "16px",
    cursor: "pointer", fontWeight: "700",
  },

  /* Table card */
  tableCard: {
    backgroundColor: "#080E1C",
    border: "1px solid #1F2937",
    borderRadius: "18px", overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    backgroundColor: "#040A14",
    padding: "14px 16px", textAlign: "left",
    fontSize: "11px", fontWeight: "700",
    color: "#065F46", textTransform: "uppercase",
    letterSpacing: "0.8px",
    borderBottom: "1px solid #1F2937",
  },
  tr: { borderBottom: "1px solid #0D1422" },
  td: {
    padding: "14px 16px", fontSize: "14px",
    color: "#D1FAE5", verticalAlign: "middle",
  },

  /* Cell styles */
  idBadge: {
    backgroundColor: "#064E3B", color: "#6EE7B7",
    borderRadius: "6px", padding: "3px 9px",
    fontWeight: "800", fontSize: "12px",
  },
  bizName: { fontWeight: "700", color: "#ECFDF5", fontSize: "14px" },
  bizEmail: { color: "#374151", fontSize: "12px", marginTop: "3px" },
  ownerName: { color: "#A7F3D0", fontWeight: "600" },
  phone: {
    color: "#6EE7B7", fontFamily: "monospace", fontSize: "13px",
  },
  typeTag: {
    borderRadius: "6px", padding: "4px 11px",
    fontSize: "12px", fontWeight: "700",
  },
  statusBadge: {
    display: "inline-flex", alignItems: "center",
    gap: "7px", borderRadius: "20px",
    padding: "5px 12px", fontSize: "12px", fontWeight: "700",
  },
  dot: {
    width: "7px", height: "7px",
    borderRadius: "50%", display: "inline-block",
  },
  budget: { color: "#4ADE80", fontWeight: "700", fontSize: "14px" },
  date: { color: "#374151", fontSize: "13px", whiteSpace: "nowrap" },
  deleteBtn: {
    backgroundColor: "#1C0A0A", color: "#F87171",
    border: "1px solid #7F1D1D",
    borderRadius: "8px", padding: "7px 13px",
    fontSize: "13px", fontWeight: "600", cursor: "pointer",
  },

  /* Table footer */
  tableFooter: {
    padding: "14px 20px",
    borderTop: "1px solid #1F2937",
    color: "#374151", fontSize: "13px", textAlign: "right",
  },

  /* Empty / loading */
  centerBox: {
    display: "flex", flexDirection: "column",
    alignItems: "center", padding: "72px 20px",
  },
  spinner: {
    width: "40px", height: "40px",
    border: "3px solid #1F2937",
    borderTop: "3px solid #10B981",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  clearBtn: {
    backgroundColor: "#064E3B", color: "#6EE7B7",
    border: "none", borderRadius: "8px",
    padding: "9px 18px", fontSize: "13px",
    fontWeight: "600", cursor: "pointer", marginTop: "12px",
  },
};
