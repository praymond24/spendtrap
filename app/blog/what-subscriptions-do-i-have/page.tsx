import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Subscriptions Do I Have? How to Find Out in 5 Minutes — SpendTrap",
  description: "Can't remember what subscriptions you're paying for? You're not alone. Here's exactly how to find every active subscription on your accounts in under 5 minutes.",
};

export default function BlogPost() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>
      <nav style={{ borderBottom: "1px solid #1a1a1a", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, fontSize: 14 }}>🪤</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#e8e8e8", fontFamily: "sans-serif" }}>SpendTrap</span>
        </Link>
        <Link href="/" style={{ background: "#ef4444", color: "#fff", fontSize: 13, padding: "8px 16px", borderRadius: 4, textDecoration: "none", fontFamily: "sans-serif", fontWeight: 600 }}>
          Run Free Audit →
        </Link>
      </nav>
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#ef4444", letterSpacing: "0.2em", marginBottom: 20, textTransform: "uppercase" }}>Subscriptions · 5 min read</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 800, lineHeight: 1.15, color: "#f0f0f0", marginBottom: 24, fontFamily: "sans-serif" }}>
          What Subscriptions Do I Have? How to Find Out in 5 Minutes
        </h1>
        <p style={{ fontSize: 20, color: "#999", lineHeight: 1.6, marginBottom: 40, fontFamily: "sans-serif" }}>
          If you have to ask, you probably have more than you think. Here is every place subscriptions hide — and how to find them all fast.
        </p>
        <div style={{ background: "#111", border: "1px solid #ef444433", borderLeft: "4px solid #ef4444", padding: "20px 24px", borderRadius: 4, marginBottom: 48 }}>
          <p style={{ fontSize: 14, color: "#ef4444", fontFamily: "monospace", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>The Fast Way</p>
          <p style={{ fontSize: 16, color: "#ccc", lineHeight: 1.6, margin: 0, fontFamily: "sans-serif" }}>
            Paste your bank statement into <Link href="/" style={{ color: "#ef4444" }}>SpendTrap</Link> and it finds every subscription automatically. Free preview in 60 seconds.
          </p>
        </div>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Research shows the average American underestimates their monthly subscription spending by nearly 200%. People guess they spend around $80/month. The real number is closer to $220. The gap exists because subscriptions are specifically designed to be forgettable — small charges, confusing merchant names, and annual billing cycles that keep them out of your monthly awareness.
        </p>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 48 }}>
          Here is every place your subscriptions could be hiding, and exactly how to find them.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Check 1: Your Bank Statement
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Your bank statement is the most complete record of every subscription you are paying for — because it shows the actual money leaving your account. Log into your bank online and pull the last 3 months of transactions. Look for anything that repeats at a similar amount each month, and flag any charge you do not immediately recognize.
        </p>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Pay special attention to charges between $5-20 — this is where most forgotten subscriptions live. A $9.99 charge feels too small to investigate but adds up to $120 per year.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Check 2: Your Credit Cards
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Many people use a different card for subscriptions than their main checking account — and then forget to check it. Log into every credit card you own, even ones you rarely use. Subscription companies will keep charging a card on file indefinitely as long as the card is active.
        </p>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          If you have an old card you barely use, check it first — these are the most common sources of completely forgotten subscriptions.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Check 3: Apple Subscriptions
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 16 }}>
          Apple manages subscriptions for every app downloaded from the App Store. This is one of the most overlooked places subscriptions accumulate. To see yours:
        </p>
        {[
          "Open Settings on your iPhone",
          "Tap your name at the top",
          "Tap Subscriptions",
          "You will see every active and recently expired App Store subscription",
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
            <span style={{ color: "#ef4444", fontFamily: "monospace", fontSize: 13, flexShrink: 0, marginTop: 3 }}>{i + 1}.</span>
            <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.6, margin: 0 }}>{step}</p>
          </div>
        ))}
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginTop: 20, marginBottom: 24 }}>
          Common culprits found here: VPN apps, fitness apps, dating apps, meditation apps, photo editing apps, and news apps — many of which start as free trials and auto-renew without a clear reminder.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Check 4: Google Play Subscriptions
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 16 }}>
          Android users have the equivalent in Google Play. To find yours:
        </p>
        {[
          "Open the Google Play Store app",
          "Tap your profile picture in the top right",
          "Tap Payments and subscriptions",
          "Tap Subscriptions",
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
            <span style={{ color: "#ef4444", fontFamily: "monospace", fontSize: 13, flexShrink: 0, marginTop: 3 }}>{i + 1}.</span>
            <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.6, margin: 0 }}>{step}</p>
          </div>
        ))}

        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Check 5: PayPal Active Agreements
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 16 }}>
          If you have ever paid for something with PayPal, there may be active billing agreements you forgot about. To check:
        </p>
        {[
          "Log into paypal.com",
          "Click the Settings gear icon",
          "Click Payments",
          "Click Manage automatic payments",
          "You will see every merchant with an active PayPal billing agreement",
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
            <span style={{ color: "#ef4444", fontFamily: "monospace", fontSize: 13, flexShrink: 0, marginTop: 3 }}>{i + 1}.</span>
            <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.6, margin: 0 }}>{step}</p>
          </div>
        ))}

        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Check 6: Your Email Inbox
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Search your email for these terms — each one will surface subscription receipts you may have forgotten:
        </p>
        {[
          '"your subscription" — surfaces renewal confirmations',
          '"receipt for" — finds payment confirmations from any service',
          '"billing" OR "invoice" — catches business and software subscriptions',
          '"free trial" — finds trials that may have converted to paid',
          '"annual plan" OR "yearly plan" — surfaces once-a-year charges',
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
            <span style={{ color: "#ef4444", fontFamily: "monospace", fontSize: 14, flexShrink: 0 }}>→</span>
            <p style={{ fontSize: 16, color: "#bbb", lineHeight: 1.6, margin: 0, fontFamily: "monospace" }}>{item}</p>
          </div>
        ))}

        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Check 7: Amazon Subscribe and Save
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Amazon has its own subscription layer that many people forget about. Log into Amazon → Account → Subscribe and Save → Manage Your Subscriptions. Physical products — supplements, household items, pet food — often end up here after a single purchase with auto-ship enabled.
        </p>

        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 6, padding: "32px", margin: "48px 0" }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, fontFamily: "sans-serif" }}>What the Average Person Finds</h3>
          {[
            ["2-3 streaming services", "they watch one of regularly"],
            ["1-2 fitness apps or gym memberships", "they have not used in months"],
            ["1 software subscription", "that a free version would replace"],
            ["1 annual charge", "they completely forgot about"],
          ].map(([item, detail], i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
              <span style={{ color: "#ef4444", fontFamily: "monospace", fontSize: 14, flexShrink: 0, marginTop: 2 }}>→</span>
              <p style={{ fontSize: 16, color: "#bbb", lineHeight: 1.6, margin: 0 }}>
                <span style={{ color: "#e8e8e8", fontWeight: 600 }}>{item}</span> {detail}
              </p>
            </div>
          ))}
          <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, margin: "16px 0 0" }}>
            Total discovered: <span style={{ color: "#ef4444", fontWeight: 700 }}>$80-150/month</span> in subscriptions worth cutting or swapping.
          </p>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          The Fastest Way to Check Everything at Once
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Going through all seven checks manually takes 60-90 minutes and requires logging into half a dozen accounts. SpendTrap does the same thing in 60 seconds — paste your bank statement text and it automatically identifies every subscription, flags the ones worth cutting, and calculates exactly how much you are wasting per month.
        </p>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 48 }}>
          The free preview shows your top findings immediately. The full audit — every category, every swap recommendation, and a downloadable PDF — unlocks for $4.99 one-time. No account required. No subscription. No irony.
        </p>

        <div style={{ background: "#0f0f0f", border: "1px solid #ef444433", borderRadius: 8, padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🪤</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 12, fontFamily: "sans-serif" }}>See Every Subscription You Are Paying For</h3>
          <p style={{ fontSize: 16, color: "#999", lineHeight: 1.6, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
            Paste your bank statement and SpendTrap finds every subscription, recurring charge, and hidden fee in 60 seconds.
          </p>
          <Link href="/" style={{ display: "inline-block", background: "#ef4444", color: "#fff", fontSize: 16, fontWeight: 700, padding: "14px 32px", borderRadius: 4, textDecoration: "none", fontFamily: "sans-serif" }}>
            See My Free Preview →
          </Link>
          <p style={{ fontSize: 13, color: "#555", marginTop: 16, fontFamily: "sans-serif" }}>Free preview included. Full audit $4.99 one-time. No subscription.</p>
        </div>
      </article>
      <div style={{ borderTop: "1px solid #141414", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 12, color: "#444", fontFamily: "monospace" }}>🪤 SpendTrap © 2026</span>
        <a href="mailto:partnerships@spendtrap.com" style={{ fontSize: 12, color: "#666", fontFamily: "monospace", textDecoration: "none" }}>partnerships@spendtrap.com</a>
      </div>
    </div>
  );
}
