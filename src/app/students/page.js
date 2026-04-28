.page {
  min-height: 100vh;
  padding: 30px;
  background: #f4f7fb;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #1e3a8a;
  font-size: 36px;
}

.header p {
  color: #6b7280;
}

.dashboard {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.formBox,
.previewBox {
  background: white;
  padding: 25px;
  border-radius: 22px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
}

input {
  width: 100%;
  padding: 14px;
  margin-bottom: 14px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
}

.uploadBtn {
  display: block;
  padding: 14px;
  text-align: center;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 12px;
  font-weight: bold;
  margin-bottom: 14px;
  cursor: pointer;
}

.uploadBtn input {
  display: none;
}

button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 14px;
  background: #2563eb;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #1e40af;
}

.previewBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.idCard {
  width: 330px;
  min-height: 520px;
  padding: 24px;
  border-radius: 26px;
  text-align: center;
  color: white;
  background: linear-gradient(160deg, #1e3a8a, #2563eb);
  box-shadow: 0 20px 45px rgba(37, 99, 235, 0.35);
}

.cardTop h3 {
  margin: 0;
  letter-spacing: 1px;
}

.cardTop span {
  font-size: 12px;
  opacity: 0.8;
}

.photo {
  width: 135px;
  height: 135px;
  margin: 28px auto 18px;
  background: white;
  border-radius: 50%;
  padding: 5px;
}

.photo img,
.photo span {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.photo img {
  object-fit: cover;
}

.photo span {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbeafe;
  color: #2563eb;
  font-weight: bold;
}

.role {
  color: #bfdbfe;
  font-weight: bold;
}

.details {
  background: rgba(255,255,255,0.15);
  padding: 15px;
  border-radius: 18px;
  text-align: left;
}

footer {
  margin-top: 25px;
  font-size: 13px;
}

@media (max-width: 850px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .idCard {
    width: 100%;
    max-width: 330px;
  }
}

"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./style.css";

export default function Home() {
  const cardRef = useRef(null);

  const [form, setForm] = useState({
    fullName: "Bryan Tasse",
    role: "Integration Developer",
    idNumber: "ID-2026-001",
    department: "Software Team",
    email: "bryan@example.com",
    phone: "+237 6 XX XX XX XX",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const generateCard = async () => {
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.download = `${form.fullName}-ID-Card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="page">
      <header className="header">
        <h1>ID Card Generator</h1>
        <p>Final Integrated App — Bryan</p>
      </header>

      <section className="dashboard">
        <div className="formBox">
          <h2>Enter Information</h2>

          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
          <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
          <input name="idNumber" value={form.idNumber} onChange={handleChange} placeholder="ID Number" />
          <input name="department" value={form.department} onChange={handleChange} placeholder="Department" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />

          <label className="uploadBtn">
            Upload Photo
            <input type="file" accept="image/*" onChange={handlePhoto} />
          </label>

          <button onClick={generateCard}>Generate ID Card</button>
        </div>

        <div className="previewBox">
          <h2>ID Card Preview</h2>

          <div className="idCard" ref={cardRef}>
            <div className="cardTop">
              <h3>PKF INSTITUTE</h3>
              <span>OFFICIAL ID CARD</span>
            </div>

            <div className="photo">
              {form.photo ? (
                <img src={form.photo} alt="Profile" />
              ) : (
                <span>PHOTO</span>
              )}
            </div>

            <h2>{form.fullName}</h2>
            <p className="role">{form.role}</p>

            <div className="details">
              <p><b>ID:</b> {form.idNumber}</p>
              <p><b>Department:</b> {form.department}</p>
              <p><b>Email:</b> {form.email}</p>
              <p><b>Phone:</b> {form.phone}</p>
            </div>

            <footer>Valid 2026</footer>
          </div>
        </div>
      </section>
    </main>
  );
}

