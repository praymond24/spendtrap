import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Find Hidden Subscriptions on Your Bank Statement — SpendTrap",
  description: "Most people have 3-5 subscriptions they've completely forgotten about. Here's exactly how to find every hidden charge in under 5 minutes.",
    metadataBase: new URL("https://spendtrap.com"),
  openGraph: {
    title: "How to Find Hidden Subscriptions on Your Bank Statement",
    description: "Most people have 3-5 subscriptions they've completely forgotten about. Here's exactly how to find every hidden charge in under 5 minutes.",
    url: "https://spendtrap.com/blog/how-to-find-hidden-subscriptions",
    siteName: "SpendTrap",
    type: "article",
    publishedTime: "2026-03-10T00:00:00Z",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Find Hidden Subscriptions on Your Bank Statement",
    description: "Most people have 3-5 subscriptions they've completely forgotten about. Here's exactly how to find every hidden charge in under 5 minutes.",
  },
};

export default function BlogPost() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "How to Find Hidden Subscriptions on Your Bank Statement",
          "description": "Most people have 3-5 subscriptions they've completely forgotten about. Here's exactly how to find every hidden charge in under 5 minutes.",
          "datePublished": "2026-03-10T00:00:00Z",
          "author": { "@type": "Organization", "name": "SpendTrap" },
          "publisher": { "@type": "Organization", "name": "SpendTrap", "url": "https://spendtrap.com" }
        }) } } />
      <nav style={{ borderBottom: "1px solid #1a1a1a", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, fontSize: 14 }}>🪤</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#e8e8e8", fontFamily: "sans-serif" }}>SpendTrap</span>
        </Link>
        <Link href="/" style={{ background: "#ef4444", color: "#fff", fontSize: 13, padding: "8px 16px", borderRadius: 4, textDecoration: "none", fontFamily: "sans-serif", fontWeight: 600 }}>
          Run Free Audit →
        </Link>
      </nav>
      </>
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#ef4444", letterSpacing: "0.2em", marginBottom: 20, textTransform: "uppercase" }}>Bank Statements · 6 min read</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 800, lineHeight: 1.15, color: "#f0f0f0", marginBottom: 24, fontFamily: "sans-serif" }}>
          How to Find Hidden Subscriptions on Your Bank Statement
        </h1>
        <p style={{ fontSize: 20, color: "#999", lineHeight: 1.6, marginBottom: 40, fontFamily: "sans-serif" }}>
          The average person has 3-5 subscriptions they have completely forgotten about. Here is how to find every single one in under 5 minutes.
        </p>
        <div style={{ background: "#111", border: "1px solid #ef444433", borderLeft: "4px solid #ef4444", padding: "20px 24px", borderRadius: 4, marginBottom: 48 }}>
          <p style={{ fontSize: 14, color: "#ef4444", fontFamily: "monospace", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Skip the Manual Work</p>
          <p style={{ fontSize: 16, color: "#ccc", lineHeight: 1.6, margin: 0, fontFamily: "sans-serif" }}>
            <Link href="/" style={{ color: "#ef4444" }}>SpendTrap</Link> reads your bank statement automatically and finds every hidden subscription in 60 seconds. Free preview included.
          </p>
        </div>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Subscription companies are experts at staying invisible. They charge small amounts. They use obscure merchant names. They bill annually so you only see the charge once a year. They bank on the fact that you will not notice $9.99 disappearing each month — and they are usually right.
        </p>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 48 }}>
          But finding them is not hard once you know what to look for. Here is the exact method to audit your bank statement and surface every charge that should not be there.
        </p>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>Step 1: Pull 3 Months of Statements</h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          One month is not enough. Annual subscriptions only appear once a year, and some quarterly charges will slip through on a 30-day view. Pull at least 3 months from every account you use for purchases — checking, every credit card, PayPal, and any secondary accounts.
        </p>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>Step 2: Sort by Merchant Name, Not Date</h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Most people browse statements chronologically and miss recurring charges because they are separated by weeks of other transactions. Sort alphabetically by merchant name instead — this groups all charges from the same company together and makes patterns instantly visible.
        </p>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>Step 3: Flag These Specific Patterns</h2>
        {[
          ["Charges under $20 that repeat monthly", "This is the sweet spot for subscription companies. Small enough to ignore, large enough to add up. $7.99, $9.99, $12.99, $14.99 — flag every single one."],
          ["Charges with unusual merchant names", "Subscriptions rarely appear with the brand name you recognize. Watch for asterisks, .COM suffixes, and unfamiliar abbreviations."],
          ["Round-number charges that appear once", "Annual subscriptions — $99, $120, $149 — appear once per year and are easy to miss on a 30-day view."],
          ["Duplicate charges from similar merchants", "Two charges from similar names often mean you have two accounts or a trial that converted while you still had the original plan."],
        ].map(([title, desc], i) => (
          <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#f0f0f0", marginBottom: 8, fontFamily: "sans-serif" }}>{i + 1}. {title}</p>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.6, margin: 0 }}>{desc}</p>
          </div>
        ))}
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>Step 4: Google Every Merchant You Do Not Recognize</h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Do not skip unfamiliar merchant names — these are exactly where forgotten subscriptions hide. Search the merchant name plus amount on Google. Common ones to know:
        </p>
        {["AMZN MKTP → Amazon purchase or Prime", "APPLE.COM/BILL → Apple subscription (iCloud, Apple TV+, apps)", "GOOGLE *[NAME] → Google One, YouTube Premium, app subscription", "PAYPAL *[NAME] → PayPal subscription to that service"].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
            <span style={{ color: "#ef4444", fontFamily: "monospace", fontSize: 14, flexShrink: 0 }}>→</span>
            <p style={{ fontSize: 16, color: "#bbb", lineHeight: 1.6, margin: 0, fontFamily: "monospace" }}>{item}</p>
          </div>
        ))}
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>Step 5: Make a Cut / Keep / Investigate List</h2>
        {[["Cut", "#ef4444", "Services you have not used in 30+ days. Cancel today."], ["Keep", "#22c55e", "Services you use regularly and get clear value from."], ["Investigate", "#eab308", "Services you are unsure about. Check your last login date before deciding."]].map(([label, color, desc]) => (
          <div key={label} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
            <span style={{ background: color + "22", color, fontFamily: "monospace", fontSize: 12, padding: "4px 10px", borderRadius: 3, flexShrink: 0, border: `1px solid ${color}44` }}>{label}</span>
            <p style={{ fontSize: 16, color: "#bbb", lineHeight: 1.6, margin: 0 }}>{desc}</p>
          </div>
        ))}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 6, padding: "32px", margin: "48px 0" }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, fontFamily: "sans-serif" }}>How Long Does This Take?</h3>
          <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 16 }}>
            Done manually, this process takes <span style={{ color: "#ef4444", fontWeight: 700 }}>60-90 minutes</span> for 3 months of statements. The average person who completes it finds <span style={{ color: "#ef4444", fontWeight: 700 }}>$80-150/month</span> in charges worth cutting — that is $1,000-1,800 per year.
          </p>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>The Faster Way</h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 48 }}>
          Paste your bank statement into SpendTrap and it does all five steps automatically — identifying every subscription, flagging duplicates, calculating your monthly waste, and giving you a Waste Score from 0-100. Free preview. Full audit $4.99 one-time. No account required.
        </p>
        <div style={{ background: "#0f0f0f", border: "1px solid #ef444433", borderRadius: 8, padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🪤</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 12, fontFamily: "sans-serif" }}>Find Every Hidden Subscription in 60 Seconds</h3>
          <p style={{ fontSize: 16, color: "#999", lineHeight: 1.6, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
            Paste your bank statement and SpendTrap identifies every subscription, recurring charge, and hidden fee automatically.
          </p>
          <Link href="/" style={{ display: "inline-block", background: "#ef4444", color: "#fff", fontSize: 16, fontWeight: 700, padding: "14px 32px", borderRadius: 4, textDecoration: "none", fontFamily: "sans-serif" }}>
            See My Free Preview →
          </Link>
          <p style={{ fontSize: 13, color: "#555", marginTop: 16, fontFamily: "sans-serif" }}>Free preview included. Full audit $4.99 one-time. No subscription.</p>
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a", marginTop: 64, paddingTop: 40 }}>
          <p style={{ fontSize: 11, color: "#ef4444", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Related Articles</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Link href="/blog/27-subscriptions-you-dont-need" style={{ display: "block", background: "#111", border: "1px solid #1a1a1a", borderRadius: 6, padding: "16px 20px", textDecoration: "none", color: "#ccc", fontSize: 15, fontFamily: "sans-serif" }}>→ 27 Subscriptions You Don't Need (But Probably Have)</Link>
            <Link href="/blog/what-subscriptions-do-i-have" style={{ display: "block", background: "#111", border: "1px solid #1a1a1a", borderRadius: 6, padding: "16px 20px", textDecoration: "none", color: "#ccc", fontSize: 15, fontFamily: "sans-serif" }}>→ What Subscriptions Do I Have? How to Find Out in 5 Minutes</Link>
          </div>
        </div>
      </article>
      <div style={{ borderTop: "1px solid #141414", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 12, color: "#444", fontFamily: "monospace" }}>🪤 SpendTrap © 2026</span>
        <a href="mailto:partnerships@spendtrap.com" style={{ fontSize: 12, color: "#666", fontFamily: "monospace", textDecoration: "none" }}>partnerships@spendtrap.com</a>
      </div>
    </div>
  );
}
