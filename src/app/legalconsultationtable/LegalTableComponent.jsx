"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/legal-consultations`);

const STATUS_COLORS = {
  pending:     { bg: "#2A1F00", text: "#FCD34D", dot: "#F59E0B", border: "#78350F" },
  "in-progress": { bg: "#001A3A", text: "#60A5FA", dot: "#3B82F6", border: "#1E3A8A" },
  completed:   { bg: "#00200F", text: "#4ADE80", dot: "#22C55E", border: "#14532D" },
  cancelled:   { bg: "#2A0A0A", text: "#F87171", dot: "#EF4444", border: "#7F1D1D" },
};

const CASE_TYPE_COLORS = [
  "#1D4ED8", "#7C3AED", "#0E7490", "#065F46", "#92400E", "#9D174D", "#1E3A5F", "#374151"
];

export default function LegalTableComponent() {
  const router = useRouter();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchConsultations = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setConsultations(json.data || []);
    } catch {
      setErrorMsg("Data load nahi hua. Backend check karein.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

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

  const filtered = consultations.filter((c) => {
    const matchSearch =
      c.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: consultations.length,
    pending: consultations.filter((c) => c.status === "pending").length,
    inProgress: consultations.filter((c) => c.status === "in-progress").length,
    completed: consultations.filter((c) => c.status === "completed").length,
  };

  const caseColorMap = {};
  const allCaseTypes = [...new Set(consultations.map((c) => c.caseType))];
  allCaseTypes.forEach((ct, i) => {
    caseColorMap[ct] = CASE_TYPE_COLORS[i % CASE_TYPE_COLORS.length];
  });

  return (
    <div style={styles.page}>
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <div style={styles.badge}>⚖️ Legal Management System</div>
            <h1 style={styles.title}>Consultations Ki List</h1>
            <p style={styles.subtitle}>Tamam client consultations yahan dekhein aur manage karein</p>
          </div>
          <button style={styles.addBtn} onClick={() => router.push("/legal-consultations")}>
            + Naya Client
          </button>
        </div>

        {/* STATS CARDS */}
        <div style={styles.statsGrid}>
          {[
            { label: "Tamam Records", value: stats.total, color: "#3B82F6", icon: "📂" },
            { label: "Pending", value: stats.pending, color: "#F59E0B", icon: "⏳" },
            { label: "In Progress", value: stats.inProgress, color: "#60A5FA", icon: "🔄" },
            { label: "Completed", value: stats.completed, color: "#4ADE80", icon: "✅" },
          ].map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statIcon}>{s.icon}</div>
              <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ERROR */}
        {errorMsg && <div style={styles.errorAlert}>{errorMsg}</div>}

        {/* FILTERS */}
        <div style={styles.filterBar}>
          <input
            style={styles.searchInput}
            placeholder="🔍  Client naam, email ya case type likhein..."
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
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button style={styles.refreshBtn} onClick={fetchConsultations}>🔄</button>
        </div>

        {/* TABLE CARD */}
        <div style={styles.tableCard}>
          {loading ? (
            <div style={styles.centerBox}>
              <div style={styles.spinner} />
              <p style={{ color: "#4A6FA5", marginTop: "16px", fontSize: "15px" }}>Data load ho raha hai...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={styles.centerBox}>
              <div style={{ fontSize: "56px" }}>📭</div>
              <p style={{ color: "#4A6FA5", marginTop: "12px", fontSize: "16px" }}>
                {searchTerm || filterStatus !== "all" ? "Koi record nahi mila" : "Abhi koi consultation nahi hai"}
              </p>
              {(searchTerm || filterStatus !== "all") && (
                <button style={styles.clearBtn} onClick={() => { setSearchTerm(""); setFilterStatus("all"); }}>
                  Filter Hatao
                </button>
              )}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["#", "Client", "Phone", "Case Type", "Status", "Fees", "Tarikh", "Action"].map((h) => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => {
                    const sc = STATUS_COLORS[c.status] || STATUS_COLORS.pending;
                    const cc = caseColorMap[c.caseType] || "#1E3A5F";
                    return (
                      <tr
                        key={c.id}
                        style={{
                          ...styles.tr,
                          backgroundColor: i % 2 === 0 ? "#0D1B2A" : "#101F30",
                        }}
                      >
                        <td style={styles.td}>
                          <span style={styles.idBadge}>{c.id}</span>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.clientName}>{c.clientName}</div>
                          <div style={styles.clientEmail}>{c.clientEmail}</div>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.phone}>{c.clientPhone}</span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ ...styles.caseTag, backgroundColor: cc + "22", color: cc, border: `1px solid ${cc}44` }}>
                            {c.caseType}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: sc.bg,
                            color: sc.text,
                            border: `1px solid ${sc.border}`,
                          }}>
                            <span style={{ ...styles.dot, backgroundColor: sc.dot }} />
                            {c.status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.fee}>
                            {c.fee ? `PKR ${Number(c.fee).toLocaleString()}` : "—"}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.date}>
                            {c.consultationDate
                              ? new Date(c.consultationDate).toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" })
                              : "—"}
                          </span>
                        </td>
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

              {/* FOOTER ROW */}
              <div style={styles.tableFooter}>
                Kul <strong style={{ color: "#60A5FA" }}>{filtered.length}</strong> records mil rahe hain
                {(searchTerm || filterStatus !== "all") && ` (filter lagaya hua hai)`}
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
    minHeight: "100vh", backgroundColor: "#060D16",
    padding: "36px 24px", fontFamily: "'Segoe UI', sans-serif",
    position: "relative", overflow: "hidden",
  },
  bgCircle1: {
    position: "fixed", top: "-150px", right: "-150px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(29,78,216,0.15), transparent)",
    pointerEvents: "none",
  },
  bgCircle2: {
    position: "fixed", bottom: "-150px", left: "-150px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(14,116,144,0.1), transparent)",
    pointerEvents: "none",
  },
  container: { maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 },

  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" },
  badge: { display: "inline-block", backgroundColor: "#1E3A5F", color: "#93C5FD", fontSize: "12px", fontWeight: "700", padding: "4px 14px", borderRadius: "20px", marginBottom: "10px", letterSpacing: "0.5px" },
  title: { fontSize: "34px", fontWeight: "800", color: "#E0EEFF", margin: "0 0 6px 0" },
  subtitle: { color: "#4A6FA5", fontSize: "15px", margin: 0 },
  addBtn: {
    backgroundColor: "#1D4ED8", color: "#fff", border: "none",
    borderRadius: "12px", padding: "13px 24px", fontSize: "15px",
    fontWeight: "700", cursor: "pointer",
    boxShadow: "0 4px 16px rgba(29,78,216,0.35)",
  },

  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" },
  statCard: {
    backgroundColor: "#0D1B2A", border: "1px solid #1E3A5F",
    borderRadius: "14px", padding: "20px 16px", textAlign: "center",
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  },
  statIcon: { fontSize: "26px", marginBottom: "8px" },
  statValue: { fontSize: "32px", fontWeight: "800", lineHeight: 1 },
  statLabel: { color: "#4A6FA5", fontSize: "12px", fontWeight: "600", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.5px" },

  errorAlert: {
    backgroundColor: "#2A0A0A", border: "1px solid #DC2626",
    borderRadius: "12px", padding: "14px 18px",
    color: "#F87171", marginBottom: "20px", fontWeight: "600",
  },

  filterBar: { display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" },
  searchInput: {
    flex: 1, minWidth: "240px",
    backgroundColor: "#0D1B2A", border: "1.5px solid #1E3A5F",
    borderRadius: "10px", padding: "11px 16px",
    fontSize: "14px", color: "#E0EEFF", outline: "none",
  },
  filterSelect: {
    backgroundColor: "#0D1B2A", border: "1.5px solid #1E3A5F",
    borderRadius: "10px", padding: "11px 16px",
    fontSize: "14px", color: "#93C5FD", outline: "none", cursor: "pointer",
  },
  refreshBtn: {
    backgroundColor: "#1E3A5F", color: "#93C5FD",
    border: "1.5px solid #2563EB", borderRadius: "10px",
    padding: "11px 16px", fontSize: "16px", cursor: "pointer", fontWeight: "700",
  },

  tableCard: {
    backgroundColor: "#0A1628", border: "1px solid #1E3A5F",
    borderRadius: "18px", overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    backgroundColor: "#071020", padding: "14px 16px",
    textAlign: "left", fontSize: "11px", fontWeight: "700",
    color: "#4A6FA5", textTransform: "uppercase", letterSpacing: "0.8px",
    borderBottom: "1px solid #1E3A5F",
  },
  tr: { borderBottom: "1px solid #0F1E30", transition: "background 0.15s" },
  td: { padding: "14px 16px", fontSize: "14px", color: "#CBD5E1", verticalAlign: "middle" },

  idBadge: { backgroundColor: "#1E3A5F", color: "#93C5FD", borderRadius: "6px", padding: "3px 9px", fontWeight: "800", fontSize: "12px" },
  clientName: { fontWeight: "700", color: "#E0EEFF", fontSize: "14px" },
  clientEmail: { color: "#4A6FA5", fontSize: "12px", marginTop: "3px" },
  phone: { color: "#7B9DC0", fontFamily: "monospace", fontSize: "13px" },
  caseTag: { borderRadius: "6px", padding: "4px 11px", fontSize: "12px", fontWeight: "700" },
  statusBadge: { display: "inline-flex", alignItems: "center", gap: "7px", borderRadius: "20px", padding: "5px 12px", fontSize: "12px", fontWeight: "700" },
  dot: { width: "7px", height: "7px", borderRadius: "50%", display: "inline-block" },
  fee: { color: "#4ADE80", fontWeight: "700", fontSize: "14px" },
  date: { color: "#7B9DC0", fontSize: "13px", whiteSpace: "nowrap" },
  deleteBtn: {
    backgroundColor: "#2A0A0A", color: "#F87171",
    border: "1px solid #7F1D1D", borderRadius: "8px",
    padding: "7px 13px", fontSize: "13px", fontWeight: "600", cursor: "pointer",
  },
  tableFooter: {
    padding: "14px 20px", borderTop: "1px solid #1E3A5F",
    color: "#4A6FA5", fontSize: "13px", textAlign: "right",
  },
  centerBox: { display: "flex", flexDirection: "column", alignItems: "center", padding: "72px 20px" },
  spinner: {
    width: "40px", height: "40px",
    border: "3px solid #1E3A5F", borderTop: "3px solid #3B82F6",
    borderRadius: "50%", animation: "spin 0.8s linear infinite",
  },
  clearBtn: {
    backgroundColor: "#1E3A5F", color: "#93C5FD",
    border: "none", borderRadius: "8px", padding: "9px 18px",
    fontSize: "13px", fontWeight: "600", cursor: "pointer", marginTop: "12px",
  },
};
