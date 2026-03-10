import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "27 Subscriptions You Probably Have and Don't Need in 2026 — SpendTrap",
  description: "Most people are paying for 8-12 subscriptions they've forgotten about. Here are 27 common ones draining your account right now — and how to find them all in 60 seconds.",
};

export default function BlogPost() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>
      {/* NAV */}
      <nav style={{ borderBottom: "1px solid #1a1a1a", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, fontSize: 14 }}>🪤</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#e8e8e8", fontFamily: "sans-serif" }}>SpendTrap</span>
        </Link>
        <Link href="/" style={{ background: "#ef4444", color: "#fff", fontSize: 13, padding: "8px 16px", borderRadius: 4, textDecoration: "none", fontFamily: "sans-serif", fontWeight: 600 }}>
          Run Free Audit →
        </Link>
      </nav>

      {/* ARTICLE */}
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>

        {/* CATEGORY */}
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#ef4444", letterSpacing: "0.2em", marginBottom: 20, textTransform: "uppercase" }}>
          Subscriptions · 8 min read
        </div>

        {/* HEADLINE */}
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, color: "#f0f0f0", marginBottom: 24, fontFamily: "sans-serif" }}>
          27 Subscriptions You Probably Have and Don't Need in 2026
        </h1>

        {/* SUBHEADLINE */}
        <p style={{ fontSize: 20, color: "#999", lineHeight: 1.6, marginBottom: 40, fontFamily: "sans-serif" }}>
          The average American pays for 12 subscriptions. They can only name 8. Here's what's hiding in your bank statement.
        </p>

        {/* CALLOUT BOX */}
        <div style={{ background: "#111", border: "1px solid #ef444433", borderLeft: "4px solid #ef4444", padding: "20px 24px", borderRadius: 4, marginBottom: 48 }}>
          <p style={{ fontSize: 14, color: "#ef4444", fontFamily: "monospace", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Quick Audit
          </p>
          <p style={{ fontSize: 16, color: "#ccc", lineHeight: 1.6, margin: 0, fontFamily: "sans-serif" }}>
            Before you read this list, paste your bank statement into <Link href="/" style={{ color: "#ef4444" }}>SpendTrap</Link> for a free preview. It'll show you exactly which of these you're currently paying for — in under 60 seconds.
          </p>
        </div>

        {/* INTRO */}
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          Subscription fatigue is real. Companies have spent billions of dollars perfecting the art of charging you small amounts so frequently that you stop noticing. $9.99 here. $4.99 there. A $14.99 annual charge that hits once a year and disappears into the noise.
        </p>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          The result? Most people are hemorrhaging $100-300 per month on services they either forgot about, stopped using, or never wanted in the first place.
        </p>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 48 }}>
          Here are 27 of the most commonly forgotten subscriptions — check your bank statement for each one.
        </p>

        {/* SECTION 1 */}
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Streaming Services
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          The average household pays for 4.5 streaming services. Most only watch 2 regularly.
        </p>

        {[
          ["1. Netflix", "$7–23/mo", "Did you downgrade to the ad-supported tier or are you still on premium?"],
          ["2. Hulu", "$8–18/mo", "Often forgotten because it auto-renewed from a free trial years ago."],
          ["3. Disney+", "$8–14/mo", "Bundled with ESPN+ and Hulu — you might be paying for all three."],
          ["4. HBO Max / Max", "$10–16/mo", "Renamed twice. Check for both 'HBO' and 'Max' in your statement."],
          ["5. Peacock", "$6–14/mo", "Signed up for one show and never cancelled."],
          ["6. Paramount+", "$6–12/mo", "Often bundled with Walmart+ or Showtime."],
          ["7. Apple TV+", "$10/mo", "Came free with your iPhone for a year. Now charging."],
        ].map(([name, price, note]) => (
          <div key={name} style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#e8e8e8", fontFamily: "sans-serif" }}>{name}</span>
              <span style={{ fontSize: 14, color: "#ef4444", fontFamily: "monospace" }}>{price}</span>
            </div>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.6, margin: 0 }}>{note}</p>
          </div>
        ))}

        {/* SECTION 2 */}
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Music & Audio
        </h2>

        {[
          ["8. Spotify", "$11–16/mo", "Free tier exists. If you're paying, are you using it daily?"],
          ["9. Apple Music", "$11/mo", "Easy to forget if you're also paying for Spotify."],
          ["10. Audible", "$15/mo", "Credits roll over — you might have 12 unused audiobook credits sitting there."],
          ["11. SiriusXM", "$9–22/mo", "Often signed up for a car trial. Notoriously hard to cancel."],
          ["12. YouTube Music / Premium", "$14/mo", "Premium removes ads on YouTube AND includes YouTube Music. Double-check what you're getting."],
        ].map(([name, price, note]) => (
          <div key={name} style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#e8e8e8", fontFamily: "sans-serif" }}>{name}</span>
              <span style={{ fontSize: 14, color: "#ef4444", fontFamily: "monospace" }}>{price}</span>
            </div>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.6, margin: 0 }}>{note}</p>
          </div>
        ))}

        {/* SECTION 3 */}
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Fitness & Wellness
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          The fitness industry is built on people paying and not showing up. Don't be that person.
        </p>

        {[
          ["13. Gym Membership", "$30–80/mo", "The #1 most common forgotten subscription. Check for both the main fee and any 'annual' maintenance charges."],
          ["14. Peloton", "$44/mo", "The app subscription continues even if you don't have the bike."],
          ["15. Calm or Headspace", "$70/yr", "Signed up during a stressful period. Still charging annually."],
          ["16. Noom or Weight Loss Apps", "$60–70/mo", "Often sign up with aggressive discounting, then auto-renew at full price."],
          ["17. ClassPass", "$29–79/mo", "Credits expire monthly. If you're not using them, you're burning cash."],
        ].map(([name, price, note]) => (
          <div key={name} style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#e8e8e8", fontFamily: "sans-serif" }}>{name}</span>
              <span style={{ fontSize: 14, color: "#ef4444", fontFamily: "monospace" }}>{price}</span>
            </div>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.6, margin: 0 }}>{note}</p>
          </div>
        ))}

        {/* SECTION 4 */}
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          Software & Productivity
        </h2>

        {[
          ["18. Adobe Creative Cloud", "$55–85/mo", "One of the most expensive forgotten subscriptions. Check for both personal and old student plans."],
          ["19. Microsoft 365", "$10/mo", "Often overlaps with a free version included with your PC or employer."],
          ["20. Dropbox", "$10–20/mo", "Google Drive or iCloud often makes this redundant."],
          ["21. Grammarly Premium", "$12–30/mo", "The free tier works for most people."],
          ["22. Password Manager", "$3–36/mo", "1Password, LastPass, Dashlane — free options exist for basic use."],
        ].map(([name, price, note]) => (
          <div key={name} style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#e8e8e8", fontFamily: "sans-serif" }}>{name}</span>
              <span style={{ fontSize: 14, color: "#ef4444", fontFamily: "monospace" }}>{price}</span>
            </div>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.6, margin: 0 }}>{note}</p>
          </div>
        ))}

        {/* SECTION 5 */}
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          News, Learning & Miscellaneous
        </h2>

        {[
          ["23. New York Times / WSJ", "$17–40/mo", "Signed up for election coverage. Still subscribed."],
          ["24. LinkedIn Premium", "$40–60/mo", "Free trial that auto-renewed. Rarely worth the cost for most users."],
          ["25. Duolingo Plus", "$7–13/mo", "The free tier is nearly identical."],
          ["26. Amazon Prime", "$14.99/mo or $139/yr", "Worth it for heavy shoppers — but check if you have both a personal AND a household account."],
          ["27. iCloud+ Storage", "$1–10/mo", "Often upgraded during a storage panic and never downgraded."],
        ].map(([name, price, note]) => (
          <div key={name} style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#e8e8e8", fontFamily: "sans-serif" }}>{name}</span>
              <span style={{ fontSize: 14, color: "#ef4444", fontFamily: "monospace" }}>{price}</span>
            </div>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.6, margin: 0 }}>{note}</p>
          </div>
        ))}

        {/* THE MATH */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 6, padding: "32px", margin: "48px 0" }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, fontFamily: "sans-serif" }}>The Math Is Brutal</h3>
          <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 16 }}>
            If you're paying for just 6 of the items on this list — say Netflix, a gym you rarely visit, Spotify, Adobe, Audible, and LinkedIn Premium — you're spending over <span style={{ color: "#ef4444", fontWeight: 700 }}>$200/month</span> on subscriptions alone. That's <span style={{ color: "#ef4444", fontWeight: 700 }}>$2,400/year</span>.
          </p>
          <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, margin: 0 }}>
            Most people can cut that in half with one hour of work. The problem isn't knowing they should — it's knowing exactly what they're paying for.
          </p>
        </div>

        {/* HOW TO FIND THEM */}
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 16, marginTop: 48, fontFamily: "sans-serif" }}>
          How to Find Every Subscription on Your Bank Statement
        </h2>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          There are two ways to do this:
        </p>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 24 }}>
          <strong style={{ color: "#e8e8e8" }}>Option 1 — Manual (1-2 hours):</strong> Log into your bank, download 3 months of statements, open a spreadsheet, and sort by merchant name. Look for anything recurring. Flag charges under $20 that appear monthly — these are the easiest to miss.
        </p>
        <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.8, marginBottom: 48 }}>
          <strong style={{ color: "#e8e8e8" }}>Option 2 — Automated (60 seconds):</strong> Paste your bank statement text into SpendTrap. It reads every charge, identifies recurring patterns, calculates your monthly waste score, and tells you exactly what to cut, keep, or swap.
        </p>

        {/* CTA BOX */}
        <div style={{ background: "#0f0f0f", border: "1px solid #ef444433", borderRadius: 8, padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🪤</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 12, fontFamily: "sans-serif" }}>
            Find Out What's Draining Your Account
          </h3>
          <p style={{ fontSize: 16, color: "#999", lineHeight: 1.6, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
            Paste your bank statement and SpendTrap will identify every subscription, flag the ones worth cutting, and calculate exactly how much you're wasting per month.
          </p>
          <Link href="/" style={{ display: "inline-block", background: "#ef4444", color: "#fff", fontSize: 16, fontWeight: 700, padding: "14px 32px", borderRadius: 4, textDecoration: "none", fontFamily: "sans-serif" }}>
            See My Free Preview →
          </Link>
          <p style={{ fontSize: 13, color: "#555", marginTop: 16, fontFamily: "sans-serif" }}>Free preview included. Full audit $4.99 one-time. No subscription.</p>
        </div>


        <div style={{ borderTop: "1px solid #1a1a1a", marginTop: 64, paddingTop: 40 }}>
          <p style={{ fontSize: 11, color: "#ef4444", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Related Articles</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Link href="/blog/how-to-find-hidden-subscriptions" style={{ display: "block", background: "#111", border: "1px solid #1a1a1a", borderRadius: 6, padding: "16px 20px", textDecoration: "none", color: "#ccc", fontSize: 15, fontFamily: "sans-serif" }}>→ How to Find Hidden Subscriptions on Your Bank Statement</Link>
            <Link href="/blog/what-subscriptions-do-i-have" style={{ display: "block", background: "#111", border: "1px solid #1a1a1a", borderRadius: 6, padding: "16px 20px", textDecoration: "none", color: "#ccc", fontSize: 15, fontFamily: "sans-serif" }}>→ What Subscriptions Do I Have? How to Find Out in 5 Minutes</Link>
          </div>
        </div>
      </article>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #141414", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 12, color: "#444", fontFamily: "monospace" }}>🪤 SpendTrap © 2026</span>
        <a href="mailto:partnerships@spendtrap.com" style={{ fontSize: 12, color: "#666", fontFamily: "monospace", textDecoration: "none" }}>partnerships@spendtrap.com</a>
      </div>
    </div>
  );
}
