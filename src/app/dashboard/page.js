const stats = [
  {
    label: 'Total Students',
    value: '1, 234',
    change: '+12%',
    tone: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="3" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 4.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Active Batches',
    value: '24',
    change: '+3%',
    tone: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      </svg>
    ),
  },
  {
    label: 'ID Cards Printed',
    value: '956',
    change: '+8%',
    tone: 'amber',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 10h10" />
        <path d="M7 14h6" />
      </svg>
    ),
  },
  {
    label: 'Pending Imports',
    value: '8',
    change: '-2%',
    tone: 'pink',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
        <path d="M9 9h1" />
      </svg>
    ),
  },
]

const actions = [
  {
    label: 'Add New Student',
    tone: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    ),
  },
  {
    label: 'Import from Excel',
    tone: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5" />
        <path d="M8.5 13h7" />
        <path d="M8.5 17h7" />
        <path d="M8.5 9h2" />
      </svg>
    ),
  },
  {
    label: 'Preview ID Cards',
    tone: 'amber',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 10h10" />
        <path d="M7 14h8" />
      </svg>
    ),
  },
  {
    label: 'Manage Batches',
    tone: 'pink',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      </svg>
    ),
  },
]

const activity = [
  { title: 'New batch created', detail: 'Batch 2026-A', time: '2 hours ago' },
  { title: 'Excel import completed', detail: '50 students imported', time: '5 hours ago' },
  { title: 'ID cards printed', detail: 'Batch 2025-C (30 cards)', time: '1 day ago' },
  { title: 'Student updated', detail: 'John Doe - Class 10A', time: '2 days ago' },
]

function TrendArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 15 5-5 4 4 5-7" />
      <path d="M14 7h5v5" />
    </svg>
  )
}

export default function DashboardPage() {
  return (
    <main className="dashboard-shell">
      <header className="dashboard-topbar">
        <h1>Dashboard</h1>
        <button className="logout-link" type="button">
          Logout
        </button>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-stats">
          {stats.map((item) => (
            <article key={item.label} className="dashboard-card stat-card">
              <div className={`stat-icon-box stat-${item.tone}`}>{item.icon}</div>
              <div className="stat-trend">
                <TrendArrow />
                <span>{item.change}</span>
              </div>
              <p className="stat-number">{item.value}</p>
              <p className="stat-text">{item.label}</p>
            </article>
          ))}
        </div>

        <section className="dashboard-card actions-card">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {actions.map((action) => (
              <button key={action.label} className="action-item" type="button">
                <span className={`action-icon stat-${action.tone}`}>{action.icon}</span>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="dashboard-card activity-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {activity.map((entry) => (
              <article key={entry.title + entry.time} className="activity-item">
                <p className="activity-title">{entry.title}</p>
                <p className="activity-detail">{entry.detail}</p>
                <p className="activity-time">{entry.time}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
