export default function LoginPage() {
  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="login-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5 12 5l9 5.5-9 5.5-9-5.5Z" />
            <path d="M7 12.8V16c0 1.1 2.2 3 5 3s5-1.9 5-3v-3.2" />
          </svg>
        </div>

        <h1 className="login-title">Student ID System</h1>

        <form action="/dashboard" className="login-form">
          <input className="login-input" type="email" name="email" placeholder="Email" />
          <input className="login-input" type="password" name="password" placeholder="Password" />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}
