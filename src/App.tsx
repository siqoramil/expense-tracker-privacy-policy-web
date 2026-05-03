import { useEffect, useState } from 'react'
import './App.css'

const LAST_UPDATED = 'May 2, 2026'
const CONTACT_EMAIL = 'siqoramil@gmail.com'

type Section = { id: string; title: string }

const SECTIONS: Section[] = [
  { id: 'information-we-collect', title: '1. Information we collect' },
  { id: 'how-we-use', title: '2. How we use your information' },
  { id: 'data-storage', title: '3. Data storage and security' },
  { id: 'third-party', title: '4. Third-party services' },
  { id: 'account-deletion', title: '5. Account deletion' },
  { id: 'children', title: '6. Children' },
  { id: 'changes', title: '7. Changes to this policy' },
  { id: 'contact', title: '8. Contact' },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path
        d="M12 2 3 6v6c0 5 3.8 9.4 9 10 5.2-.6 9-5 9-10V6l-9-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m8.5 12 2.5 2.5L15.5 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function App() {
  const active = useActiveSection(SECTIONS.map((s) => s.id))

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* ─── Hero ──────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-brand-50 via-white to-accent-500/10 dark:from-brand-700/20 dark:via-zinc-950 dark:to-accent-500/15">
        <div className="hero-grid absolute inset-0 opacity-50 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2.5 pl-2 pr-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white">
              <ShieldIcon />
            </span>
            <span className="font-semibold text-sm tracking-tight">
              Expense Tracker
            </span>
          </div>

          <h1 className="mt-7 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] gradient-text bg-gradient-to-br from-zinc-900 via-zinc-800 to-accent-600 dark:from-white dark:via-zinc-100 dark:to-accent-400">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            How the Expense Tracker mobile application collects, uses, and
            protects your information. By using the app, you agree to the
            practices described below.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm text-zinc-600 dark:text-zinc-400">
            <span className="relative flex">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Last updated{' '}
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              {LAST_UPDATED}
            </strong>
          </div>
        </div>
      </header>

      {/* ─── Layout ─────────────────────────────────────────── */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-14 grid gap-14 md:grid-cols-[14rem_1fr]">
        {/* TOC */}
        <aside className="md:sticky md:top-8 md:self-start text-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-500 mb-3 md:pl-3">
            On this page
          </p>
          <nav className="md:border-l border-zinc-200 dark:border-zinc-800 max-md:border max-md:rounded-xl max-md:p-3 max-md:bg-white max-md:dark:bg-zinc-900">
            <ul className="space-y-0 max-md:columns-2 max-md:gap-4">
              {SECTIONS.map((s) => {
                const isActive = active === s.id
                return (
                  <li key={s.id} className="break-inside-avoid">
                    <a
                      href={`#${s.id}`}
                      className={[
                        'block py-1.5 transition-colors leading-snug',
                        'md:px-3 md:-ml-px md:border-l-2',
                        isActive
                          ? 'md:border-brand-500 md:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold'
                          : 'md:border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100',
                      ].join(' ')}
                    >
                      {s.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden md:inline-flex items-center mt-6 ml-3 px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Contact us →
          </a>
        </aside>

        {/* Content */}
        <article className="max-w-3xl prose-content">
          <Section id="information-we-collect" title="1. Information we collect">
            <ul>
              <li>
                <strong>Account information</strong> — your email address,
                name, and a password (stored as a one-way bcrypt hash). If you
                sign in with Google, we receive your Google email and name
                only.
              </li>
              <li>
                <strong>Profile picture</strong> — optional, chosen from your
                device's photo library. Stored on our server.
              </li>
              <li>
                <strong>Financial data</strong> — transactions, budgets,
                debts, wallets, categories, recurring entries, and
                notifications that you create within the app. This data is
                stored on our server and linked to your account.
              </li>
              <li>
                <strong>App preferences</strong> — language, currency, and
                theme settings.
              </li>
              <li>
                <strong>Verification codes</strong> — temporary 6-digit codes
                sent to your email for password reset, email change, or
                account deletion. Codes expire within 10 minutes.
              </li>
            </ul>

            <div className="mt-5 p-5 rounded-xl bg-rose-50 border border-rose-200 dark:bg-rose-950/30 dark:border-rose-900/60 text-rose-900 dark:text-rose-200">
              <div className="flex items-center gap-2 font-bold text-[15px] mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-[18px] h-[18px] flex-shrink-0"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m8 8 8 8M16 8l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
                We do <strong>not</strong> collect
              </div>
              <p className="m-0 text-sm leading-relaxed opacity-95">
                Location data, contacts, microphone, camera, photos other
                than the one you explicitly select, advertising identifiers,
                device identifiers, or analytics.
              </p>
            </div>
          </Section>

          <Section id="how-we-use" title="2. How we use your information">
            <ul>
              <li>To create and authenticate your account.</li>
              <li>To store and sync your financial entries across devices.</li>
              <li>
                To send transactional emails (verification codes for password
                reset, email change, account deletion).
              </li>
              <li>To enforce rate limits and protect against abuse.</li>
            </ul>
            <p className="mt-4 px-4 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[15px] font-medium text-zinc-800 dark:text-zinc-200">
              We do not use your data for advertising, profiling, or sell it
              to third parties.
            </p>
          </Section>

          <Section id="data-storage" title="3. Data storage and security">
            <p>
              Your data is stored on our server hosted at{' '}
              <code className="font-mono text-[0.9em] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5">
                expensetracker.ovrin.uz
              </code>
              . Communication between the app and the server uses HTTPS.
              Passwords are stored as bcrypt hashes; we cannot read them.
              Authentication uses signed JWT tokens.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <SecurityCard
                title="HTTPS / TLS"
                desc="All traffic encrypted in transit."
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path
                      d="M6 10V7a6 6 0 0 1 12 0v3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                }
              />
              <SecurityCard
                title="bcrypt"
                desc="Passwords are hashed, never stored in plaintext."
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path
                      d="M12 3 4 7v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V7l-8-4Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <SecurityCard
                title="Signed JWT"
                desc="Stateless, tamper-evident sessions."
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path
                      d="M4 7h16M4 12h16M4 17h10"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              />
            </div>
          </Section>

          <Section id="third-party" title="4. Third-party services">
            <ul>
              <li>
                <strong>Google Sign-In (optional)</strong> — if you sign in
                with Google, we receive your verified email and name from
                Google. Google's privacy policy:{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-2"
                >
                  policies.google.com/privacy
                </a>
                .
              </li>
              <li>
                <strong>Email delivery</strong> — verification codes are
                delivered via a third-party email provider for transactional
                purposes only.
              </li>
            </ul>
          </Section>

          <Section id="account-deletion" title="5. Account deletion">
            <p>
              You can delete your account at any time from within the app:{' '}
              <em>Profile → Delete account</em>. After confirming with a
              6-digit code sent to your email, your user record and all
              associated data (transactions, budgets, debts, wallets,
              categories, recurring entries, notifications, verification
              codes) are permanently deleted from our server. This action
              cannot be undone.
            </p>
            <p>
              Alternatively, you may request deletion by emailing{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section id="children" title="6. Children">
            <p>
              The app is not directed at children under 13 and we do not
              knowingly collect data from them.
            </p>
          </Section>

          <Section id="changes" title="7. Changes to this policy">
            <p>
              We may update this Privacy Policy. The "Last updated" date
              above reflects the most recent change. Continued use of the
              app after an update constitutes acceptance.
            </p>
          </Section>

          <Section id="contact" title="8. Contact" last>
            <p>
              If you have any questions, contact us at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-[18px] h-[18px]"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="m4 7 8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
              Email support
            </a>
          </Section>
        </article>
      </div>

      {/* ─── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
        <p className="m-0">© {new Date().getFullYear()} Expense Tracker</p>
        <p className="m-0 mt-1 text-zinc-400 dark:text-zinc-600">
          Last updated {LAST_UPDATED} ·{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-zinc-500 hover:text-brand-500 underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </footer>
    </div>
  )
}

function Section({
  id,
  title,
  children,
  last,
}: {
  id: string
  title: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <section
      id={id}
      className={[
        'py-8 first:pt-0',
        last
          ? ''
          : 'border-b border-zinc-200 dark:border-zinc-800',
      ].join(' ')}
    >
      <h2 className="scroll-mt-20 text-2xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      <div className="space-y-3 text-zinc-700 dark:text-zinc-300 leading-relaxed [&_strong]:text-zinc-900 dark:[&_strong]:text-zinc-100 [&_ul]:pl-5 [&_ul]:list-disc [&_ul>li]:my-1.5 [&_p]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1 [&_h3]:text-zinc-900 dark:[&_h3]:text-zinc-100">
        {children}
      </div>
    </section>
  )
}

function SecurityCard({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: React.ReactNode
}) {
  return (
    <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 hover:shadow-lg transition-all">
      <div className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500/15 to-accent-500/20 text-brand-600 dark:text-brand-400 mb-3">
        {icon}
      </div>
      <h3 className="text-base font-semibold mb-1 text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="m-0 text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
        {desc}
      </p>
    </div>
  )
}

export default App
