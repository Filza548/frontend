"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/legal-consultations`);

const CASE_TYPES = ["Criminal", "Civil", "Family", "Corporate", "Property", "Labour", "Tax", "Other"];
const STATUS_TYPES = ["pending", "in-progress", "completed", "cancelled"];

export default function LegalFormComponent() {
  const router = useRouter();

  const emptyForm = {
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    caseType: "",
    description: "",
    status: "pending",
    consultationDate: "",
    fee: "",
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
        fee: form.fee ? parseFloat(form.fee) : undefined,
      };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
      setSuccessMsg("✅ Consultation has been successfully submitted!");
      setForm(emptyForm);
    } catch {
      setErrorMsg("❌ Consultation has been not successfully submitted!.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Background decoration */}
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoWrap}>
            <span style={styles.logoIcon}>⚖️</span>
          </div>
          <h1 style={styles.title}>Legal Consultation Form</h1>
          <p style={styles.subtitle}>
            Register your legal problem — our team will get in touch with you shortly.
          </p>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div style={styles.successAlert}>
            <span style={styles.alertIcon}>✅</span>
            <div>
              <div style={{ fontWeight: 700 }}>Thank you!</div>
              <div style={{ fontSize: "13px", marginTop: "2px" }}>{successMsg}</div>
            </div>
          </div>
        )}
        {errorMsg && (
          <div style={styles.errorAlert}>
            <span style={styles.alertIcon}>❌</span>
            <div style={{ fontWeight: 600 }}>{errorMsg}</div>
          </div>
        )}

        {/* Form Card */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit}>

            {/* Section 1 - Personal Info */}
            <div style={styles.sectionLabel}>
              <span style={styles.sectionNum}>01</span> Personal Maloomat
            </div>

            <div style={styles.grid2}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Client Name <span style={styles.req}>*</span>
                </label>
                <input
                  style={styles.input}
                  name="clientName"
                  placeholder="Sameer Khan"
                  value={form.clientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Phone Number <span style={styles.req}>*</span>
                </label>
                <input
                  style={styles.input}
                  name="clientPhone"
                  placeholder="+92 300 1234567"
                  value={form.clientPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Email Address <span style={styles.req}>*</span>
              </label>
              <input
                style={styles.input}
                type="email"
                name="clientEmail"
                placeholder="client@email.com"
                value={form.clientEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.divider} />

            {/* Section 2 - Case Info */}
            <div style={styles.sectionLabel}>
              <span style={styles.sectionNum}>02</span> Case Information
            </div>

            <div style={styles.grid2}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Case Type <span style={styles.req}>*</span>
                </label>
                <select
                  style={styles.input}
                  name="caseType"
                  value={form.caseType}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Type --</option>
                  {CASE_TYPES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Status</label>
                <select
                  style={styles.input}
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  {STATUS_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Case Details <span style={styles.req}>*</span>
              </label>
              <textarea
                style={{ ...styles.input, height: "120px", resize: "vertical" }}
                name="description"
                placeholder="Write complete information about the case..."
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.divider} />

            {/* Section 3 - Appointment */}
            <div style={styles.sectionLabel}>
              <span style={styles.sectionNum}>03</span> Meeting Details
            </div>

            <div style={styles.grid2}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Date of meeting</label>
                <input
                  style={styles.input}
                  type="date"
                  name="consultationDate"
                  value={form.consultationDate}
                  onChange={handleChange}
                />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Fees (PKR)</label>
                <input
                  style={styles.input}
                  type="number"
                  name="fee"
                  placeholder="5000"
                  value={form.fee}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Buttons */}
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

        <p style={styles.footer}>© 2024 Legal Management System · Sab huqooq mahfooz hain</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0D1B2A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Segoe UI', sans-serif",
  },
  bgCircle1: {
    position: "fixed", top: "-120px", right: "-120px",
    width: "400px", height: "400px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(30,90,150,0.3), transparent)",
    pointerEvents: "none",
  },
  bgCircle2: {
    position: "fixed", bottom: "-100px", left: "-100px",
    width: "350px", height: "350px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(20,60,100,0.3), transparent)",
    pointerEvents: "none",
  },
  container: { width: "100%", maxWidth: "680px", position: "relative", zIndex: 1 },
  header: { textAlign: "center", marginBottom: "32px" },
  logoWrap: {
    width: "72px", height: "72px", borderRadius: "20px",
    backgroundColor: "#1E4D7B",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "36px", margin: "0 auto 16px auto",
    boxShadow: "0 8px 24px rgba(30,77,123,0.4)",
  },
  logoIcon: { lineHeight: 1 },
  title: { fontSize: "30px", fontWeight: "800", color: "#F0F6FF", margin: "0 0 8px 0" },
  subtitle: { color: "#7B9DC0", fontSize: "15px", lineHeight: 1.6, margin: 0 },

  successAlert: {
    backgroundColor: "#0A2E1A", border: "1px solid #16A34A",
    borderRadius: "12px", padding: "16px 20px",
    display: "flex", alignItems: "center", gap: "14px",
    marginBottom: "20px", color: "#4ADE80",
  },
  errorAlert: {
    backgroundColor: "#2A0A0A", border: "1px solid #DC2626",
    borderRadius: "12px", padding: "16px 20px",
    display: "flex", alignItems: "center", gap: "12px",
    marginBottom: "20px", color: "#F87171",
  },
  alertIcon: { fontSize: "22px", flexShrink: 0 },
  viewBtn: {
    marginLeft: "auto", backgroundColor: "#16A34A", color: "#fff",
    border: "none", borderRadius: "8px", padding: "8px 14px",
    fontSize: "13px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap",
  },

  card: {
    backgroundColor: "#132336",
    border: "1px solid #1E3A5F",
    borderRadius: "20px",
    padding: "36px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  },
  sectionLabel: {
    display: "flex", alignItems: "center", gap: "10px",
    fontSize: "13px", fontWeight: "700", color: "#7B9DC0",
    textTransform: "uppercase", letterSpacing: "1px",
    marginBottom: "20px",
  },
  sectionNum: {
    backgroundColor: "#1E4D7B", color: "#93C5FD",
    borderRadius: "6px", padding: "2px 8px",
    fontSize: "12px", fontWeight: "800",
  },
  divider: { borderTop: "1px solid #1E3A5F", margin: "24px 0" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "18px" },
  fieldGroup: { display: "flex", flexDirection: "column", marginBottom: "18px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#93C5FD", marginBottom: "7px" },
  req: { color: "#F87171" },
  input: {
    backgroundColor: "#0D1B2A", border: "1.5px solid #1E3A5F",
    borderRadius: "10px", padding: "11px 14px",
    fontSize: "14px", color: "#E0EEFF", outline: "none",
    width: "100%", boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  btnRow: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px", flexWrap: "wrap" },
  resetBtn: {
    backgroundColor: "transparent", color: "#7B9DC0",
    border: "1.5px solid #1E3A5F", borderRadius: "10px",
    padding: "11px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer",
  },
  listBtn: {
    backgroundColor: "#1E3A5F", color: "#93C5FD",
    border: "1.5px solid #2563EB", borderRadius: "10px",
    padding: "11px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#1D4ED8", color: "#fff",
    border: "none", borderRadius: "10px",
    padding: "11px 28px", fontSize: "14px", fontWeight: "700", cursor: "pointer",
    boxShadow: "0 4px 14px rgba(29,78,216,0.4)",
  },
  footer: { textAlign: "center", color: "#2C4A6B", fontSize: "12px", marginTop: "24px" },
};
