"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/business-consultations`);

const CONSULTATION_TYPES = [
  "Startup",
  "Growth",
  "Marketing",
  "Finance",
  "Operations",
  "HR & Recruitment",
  "Technology",
  "Export & Import",
  "Other",
];

const STATUS_TYPES = [
  "pending",
  "scheduled",
  "in-progress",
  "completed",
  "cancelled",
];

export default function BusinessConsultationComponent() {
  const router = useRouter();

  const emptyForm = {
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    consultationType: "",
    businessProblem: "",
    status: "pending",
    meetingDate: "",
    budget: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [formLoading, setFormLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const payload = {
        ...form,
        budget: form.budget ? parseFloat(form.budget) : undefined,
      };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
      setSuccessMsg("Business Consultation has been successfully submitted!");
      setForm(emptyForm);
    } catch {
      setErrorMsg("Not submitted.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <span style={{ fontSize: "36px" }}>💼</span>
          </div>
          <h1 style={styles.title}>Business Consultation</h1>
          <p style={styles.subtitle}>
            Submit your business issue — our expert team will get in touch with you.
          </p>
        </div>

        {/* ALERTS */}
        {successMsg && (
          <div style={styles.successAlert}>
            <span style={{ fontSize: "22px" }}>✅</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "15px" }}>Thank You!</div>
              <div style={{ fontSize: "13px", marginTop: "2px", opacity: 0.85 }}>
                {successMsg}
              </div>
            </div>

          </div>
        )}
        {errorMsg && (
          <div style={styles.errorAlert}>
            <span style={{ fontSize: "20px" }}>❌</span>
            <span style={{ fontWeight: 600 }}>{errorMsg}</span>
          </div>
        )}

        {/* FORM CARD */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            {/* ── SECTION 1 ── */}
            <div style={styles.sectionHead}>
              <span style={styles.sectionNum}>01</span>
              <span style={styles.sectionText}>Business Ki Maloomat</span>
            </div>

            <div style={styles.grid2}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Business Name <span style={styles.req}>*</span>
                </label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>🏢</span>
                  <input
                    style={styles.input}
                    name="businessName"
                    placeholder="Ali Traders"
                    value={form.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>
                  Owner's Name <span style={styles.req}>*</span>
                </label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>👤</span>
                  <input
                    style={styles.input}
                    name="ownerName"
                    placeholder="Ahmed Ali"
                    value={form.ownerName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={styles.grid2}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Phone Number <span style={styles.req}>*</span>
                </label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>📞</span>
                  <input
                    style={styles.input}
                    name="phone"
                    placeholder="+92 300 1234567"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>
                  Email Address <span style={styles.req}>*</span>
                </label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>✉️</span>
                  <input
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder="business@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={styles.divider} />

            {/* ── SECTION 2 ── */}
            <div style={styles.sectionHead}>
              <span style={styles.sectionNum}>02</span>
              <span style={styles.sectionText}>Consultation Details</span>
            </div>

            <div style={styles.grid2}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Type of Consultation <span style={styles.req}>*</span>
                </label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>📊</span>
                  <select
                    style={styles.input}
                    name="consultationType"
                    value={form.consultationType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" style={{ color: 'black', backgroundColor: 'white' }}>-- Select Type --</option>
                    {CONSULTATION_TYPES.map((t) => (
                      <option key={t} value={t} style={{ color: 'black', backgroundColor: 'white' }}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Status</label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>🔖</span>
                  <select
                    style={styles.input}
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    {STATUS_TYPES.map((s) => (
                      <option key={s} value={s} style={{ color: 'black', backgroundColor: 'white' }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Business Problem <span style={styles.req}>*</span>
              </label>
              <textarea
                style={styles.textarea}
                name="businessProblem"
                placeholder="Write your business issue or goal with details.."
                value={form.businessProblem}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.divider} />

            {/* ── SECTION 3 ── */}
            <div style={styles.sectionHead}>
              <span style={styles.sectionNum}>03</span>
              <span style={styles.sectionText}>Meeting and Budget</span>
            </div>

            <div style={styles.grid2}>
              <div style={styles.field}>
                <label style={styles.label}>Date of Meeting</label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>📅</span>
                  <input
                    style={styles.input}
                    type="date"
                    name="meetingDate"
                    value={form.meetingDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Budget (PKR)</label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>💰</span>
                  <input
                    style={styles.input}
                    type="number"
                    name="budget"
                    placeholder="50000"
                    value={form.budget}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div style={styles.btnRow}>
              <button
                type="button"
                style={styles.resetBtn}
                onClick={() => setForm(emptyForm)}
              >
                🔄 Reset
              </button>

              <button
                type="submit"
                style={styles.submitBtn}
                disabled={formLoading}
              >
                {formLoading ? "⏳ Is being submitted..." : "✅ Submit"}
              </button>
            </div>
          </form>
        </div>

        <p style={styles.footer}>
          © 2024 Business Consultation System · Sab huqooq mahfooz hain
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0A0F1E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 16px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Segoe UI', sans-serif",
  },
  blob1: {
    position: "fixed", top: "-160px", right: "-160px",
    width: "480px", height: "480px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent)",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed", bottom: "-160px", left: "-160px",
    width: "480px", height: "480px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(245,158,11,0.1), transparent)",
    pointerEvents: "none",
  },
  blob3: {
    position: "fixed", top: "40%", left: "50%",
    width: "300px", height: "300px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.06), transparent)",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
  },
  container: {
    width: "100%", maxWidth: "700px",
    position: "relative", zIndex: 1,
  },
  header: { textAlign: "center", marginBottom: "36px" },
  iconWrap: {
    width: "76px", height: "76px", borderRadius: "22px",
    background: "linear-gradient(135deg, #065F46, #10B981)",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 18px auto",
    boxShadow: "0 8px 28px rgba(16,185,129,0.35)",
  },
  title: {
    fontSize: "32px", fontWeight: "800",
    color: "#F0FDF4", margin: "0 0 10px 0",
  },
  subtitle: {
    color: "#6EE7B7", fontSize: "15px",
    lineHeight: 1.65, margin: 0,
  },
  successAlert: {
    backgroundColor: "#052E16",
    border: "1px solid #16A34A",
    borderRadius: "14px", padding: "16px 20px",
    display: "flex", alignItems: "center", gap: "14px",
    marginBottom: "22px", color: "#4ADE80",
  },
  errorAlert: {
    backgroundColor: "#1C0A0A",
    border: "1px solid #DC2626",
    borderRadius: "14px", padding: "16px 20px",
    display: "flex", alignItems: "center", gap: "12px",
    marginBottom: "22px", color: "#F87171",
  },
  goListBtn: {
    backgroundColor: "#16A34A", color: "#fff",
    border: "none", borderRadius: "8px",
    padding: "8px 14px", fontSize: "13px",
    fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap",
  },
  card: {
    backgroundColor: "#111827",
    border: "1px solid #1F2937",
    borderRadius: "22px", padding: "38px",
    boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
  },
  sectionHead: {
    display: "flex", alignItems: "center", gap: "12px",
    marginBottom: "22px",
  },
  sectionNum: {
    backgroundColor: "#065F46", color: "#6EE7B7",
    borderRadius: "8px", padding: "3px 10px",
    fontSize: "12px", fontWeight: "800", letterSpacing: "0.5px",
  },
  sectionText: {
    fontSize: "13px", fontWeight: "700",
    color: "#6EE7B7", textTransform: "uppercase", letterSpacing: "1px",
  },
  divider: {
    borderTop: "1px solid #1F2937",
    margin: "26px 0",
  },
  grid2: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "18px", marginBottom: "18px",
  },
  field: { display: "flex", flexDirection: "column", marginBottom: "4px" },
  label: {
    fontSize: "13px", fontWeight: "600",
    color: "#6EE7B7", marginBottom: "8px",
  },
  req: { color: "#F87171" },
  inputWrap: {
    display: "flex", alignItems: "center",
    backgroundColor: "#0A0F1E",
    border: "1.5px solid #1F2937",
    borderRadius: "10px", overflow: "hidden",
  },
  inputIcon: {
    padding: "0 12px", fontSize: "16px",
    borderRight: "1px solid #1F2937",
    backgroundColor: "#0D1526",
    display: "flex", alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  input: {
    flex: 1, backgroundColor: "transparent",
    border: "none", outline: "none",
    padding: "11px 14px", fontSize: "14px",
    color: "#E5F9F0", width: "100%",
  },
  textarea: {
    backgroundColor: "#0A0F1E",
    border: "1.5px solid #1F2937",
    borderRadius: "10px", padding: "12px 14px",
    fontSize: "14px", color: "#E5F9F0",
    width: "100%", height: "120px",
    resize: "vertical", outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', sans-serif",
  },
  btnRow: {
    display: "flex", justifyContent: "flex-end",
    gap: "12px", marginTop: "12px", flexWrap: "wrap",
  },
  resetBtn: {
    backgroundColor: "transparent", color: "#6B7280",
    border: "1.5px solid #1F2937", borderRadius: "10px",
    padding: "11px 20px", fontSize: "14px",
    fontWeight: "600", cursor: "pointer",
  },
  listBtn: {
    backgroundColor: "#064E3B", color: "#6EE7B7",
    border: "1.5px solid #065F46", borderRadius: "10px",
    padding: "11px 20px", fontSize: "14px",
    fontWeight: "600", cursor: "pointer",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #065F46, #10B981)",
    color: "#fff", border: "none", borderRadius: "10px",
    padding: "11px 28px", fontSize: "14px",
    fontWeight: "700", cursor: "pointer",
    boxShadow: "0 4px 16px rgba(16,185,129,0.35)",
  },
  footer: {
    textAlign: "center", color: "#1F4A35",
    fontSize: "12px", marginTop: "24px",
  },
};
