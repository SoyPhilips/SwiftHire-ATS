import React, { useState, useEffect } from 'react';
import {
  Users,
  LayoutDashboard,
  Calendar,
  Search,
  Bell,
  Settings,
  Filter,
  Plus,
  MoreHorizontal,
  ChevronRight,
  Star,
  MessageSquare,
  CheckCircle2,
  Clock,
  Briefcase,
  X
} from 'lucide-react';
import './App.css';

// --- Initial Data ---
const INITIAL_CANDIDATES = [
  { id: 1, name: 'Alex Rivera', role: 'Frontend Engineer', skills: ['React', 'TypeScript'], rating: 4.5, stage: 'Sourcing', feedback: 'Great culture fit. Strong technical base.' },
  { id: 2, name: 'Maria Gomez', role: 'UI Designer', skills: ['Figma', 'Adobe XD'], rating: 4.8, stage: 'Sourcing', feedback: 'Portfolio is amazing. Very detail-oriented.' },
  { id: 3, name: 'John Smith', role: 'Backend Lead', skills: ['Node.js', 'AWS'], rating: 4.2, stage: 'Interview', feedback: 'Good architecture knowledge.' },
  { id: 4, name: 'Elena Petrova', role: 'Fullstack Dev', skills: ['React', 'Postgres', 'TypeScript'], rating: 4.9, stage: 'Technical Test', feedback: 'Solved all tasks efficiently.' },
  { id: 5, name: 'David Chen', role: 'DevOps', skills: ['Docker', 'K8s', 'AWS'], rating: 5.0, stage: 'Hired', feedback: 'Perfect for the team.' }
];

const INITIAL_JOBS = [
  { id: 1, title: 'Frontend Engineer', department: 'Engineering', status: 'Active', applicants: 12, posted: '2 days ago' },
  { id: 2, title: 'Senior Backend Dev', department: 'Engineering', status: 'Active', applicants: 8, posted: '5 days ago' },
  { id: 3, title: 'Product Designer', department: 'Design', status: 'On Hold', applicants: 24, posted: '1 week ago' },
  { id: 4, title: 'HR Manager', department: 'Operations', status: 'Closed', applicants: 45, posted: '2 weeks ago' }
];

const INITIAL_SCHEDULE = [
  { id: 1, type: 'Technical Interview', candidate: 'John Smith', time: '10:30 AM', date: 'Today', interviewer: 'Sarah Connor' },
  { id: 2, type: 'Culture Fit', candidate: 'Elena Petrova', time: '2:00 PM', date: 'Today', interviewer: 'James Bond' },
  { id: 3, type: 'General screening', candidate: 'Maria Gomez', time: '9:00 AM', date: 'Tomorrow', interviewer: 'Jane Doe' }
];

const STAGES = ['Sourcing', 'Interview', 'Technical Test', 'Hired'];

// --- Components ---

const Sidebar = ({ activeTab, onTabChange }) => (
  <aside className="sidebar">
    <div className="logo">
      <div className="logo-icon">S</div>
      <span>SwiftHire</span>
    </div>

    <nav className="nav-links">
      <button
        className={`nav-item ${activeTab === 'Pipeline' ? 'active' : ''}`}
        onClick={() => { onTabChange('Pipeline'); }}
      >
        <LayoutDashboard size={20} />
        <span>Pipeline</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'Candidates' ? 'active' : ''}`}
        onClick={() => { onTabChange('Candidates'); }}
      >
        <Users size={20} />
        <span>Candidates</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'Jobs' ? 'active' : ''}`}
        onClick={() => { onTabChange('Jobs'); }}
      >
        <Briefcase size={20} />
        <span>Jobs</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'Schedule' ? 'active' : ''}`}
        onClick={() => { onTabChange('Schedule'); }}
      >
        <Calendar size={20} />
        <span>Schedule</span>
      </button>
      <div className="nav-divider"></div>
      <button
        className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`}
        onClick={() => { onTabChange('Settings'); }}
      >
        <Settings size={20} />
        <span>Settings</span>
      </button>
    </nav>

    <div className="sidebar-footer">
      <div className="user-profile">
        <div className="avatar">JD</div>
        <div className="user-info">
          <p className="user-name">Jane Doe</p>
          <p className="user-role">Recruiter</p>
        </div>
      </div>
    </div>
  </aside>
);

