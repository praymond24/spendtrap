import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — SpendTrap",
  description: "Tips, guides, and tools to help you stop wasting money on forgotten subscriptions and hidden charges.",
};

const posts = [
  {
    slug: "what-subscriptions-do-i-have",
    title: "What Subscriptions Do I Have? How to Find Out in 5 Minutes",
    description: "Can not remember what subscriptions you are paying for? Here is every place they hide — and how to find them all fast.",
    date: "March 10, 2026",
    readTime: "5 min read",
    category: "Subscriptions",
  },
  {
    slug: "how-to-find-hidden-subscriptions",
    title: "How to Find Hidden Subscriptions on Your Bank Statement",
    description: "Most people have 3-5 subscriptions they've completely forgotten about. Here's exactly how to find every hidden charge — in under 5 minutes.",
    date: "March 10, 2026",
    readTime: "6 min read",
    category: "Bank Statements",
  },
  {
    slug: "27-subscriptions-you-dont-need",
    title: "27 Subscriptions You Probably Have and Don't Need in 2026",
    description: "The average American pays for 12 subscriptions but can only name 8. Here's what's hiding in your bank statement.",
    date: "March 9, 2026",
    readTime: "8 min read",
    category: "Subscriptions",
  },
];

export default function Blog() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <nav style={{ borderBottom: "1px solid #1a1a1a", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, fontSize: 14 }}>🪤</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#e8e8e8" }}>SpendTrap</span>
        </Link>
        <Link href="/" style={{ background: "#ef4444", color: "#fff", fontSize: 13, padding: "8px 16px", borderRadius: 4, textDecoration: "none", fontWeight: 600 }}>
          Run Free Audit →
        </Link>
      </nav>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#ef4444", letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>The SpendTrap Blog</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: "#f0f0f0", marginBottom: 12 }}>Money Insights</h1>
        <p style={{ fontSize: 17, color: "#666", marginBottom: 56 }}>Guides to help you find and cut the hidden costs draining your account.</p>

        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
            <div style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: 40, marginBottom: 40 }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em" }}>{post.category}</span>
                <span style={{ fontSize: 11, color: "#333" }}>·</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#444" }}>{post.readTime}</span>
                <span style={{ fontSize: 11, color: "#333" }}>·</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#444" }}>{post.date}</span>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f0f0f0", marginBottom: 12, lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ fontSize: 16, color: "#888", lineHeight: 1.6, marginBottom: 16 }}>{post.description}</p>
              <span style={{ fontSize: 14, color: "#ef4444", fontWeight: 600 }}>Read article →</span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #141414", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#444", fontFamily: "monospace" }}>🪤 SpendTrap © 2026</span>
        <a href="mailto:partnerships@spendtrap.com" style={{ fontSize: 12, color: "#666", fontFamily: "monospace", textDecoration: "none" }}>partnerships@spendtrap.com</a>
      </div>
    </div>
  );
}
