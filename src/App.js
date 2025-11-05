import React, { useState } from "react";
import "./App.css";

export default function App() {
  const colors = ["blue", "violet", "green"];
  const [theme, setTheme] = useState(colors[0]);
  const [template, setTemplate] = useState(1);

  const [resume, setResume] = useState({
    name: "Abirami B",
    title: "PHP Full Stack Developer",
    email: "abirami@gmail.com",
    phone: "+91 98765 43210",
    location: "Madurai, India",
    summary:
      "Enthusiastic PHP Full Stack Developer with knowledge of PHP, Laravel, MySQL, HTML, CSS, JavaScript, and React.js. Passionate about building websites and web applications. Quick learner with a strong interest in backend and frontend development.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "API",
      "PHP",
      "Laravel",
      "MySQL",
      "Git/GitHub",
    ],
    education: {
      degree: "B.Sc – Computer Science",
      university: "Madurai Kamaraj University, Madurai",
      year: "2025",
    },
    projects: [
      {
        name: "E-Commerce Platform",
        tech: "HTML5, CSS, JavaScript, React.js",
        desc: "Developed a complete online shopping platform with product management, cart, Favourites.",
      },
      {
        name: "Villa Template",
        tech: "HTML5, CSS",
        desc: "A clean and elegant static website template designed to showcase luxury villas using only HTML and CSS.",
      },
    ],
  });

  const [newSkill, setNewSkill] = useState("");

  // === Handlers ===
  const handleChange = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleEducationChange = (field, value) => {
    setResume((prev) => ({
      ...prev,
      education: { ...prev.education, [field]: value },
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...resume.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setResume((prev) => ({ ...prev, projects: updatedProjects }));
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setResume((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  // ✅ New: Add a new project
  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: "", tech: "", desc: "" },
      ],
    }));
  };

  return (
    <div className="container" style={{ "--theme": theme }}>
      <h1 className="main-title">Resume Builder</h1>

      {/* Color Switcher */}
      <div className="color-switcher">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setTheme(c)}
            style={{ backgroundColor: c }}
          ></button>
        ))}
      </div>

      {/* Template Switch */}
      <div className="template-buttons">
        {[1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setTemplate(i)}
            className={template === i ? "active" : ""}
          >
            Template {i}
          </button>
        ))}
      </div>

      {/* Layout */}
      <div className="main-layout">
        {/* LEFT FORM */}
        <div className="input-form">
          <h2>Edit Resume Info</h2>

          {/* --- Personal Details --- */}
          <h3>Personal Details</h3>
          <input
            type="text"
            value={resume.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            value={resume.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Job Title"
          />
          <input
            type="email"
            value={resume.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
          />
          <input
            type="text"
            value={resume.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Phone Number"
          />
          <textarea
            value={resume.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="Professional Summary"
          ></textarea>

          {/* --- Skills --- */}
          <h3>Skills</h3>
          <div className="skill-input">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add new skill"
            />
            <button type="button" onClick={addSkill}>
              Add Skill
            </button>
          </div>

          <div className="skill-list">
            {resume.skills.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>

          {/* --- Education --- */}
          <h3>Education</h3>
          <input
            type="text"
            value={resume.education.degree}
            onChange={(e) => handleEducationChange("degree", e.target.value)}
            placeholder="Degree"
          />
          <input
            type="text"
            value={resume.education.university}
            onChange={(e) =>
              handleEducationChange("university", e.target.value)
            }
            placeholder="University"
          />
          <input
            type="text"
            value={resume.education.year}
            onChange={(e) => handleEducationChange("year", e.target.value)}
            placeholder="Year"
          />

          {/* --- Projects --- */}
          <h3>Projects</h3>
          {resume.projects.map((p, index) => (
            <div key={index} className="project-input">
              <input
                type="text"
                value={p.name}
                onChange={(e) =>
                  handleProjectChange(index, "name", e.target.value)
                }
                placeholder="Project Name"
              />
              <input
                type="text"
                value={p.tech}
                onChange={(e) =>
                  handleProjectChange(index, "tech", e.target.value)
                }
                placeholder="Technologies Used"
              />
              <input
                type="text"
                value={p.desc}
                onChange={(e) =>
                  handleProjectChange(index, "desc", e.target.value)
                }
                placeholder="Project Description"
              />
            </div>
          ))}
          <button type="button" onClick={addProject}>
            ➕ Add New Project
          </button>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="preview-area">
          {template === 1 && <TemplateOne resume={resume} />}
          {template === 2 && <TemplateTwo resume={resume} />}
          {template === 3 && <TemplateThree resume={resume} />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- TEMPLATE ONE ---------------- */
function TemplateOne({ resume }) {
  return (
    <div className="resume-card classic">
      <h1>{resume.name}</h1>
      <p className="title">{resume.title}</p>
      <hr />
      <p>{resume.summary}</p>

      <div className="info">
        <p><strong>Email:</strong> {resume.email}</p>
        <p><strong>Phone:</strong> {resume.phone}</p>
      </div>

      <div className="skills">
        <h3>Skills</h3>
        <div className="skill-list">
          {resume.skills.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>

      <div className="education">
        <h3>Education</h3>
        <p>{resume.education.degree} – {resume.education.university} ({resume.education.year})</p>
      </div>

      <div className="projects">
        <h3>Projects</h3>
        {resume.projects.map((p, i) => (
          <div key={i}>
            <strong>{p.name}</strong> ({p.tech})
            <br />
            <span>{p.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- TEMPLATE TWO ---------------- */
function TemplateTwo({ resume }) {
  return (
    <div className="resume-card sidebar">
      <div className="left">
        <h1>{resume.name}</h1>
        <p className="title">{resume.title}</p>
        <div className="skills">
          <h3>Skills</h3>
          <div className="skill-list">
            {resume.skills.map((s) => <span key={s}>{s}</span>)}
          </div>
        </div>
      </div>

      <div className="right">
        <p>{resume.summary}</p>
        <div className="info">
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>Phone:</strong> {resume.phone}</p>
        </div>

        <div className="education">
          <h3>Education</h3>
          <p>{resume.education.degree} – {resume.education.university} ({resume.education.year})</p>
        </div>

        <div className="projects">
          <h3>Projects</h3>
          {resume.projects.map((p, i) => (
            <div key={i}>
              <strong>{p.name}</strong> ({p.tech})
              <br />
              <span>{p.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- TEMPLATE THREE ---------------- */
function TemplateThree({ resume }) {
  return (
    <div className="resume-card modern">
      <div className="header">
        <div className="avatar">
          {resume.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <h1>{resume.name}</h1>
          <p className="title">{resume.title}</p>
        </div>
      </div>

      <p className="summary">{resume.summary}</p>

      <div className="skills">
        <h3>Skills</h3>
        <div className="skill-list">
          {resume.skills.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>

      <div className="info">
        <p><strong>Email:</strong> {resume.email}</p>
        <p><strong>Phone:</strong> {resume.phone}</p>
      </div>

      <div className="education">
        <h3>Education</h3>
        <p>{resume.education.degree} – {resume.education.university} ({resume.education.year})</p>
      </div>

      <div className="projects">
        <h3>Projects</h3>
        {resume.projects.map((p, i) => (
          <div key={i}>
            <strong>{p.name}</strong> ({p.tech})
            <br />
            <span>{p.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