const CVPreview = ({ name }) => {
  return (
    <div className="cv-preview-container">
      <div className="cv-mock-page glass">
        <div className="cv-header-line"></div>
        <div className="cv-content-lines">
          <div className="cv-line long"></div>
          <div className="cv-line"></div>
          <div className="cv-line medium"></div>
          <div className="cv-line long"></div>
        </div>
        <div className="cv-overlay">
          <Briefcase size={24} />
          <span>Curriculum Vitae - {name}</span>
        </div>
      </div>
      <button className="btn-primary" style={{ width: '100%', marginTop: '12px' }}>
        <Clock size={16} />
        Download CV
      </button>
    </div>
  );
};

const CandidateCard = ({ id, name, role, skills, rating, onClick, onDragStart }) => (
  <div
    className="candidate-card card"
    onClick={onClick}
    draggable="true"
    onDragStart={(e) => onDragStart(e, id)}
  >
    <div className="card-header">
      <div className="candidate-info">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
      <button className="btn-icon" onClick={(e) => e.stopPropagation()}>
        <MoreHorizontal size={18} />
      </button>
    </div>

    <div className="skills-tags">
      {skills.slice(0, 3).map((skill, i) => (
        <span key={i} className="skill-tag">{skill}</span>
      ))}
      {skills.length > 3 && <span className="skill-tag">+{skills.length - 3}</span>}
    </div>

    <div className="card-footer">
      <div className="rating">
        <Star size={14} fill="#f59e0b" color="#f59e0b" />
        <span>{rating}</span>
      </div>
      <div className="comments">
        <MessageSquare size={14} />
        <span>2</span>
      </div>
    </div>
  </div>
);

const FeedbackEditor = ({ initialValue, onChange }) => {
  return (
    <div className="feedback-editor">
      <div className="editor-toolbar">
        <button className="toolbar-btn"><b>B</b></button>
        <button className="toolbar-btn"><i>I</i></button>
        <button className="toolbar-btn"><u>U</u></button>
        <div className="toolbar-divider"></div>
        <button className="toolbar-btn"><CheckCircle2 size={16} /></button>
      </div>
      <div
        className="editor-content"
        contentEditable
        onBlur={(e) => onChange(e.target.innerText)}
        suppressContentEditableWarning={true}
      >
        {initialValue}
      </div>
    </div>
  );
};

const CandidateModal = ({ candidate, onClose, onUpdate, onMove }) => {
  const [feedback, setFeedback] = useState(candidate?.feedback || '');

  useEffect(() => {
    if (candidate) setFeedback(candidate.feedback);
  }, [candidate]);

  if (!candidate) return null;

  const handleSave = () => {
    onUpdate(candidate.id, { feedback });
    onClose();
  };

  const nextStage = STAGES[STAGES.indexOf(candidate.stage) + 1];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h2>{candidate.name}</h2>
            <p>{candidate.role}</p>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-grid">
          <div className="modal-left">
            <div className="modal-section">
              <h3>Feedback</h3>
              <FeedbackEditor initialValue={feedback} onChange={setFeedback} />
            </div>

            <div className="modal-section">
              <h3>Technical Skills</h3>
              <div className="skills-tags">
                {candidate.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="modal-section timeline">
              <h3>Activity</h3>
              <div className="timeline-item">
                <CheckCircle2 size={16} className="icon-success" />
                <div>
                  <p className="timeline-text">Applied for <b>{candidate.role}</b></p>
                  <p className="timeline-time">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-right">
            <div className="modal-section">
              <h3>Resume / CV</h3>
              <CVPreview name={candidate.name} />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {nextStage && (
            <button className="btn-ghost" style={{ marginRight: 'auto', color: 'var(--primary)', fontWeight: '600' }} onClick={() => onMove(candidate.id, nextStage)}>
              Move to {nextStage}
            </button>
          )}
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Feedback</button>
        </div>
      </div>
    </div>
  );
};

const SidePreview = ({ candidate, onClose, onUpdate, onMove }) => {
  if (!candidate) return null;

  return (
    <div className="side-preview glass">
      <div className="preview-header">
        <div className="preview-title">
          <h2>{candidate.name}</h2>
          <p>{candidate.role}</p>
        </div>
        <button className="btn-icon" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="preview-body">
        <div className="preview-section">
          <h3>Resume Preview</h3>
          <CVPreview name={candidate.name} />
        </div>

        <div className="preview-section">
          <h3>Quick Feedback</h3>
          <FeedbackEditor
            initialValue={candidate.feedback}
            onChange={(val) => onUpdate(candidate.id, { feedback: val })}
          />
        </div>

        <div className="preview-section">
          <h3>Skills</h3>
          <div className="skills-tags">
            {candidate.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="preview-footer">
        <button className="btn-primary" style={{ width: '100%' }} onClick={() => {
          const next = STAGES[STAGES.indexOf(candidate.stage) + 1];
          if (next) onMove(candidate.id, next);
        }}>
          Move to Next Stage
        </button>
      </div>
    </div>
  );
};
const ListView = ({ candidates, onSelect, selectedId }) => {
  return (
    <div className="list-view-container">
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Stage</th>
            <th>Rating</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr
              key={c.id}
              className={selectedId === c.id ? 'active' : ''}
              onClick={() => onSelect(c)}
            >
              <td>
                <div className="table-name">
                  <div className="table-avatar">{c.name.charAt(0)}</div>
                  {c.name}
                </div>
              </td>
              <td>{c.role}</td>
              <td>
                <span className={`status-pill ${c.stage.toLowerCase().replace(' ', '-')}`}>
                  {c.stage}
                </span>
              </td>
              <td>
                <div className="rating">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{c.rating}</span>
                </div>
              </td>
              <td>
                <div className="skills-tags mini">
                  {c.skills.slice(0, 2).map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const CandidatesSection = ({ candidates, onSelect, selectedCandidate, onUpdate, onMove }) => (
  <div className="section-container animate-fade-in">
    <div className="section-header">
      <div className="header-text">
        <h2>Candidates Directory</h2>
        <p>Manage and browse all your applicants in one place.</p>
      </div>
    </div>
    <div className={`list-management-wrapper ${selectedCandidate ? 'split' : ''}`}>
      <ListView candidates={candidates} onSelect={onSelect} selectedId={selectedCandidate?.id} />
      {selectedCandidate && (
        <SidePreview
          candidate={selectedCandidate}
          onClose={() => onSelect(null)}
          onUpdate={onUpdate}
          onMove={onMove}
        />
      )}
    </div>
  </div>
);

const JobDetailModal = ({ job, onClose }) => {
  if (!job) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h2>{job.title}</h2>
            <p>{job.department} • {job.status}</p>
          </div>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-section">
          <h3>Job Description</h3>
          <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            We are looking for a highly motivated {job.title} to join our growing team.
            In this role, you will be responsible for developing high-impact features,
            collaborating with cross-functional teams, and helping drive our technical strategy.
          </p>
        </div>
        <div className="modal-section">
          <h3>Requirements</h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '2', color: 'var(--text-main)' }}>
            <li>Minimum of 3 years of experience in the field.</li>
            <li>Strong proficiency in modern technologies.</li>
            <li>Excellent problem-solving and communication skills.</li>
          </ul>
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Close</button>
          <button className="btn-primary">Edit Job</button>
        </div>
      </div>
    </div>
  );
};

const NotificationsDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const notifications = [
    { id: 1, text: 'Alex Rivera moved to Interview', time: '5m ago', icon: <ChevronRight size={14} /> },
    { id: 2, text: 'New application for UI Designer', time: '1h ago', icon: <Plus size={14} /> },
    { id: 3, text: 'Interview scheduled with David Chen', time: '2h ago', icon: <Clock size={14} /> },
  ];

  return (
    <div className="notifications-dropdown card" onClick={e => e.stopPropagation()}>
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button onClick={onClose} className="btn-ghost mini">Mark as read</button>
      </div>
      <div className="notifications-list">
        {notifications.map(n => (
          <div key={n.id} className="notification-item">
            <div className="notification-icon">{n.icon}</div>
            <div className="notification-content">
              <p>{n.text}</p>
              <span>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddEventModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({ type: 'Technical Interview', candidate: '', time: '', date: 'Today', interviewer: 'Jane Doe' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now() });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content add-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Schedule New Event</h2>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label>Event Type</label>
            <select
              className="form-input"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
            >
              <option>Technical Interview</option>
              <option>Culture Fit</option>
              <option>General Screening</option>
            </select>
          </div>
          <div className="form-group">
            <label>Candidate Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Alex Rivera"
              value={formData.candidate}
              onChange={e => setFormData({ ...formData, candidate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              required
              type="text"
              placeholder="e.g. 10:30 AM"
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Schedule Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const JobsSection = ({ onSelectJob }) => (
  <div className="section-container animate-fade-in">
    <div className="section-header">
      <div className="header-text">
        <h2>Job Openings</h2>
        <p>Manage your active roles and internal departments.</p>
      </div>
      <button className="btn-primary"><Plus size={18} /> New Job</button>
    </div>
    <div className="grid-responsive">
      {INITIAL_JOBS.map(job => (
        <div key={job.id} className="card job-card">
          <div className="card-header">
            <h3>{job.title}</h3>
            <span className={`status-pill ${job.status.toLowerCase().replace(' ', '-')}`}>{job.status}</span>
          </div>
          <p className="job-dept">{job.department}</p>
          <div className="job-meta">
            <Users size={14} /> <span>{job.applicants} Applicants</span>
            <Clock size={14} /> <span>Posted {job.posted}</span>
          </div>
          <button className="btn-ghost" style={{ width: '100%', marginTop: '16px' }} onClick={() => onSelectJob(job)}>View Details</button>
        </div>
      ))}
    </div>
  </div>
);

const ScheduleSection = ({ events, onAddEvent }) => (
  <div className="section-container animate-fade-in">
    <div className="section-header">
      <div className="header-text">
        <h2>Interview Schedule</h2>
        <p>Keep track of your upcoming candidate interactions.</p>
      </div>
      <button className="btn-primary" onClick={onAddEvent}><Calendar size={18} /> Add Event</button>
    </div>
    <div className="schedule-list">
      {events.map(event => (
        <div key={event.id} className="schedule-item card">
          <div className="schedule-time-box">
            <span className="event-date">{event.date}</span>
            <span className="event-time">{event.time}</span>
          </div>
          <div className="schedule-info">
            <h4>{event.type}</h4>
            <p>Candidate: <b>{event.candidate}</b></p>
          </div>
          <div className="schedule-interviewer">
            <p>Interviewer</p>
            <span>{event.interviewer}</span>
          </div>
          <button className="btn-icon"><MoreHorizontal size={18} /></button>
        </div>
      ))}
    </div>
  </div>
);

const SettingsSection = () => (
  <div className="section-container animate-fade-in">
    <div className="section-header">
      <div className="header-text">
        <h2>Account Settings</h2>
        <p>Configure your personal preferences and workspace.</p>
      </div>
    </div>
    <div className="settings-grid">
      <div className="card settings-card">
        <h3>Profile Information</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" defaultValue="Jane Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue="jane@swifthire.ai" />
          </div>
          <button className="btn-primary">Update Profile</button>
        </div>
      </div>
      <div className="card settings-card">
        <h3>Notifications</h3>
        <div className="toggle-group">
          <div className="toggle-item">
            <span>New Application Email</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="toggle-item">
            <span>Interview Reminders</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="toggle-item">
            <span>Weekly Report</span>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AddCandidateModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', role: '', skills: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
    onAdd({
      ...formData,
      skills: skillsArray,
      rating: 4.0,
      stage: 'Sourcing',
      feedback: 'New candidate added manually.'
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content add-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Candidate</h2>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              required
              type="text"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              required
              type="text"
              placeholder="e.g. Frontend Engineer"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input
              required
              type="text"
              placeholder="e.g. React, Node, SQL"
              value={formData.skills}
              onChange={e => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Create Candidate</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [activeTab, setActiveTab] = useState('Pipeline');
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillFilter, setActiveSkillFilter] = useState('All');
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [viewMode, setViewMode] = useState('Board'); // 'Board' or 'List'
  const [selectedJob, setSelectedJob] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [events, setEvents] = useState(INITIAL_SCHEDULE);

  // Filter Logic
  const filteredCandidates = candidates.filter(c => {
    const nameMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const roleMatch = c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const skillMatch = activeSkillFilter === 'All' || c.skills.includes(activeSkillFilter);
    return (nameMatch || roleMatch) && skillMatch;
  });

  // Actions
  const updateCandidate = (id, updates) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const moveCandidate = (id, newStage) => {
    updateCandidate(id, { stage: newStage });
    if (viewMode === 'Board') setSelectedCandidate(null);
    else {
      const updated = candidates.find(c => c.id === id);
      if (updated) setSelectedCandidate({ ...updated, stage: newStage });
    }
  };

  const addCandidate = (newCandidate) => {
    setCandidates(prev => [...prev, { ...newCandidate, id: Date.now() }]);
  };

  const addEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  // Drag & Drop Handlers
  const handleDragStart = (e, id) => { e.dataTransfer.setData('candidateId', id); };
  const handleDragOver = (e, stage) => { e.preventDefault(); setDragOverColumn(stage); };
  const handleDrop = (e, stage) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('candidateId'));
    moveCandidate(id, stage);
    setDragOverColumn(null);
  };

  const skillsList = ['All', 'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Pipeline':
        return (
          <>
            <div className="filters-bar">
              <div className="skill-filters">
                <Filter size={18} />
                <div className="filter-chips">
                  {skillsList.map(skill => (
                    <span
                      key={skill}
                      className={`filter-chip ${activeSkillFilter === skill ? 'active' : ''}`}
                      onClick={() => setActiveSkillFilter(skill)}
                    >
                      {skill === 'All' ? 'All Skills' : skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="view-selector">
                <button className={`view-btn ${viewMode === 'Board' ? 'active' : ''}`} onClick={() => { setViewMode('Board'); setSelectedCandidate(null); }}>Board</button>
                <button className={`view-btn ${viewMode === 'List' ? 'active' : ''}`} onClick={() => { setViewMode('List'); setSelectedCandidate(null); }}>List</button>
              </div>
            </div>

            <div className={`management-area ${viewMode === 'List' && selectedCandidate ? 'split' : ''}`}>
              {viewMode === 'Board' ? (
                <div className="pipeline-board">
                  {STAGES.map((stage, i) => {
                    const stageCandidates = filteredCandidates.filter(c => c.stage === stage);
                    return (
                      <div
                        key={i}
                        className={`pipeline-column ${dragOverColumn === stage ? 'drag-over' : ''}`}
                        onDragOver={(e) => handleDragOver(e, stage)}
                        onDragLeave={() => setDragOverColumn(null)}
                        onDrop={(e) => handleDrop(e, stage)}
                      >
                        <div className="column-header">
                          <div>
                            <h2>{stage}</h2>
                            <span className="count">{stageCandidates.length}</span>
                          </div>
                          <button className="btn-icon" onClick={() => setIsAddModalOpen(true)}>
                            <Plus size={18} />
                          </button>
                        </div>
                        <div className="column-content">
                          {stageCandidates.length > 0 ? (
                            stageCandidates.map((c) => (
                              <CandidateCard
                                key={c.id}
                                id={c.id}
                                {...c}
                                onClick={() => setSelectedCandidate(c)}
                                onDragStart={handleDragStart}
                              />
                            ))
                          ) : (
                            <div className="empty-stage">No candidates</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="list-management-wrapper">
                  <ListView
                    candidates={filteredCandidates}
                    onSelect={setSelectedCandidate}
                    selectedId={selectedCandidate?.id}
                  />
                  {selectedCandidate && (
                    <SidePreview
                      candidate={selectedCandidate}
                      onClose={() => setSelectedCandidate(null)}
                      onUpdate={updateCandidate}
                      onMove={moveCandidate}
                    />
                  )}
                </div>
              )}
            </div>
          </>
        );
      case 'Candidates':
        return (
          <CandidatesSection
            candidates={filteredCandidates}
            onSelect={setSelectedCandidate}
            selectedCandidate={selectedCandidate}
            onUpdate={updateCandidate}
            onMove={moveCandidate}
          />
        );
      case 'Jobs':
        return <JobsSection onSelectJob={setSelectedJob} />;
      case 'Schedule':
        return <ScheduleSection events={events} onAddEvent={() => setIsAddEventModalOpen(true)} />;
      case 'Settings':
        return <SettingsSection />;
      default:
        return null;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCandidate(null);
    setIsNotificationsOpen(false);
  };

  return (
    <div className="app-container" onClick={() => setIsNotificationsOpen(false)}>
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="main-content">
        <header className="topbar">
          <div className="header-left">
            <h1>{activeTab}</h1>
            <div className="breadcrumb">
              <span>Recruitment</span>
              <ChevronRight size={14} />
              <span className="current">Software Engineering</span>
            </div>
          </div>

          <div className="header-actions">
            <div className="search-bar glass">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <button
                className={`btn-icon glass ${isNotificationsOpen ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIsNotificationsOpen(!isNotificationsOpen); }}
              >
                <Bell size={20} />
                <span className="notif-badge"></span>
              </button>
              <NotificationsDropdown isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            </div>
            <button className="btn-primary" onClick={() => {
              if (activeTab === 'Schedule') setIsAddEventModalOpen(true);
              else setIsAddModalOpen(true);
            }}>
              <Plus size={18} />
              {activeTab === 'Jobs' ? 'New Job' : activeTab === 'Schedule' ? 'Add Event' : 'Add Candidate'}
            </button>
          </div>
        </header>

        <section className="dashboard-content">
          {renderContent()}
        </section>
      </main>

      {(activeTab === 'Pipeline' || activeTab === 'Candidates') && viewMode === 'Board' && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onUpdate={updateCandidate}
          onMove={moveCandidate}
        />
      )}

      {isAddModalOpen && (
        <AddCandidateModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addCandidate}
        />
      )}

      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      {isAddEventModalOpen && (
        <AddEventModal onClose={() => setIsAddEventModalOpen(false)} onAdd={addEvent} />
      )}
    </div>
  );
};

export default App;
