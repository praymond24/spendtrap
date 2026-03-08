import { useState, useEffect, useRef, useCallback } from "react";

// ─── STRIPE ──────────────────────────────────────────────────────────────────
// 1. Go to dashboard.stripe.com → Payment Links → Create Link → $4.99 one-time
// 2. Paste your link here. That's it. No backend needed.
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/14A3cx98s57FbUudXCbII00";

// ─── PDF GENERATOR ───────────────────────────────────────────────────────────
function generatePDF(result) {
  const gradeColors = { A: "#22c55e", B: "#84cc16", C: "#eab308", D: "#f97316", F: "#ef4444" };
  const gradeLabels = { A: "Squeaky Clean", B: "Not Bad", C: "Room to Grow", D: "Bleeding Out", F: "Financial Chaos" };
  const color = gradeColors[result.grade] || "#ef4444";
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const categoryRows = (result.categories || []).flatMap(cat =>
    (cat.items || []).map(item => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#1a1a1a;">${cat.name}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#1a1a1a;">${item.name}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;font-family:monospace;">$${item.amount?.toFixed(2)}/mo</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;text-align:center;">
          <span style="background:${item.verdict === "cut" ? "#fef2f2" : item.verdict === "swap" ? "#fff7ed" : "#f0fdf4"};color:${item.verdict === "cut" ? "#dc2626" : item.verdict === "swap" ? "#ea580c" : "#16a34a"};padding:2px 8px;border-radius:3px;font-size:10px;font-weight:700;font-family:monospace;letter-spacing:0.1em;">${item.verdict.toUpperCase()}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:12px;color:#666;">${item.reason}</td>
      </tr>`)
  ).join("");

  const swapRows = (result.swaps || []).map(swap => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#dc2626;text-decoration:line-through;">${swap.from}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#16a34a;font-weight:600;">${swap.to}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;font-family:monospace;color:#16a34a;">$${swap.annualSavings?.toFixed(0)}/yr</td>
    </tr>`
  ).join("");

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>SpendTrap Audit Report</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Syne', sans-serif; background: #fff; color: #1a1a1a; padding: 48px; max-width: 800px; margin: 0 auto; }
    @media print {
      body { padding: 24px; }
      .no-print { display: none !important; }
      @page { margin: 0.75in; }
    }
  </style>
</head>
<body>

  <!-- Download button (hidden when printing) -->
  <div class="no-print" style="text-align:right;margin-bottom:24px;">
    <button onclick="window.print()" style="background:#ef4444;color:#fff;border:none;padding:10px 24px;border-radius:6px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;">
      ⬇ Save as PDF
    </button>
  </div>

  <!-- Header -->
  <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:24px;border-bottom:2px solid #1a1a1a;margin-bottom:36px;">
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:36px;height:36px;background:#ef4444;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;">🪤</div>
      <div>
        <div style="font-size:20px;font-weight:900;letter-spacing:-0.02em;">SpendTrap</div>
        <div style="font-size:11px;color:#999;font-family:monospace;letter-spacing:0.1em;">FINANCIAL WASTE AUDIT</div>
      </div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:11px;color:#999;font-family:monospace;">REPORT DATE</div>
      <div style="font-size:13px;font-weight:700;">${date}</div>
    </div>
  </div>

  <!-- Score Hero -->
  <div style="background:#0a0a0a;border-radius:12px;padding:36px;margin-bottom:32px;display:flex;align-items:center;gap:40px;">
    <div style="text-align:center;flex-shrink:0;">
      <div style="font-size:72px;font-weight:900;color:${color};font-family:'Space Mono',monospace;line-height:1;">${result.wasteScore}</div>
      <div style="font-size:11px;color:#666;font-family:monospace;letter-spacing:0.15em;margin-top:4px;">WASTE SCORE / 100</div>
    </div>
    <div>
      <div style="display:inline-block;background:${color}22;color:${color};font-family:monospace;font-size:12px;letter-spacing:0.15em;padding:4px 12px;border-radius:4px;margin-bottom:12px;">GRADE ${result.grade} — ${gradeLabels[result.grade] || ""}</div>
      <div style="font-size:20px;font-weight:700;color:#fff;margin-bottom:8px;">"${result.headline}"</div>
      ${result.topInsight ? `<div style="font-size:13px;color:#888;line-height:1.6;">${result.topInsight}</div>` : ""}
    </div>
  </div>

  <!-- Stats Row -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
    <div style="border:1px solid #e5e5e5;border-radius:8px;padding:20px;">
      <div style="font-size:10px;color:#999;font-family:monospace;letter-spacing:0.1em;margin-bottom:6px;">MONTHLY WASTE</div>
      <div style="font-size:36px;font-weight:900;color:#ef4444;font-family:'Space Mono',monospace;">$${Math.round(result.totalMonthlyWaste).toLocaleString()}</div>
    </div>
    <div style="border:1px solid #e5e5e5;border-radius:8px;padding:20px;">
      <div style="font-size:10px;color:#999;font-family:monospace;letter-spacing:0.1em;margin-bottom:6px;">ANNUAL WASTE</div>
      <div style="font-size:36px;font-weight:900;color:#f97316;font-family:'Space Mono',monospace;">$${Math.round(result.totalAnnualWaste).toLocaleString()}</div>
    </div>
  </div>

  <!-- Full Breakdown Table -->
  ${categoryRows ? `
  <div style="margin-bottom:32px;">
    <div style="font-size:11px;color:#999;font-family:monospace;letter-spacing:0.15em;margin-bottom:14px;">FULL TRANSACTION BREAKDOWN</div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
      <thead>
        <tr style="background:#f9f9f9;">
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#999;font-family:monospace;letter-spacing:0.08em;border-bottom:1px solid #e5e5e5;">CATEGORY</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#999;font-family:monospace;letter-spacing:0.08em;border-bottom:1px solid #e5e5e5;">SERVICE</th>
          <th style="padding:10px 12px;text-align:right;font-size:11px;color:#999;font-family:monospace;letter-spacing:0.08em;border-bottom:1px solid #e5e5e5;">COST</th>
          <th style="padding:10px 12px;text-align:center;font-size:11px;color:#999;font-family:monospace;letter-spacing:0.08em;border-bottom:1px solid #e5e5e5;">VERDICT</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#999;font-family:monospace;letter-spacing:0.08em;border-bottom:1px solid #e5e5e5;">REASON</th>
        </tr>
      </thead>
      <tbody>${categoryRows}</tbody>
    </table>
  </div>` : ""}

  <!-- Swap Recommendations -->
  ${swapRows ? `
  <div style="margin-bottom:32px;">
    <div style="font-size:11px;color:#999;font-family:monospace;letter-spacing:0.15em;margin-bottom:14px;">RECOMMENDED SWAPS</div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
      <thead>
        <tr style="background:#f9f9f9;">
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#999;font-family:monospace;border-bottom:1px solid #e5e5e5;">CANCEL / REDUCE</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#999;font-family:monospace;border-bottom:1px solid #e5e5e5;">SWITCH TO</th>
          <th style="padding:10px 12px;text-align:right;font-size:11px;color:#999;font-family:monospace;border-bottom:1px solid #e5e5e5;">ANNUAL SAVINGS</th>
        </tr>
      </thead>
      <tbody>${swapRows}</tbody>
    </table>
  </div>` : ""}

  <!-- Footer -->
  <div style="border-top:1px solid #e5e5e5;padding-top:20px;display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:11px;color:#bbb;font-family:monospace;">Generated by SpendTrap · spendtrap.com</div>
    <div style="font-size:11px;color:#bbb;font-family:monospace;">For personal use only</div>
  </div>

</body>
</html>`;

  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    win.document.close();
  } else {
    alert("Pop-up blocked! Please allow pop-ups for this site and try again.");
  }
}

const SYSTEM_PROMPT = `You are SpendTrap, a sharp financial waste detector. A user will provide their bank or credit card statement — either as pasted text or as an uploaded file (PDF or image). Your job is to analyze it and return ONLY a valid JSON object — no markdown, no preamble, no explanation outside the JSON.

Analyze the transactions and identify:
1. Recurring subscriptions (monthly/annual services)
2. Duplicate or redundant services
3. Wasteful or forgotten charges
4. High-frequency small purchases that add up

Return this exact JSON structure:
{
  "wasteScore": <integer 0-100, where 0 = perfect, 100 = maximum waste>,
  "totalMonthlyWaste": <number, estimated monthly dollars being wasted>,
  "totalAnnualWaste": <number, totalMonthlyWaste * 12>,
  "grade": <"A", "B", "C", "D", or "F">,
  "headline": <string, one sharp diagnostic sentence about their spending, max 12 words — factual and direct, never insulting>,
  "categories": [
    {
      "name": <string, category name like "Streaming", "Fitness", "Food Apps">,
      "monthlyTotal": <number>,
      "items": [
        {
          "name": <string, service/merchant name>,
          "amount": <number, monthly cost>,
          "verdict": <"keep" | "cut" | "swap">,
          "reason": <string, 1 sentence direct reason — specific and factual, not personal>
        }
      ]
    }
  ],
  "swaps": [
    {
      "from": <string, what they have>,
      "to": <string, better alternative>,
      "monthlySavings": <number>,
      "annualSavings": <number>,
      "action": <string, short CTA like "Switch Now" or "Cancel Today">
    }
  ],
  "topInsight": <string, one high-signal insight about their spending pattern, max 20 words — specific and factual>
}

Be direct and specific. Focus on what the data shows, not character judgments. If the input is too vague or not a bank statement, return:
{"error": "Please paste actual transaction data or upload a bank statement — merchant names and amounts work best."}`;

const gradeColors = { A: "#22c55e", B: "#84cc16", C: "#eab308", D: "#f97316", F: "#ef4444" };
const gradeLabels = { A: "Squeaky Clean", B: "Not Bad", C: "Room to Grow", D: "Bleeding Cash", F: "Financial Chaos" };

const ACCEPTED_TYPES = {
  "application/pdf": { label: "PDF", icon: "📄" },
  "image/png": { label: "PNG", icon: "🖼️" },
  "image/jpeg": { label: "JPG", icon: "🖼️" },
  "image/jpg": { label: "JPG", icon: "🖼️" },
  "image/webp": { label: "WEBP", icon: "🖼️" },
};

// Affiliate + action URL map — swap these for your real affiliate links when ready
const AFFILIATE_URLS = {
  "netflix": "https://www.netflix.com/cancelplan",
  "hulu": "https://help.hulu.com/s/article/cancel-subscription",
  "disney": "https://www.disneyplus.com/account/subscription",
  "hbo": "https://www.max.com/account/subscription",
  "max": "https://www.max.com/account/subscription",
  "peacock": "https://www.peacocktv.com/account",
  "espn": "https://plus.espn.com/account/profile",
  "youtube premium": "https://www.youtube.com/paid_memberships",
  "spotify": "https://www.spotify.com/account/subscription/cancel",
  "apple music": "https://support.apple.com/en-us/108904",
  "peloton": "https://www.onepeloton.com/profile/subscriptions",
  "calm": "https://support.calm.com/hc/en-us/articles/360001470507",
  "headspace": "https://www.headspace.com/account",
  "optimum": "https://www.optimum.net/account",
  "xfinity": "https://www.xfinity.com/support/articles/downgrade-service",
  "spectrum": "https://www.spectrum.net/account",
  "ally": "https://www.ally.com/bank/online-savings-account/",
  "capital one 360": "https://www.capitalone.com/bank/checking-accounts/online-checking-account/",
  "chime": "https://www.chime.com/open-bank-account/",
  "bofa": "https://www.bankofamerica.com/deposits/checking/",
  "bank of america": "https://www.bankofamerica.com/deposits/checking/",
  "google workspace": "https://workspace.google.com/pricing",
  "microsoft 365": "https://account.microsoft.com/services",
  "dropbox": "https://www.dropbox.com/account/plan",
  "adobe": "https://account.adobe.com/plans",
  "draftkings": "https://www.draftkings.com/account/deposit-and-withdrawal",
  "fanduel": "https://www.fanduel.com/responsible-gaming",
  // These are your affiliate links — replace with your actual tracking URLs
  "mint mobile": "https://www.mintmobile.com/?utm_source=spendtrap",
  "visible": "https://www.visible.com/?utm_source=spendtrap",
  "rocket money": "https://www.rocketmoney.com/?utm_source=spendtrap",
  "trim": "https://www.asktrim.com/?utm_source=spendtrap",
  "copilot": "https://copilot.money/?utm_source=spendtrap",
};

function getSwapUrl(swap) {
  const searchIn = ((swap.to || "") + " " + (swap.from || "")).toLowerCase();
  const key = Object.keys(AFFILIATE_URLS).find(k => searchIn.includes(k));
  if (key) return AFFILIATE_URLS[key];
  return `https://www.google.com/search?q=${encodeURIComponent((swap.to || "cheaper alternative") + " sign up")}`;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function ScoreRing({ score, grade }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = ((100 - score) / 100) * circumference;
  const color = gradeColors[grade] || "#ef4444";
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 100); }, []);
  return (
    <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto" }}>
      <svg width="180" height="180" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#1a1a1a" strokeWidth="12" />
        <circle cx="90" cy="90" r={radius} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? strokeDash : circumference}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)" }} />
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <div style={{ fontSize: 42, fontWeight: 900, color, fontFamily: "'Space Mono', monospace", lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.15em", marginTop: 4, fontFamily: "monospace" }}>WASTE SCORE</div>
      </div>
    </div>
  );
}

function CountUp({ target, prefix = "$", duration = 1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const steps = 40;
    const step = target / steps;
    let current = 0, count = 0;
    const interval = setInterval(() => {
      count++;
      current = Math.min(current + step, target);
      setVal(Math.round(current));
      if (count >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target]);
  return <span>{prefix}{val.toLocaleString()}</span>;
}

function VerdictBadge({ verdict }) {
  const styles = {
    keep: { bg: "#0f2d1a", color: "#22c55e", label: "KEEP" },
    cut: { bg: "#2d0f0f", color: "#ef4444", label: "CUT" },
    swap: { bg: "#2d1f0f", color: "#f97316", label: "SWAP" },
  };
  const s = styles[verdict] || styles.keep;
  return (
    <span style={{
      background: s.bg, color: s.color, fontSize: 9, fontWeight: 700,
      letterSpacing: "0.12em", padding: "3px 7px", borderRadius: 3,
      fontFamily: "monospace", border: `1px solid ${s.color}22`
    }}>{s.label}</span>
  );
}

export default function SpendTrap() {
  const [screen, setScreen] = useState("home");
  const [tab, setTab] = useState("paste");
  const [input, setInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("Scanning transactions...");
  const [shareFlash, setShareFlash] = useState(false);
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [awaitingReturn, setAwaitingReturn] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Auto-verify Stripe payment on redirect return and restore saved results
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session");
    if (sessionId) {
      setVerifying(true);
      // Restore saved audit result
      const saved = localStorage.getItem("spendtrap_result");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setResult(parsed);
          setScreen("results");
        } catch {}
      }
      // Verify payment with Stripe
      fetch(`/api/verify?session=${sessionId}`)
        .then(r => r.json())
        .then(data => {
          if (data.paid) {
            setReportUnlocked(true);
            localStorage.removeItem("spendtrap_result");
          }
          setVerifying(false);
          window.history.replaceState({}, "", window.location.pathname);
        })
        .catch(() => setVerifying(false));
    }
  }, []);
  const fileInputRef = useRef(null);

  const loadingMessages = [
    "Scanning transactions...",
    "Identifying subscriptions...",
    "Calculating your waste...",
    "Preparing your verdict...",
  ];

  const canSubmit = tab === "paste" ? input.trim().length >= 30 : !!uploadedFile;

  async function handleFile(file) {
    if (!file) return;
    if (!ACCEPTED_TYPES[file.type]) {
      setErrorMsg("Please upload a PDF or image file (PNG, JPG, WEBP).");
      setScreen("error");
      return;
    }
    try {
      const base64 = await fileToBase64(file);
      setUploadedFile({ base64, type: file.type, name: file.name, size: file.size });
    } catch {
      setErrorMsg("Couldn't read that file. Try a different one.");
      setScreen("error");
    }
  }

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const onDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const onDragLeave = useCallback(() => setIsDragging(false), []);

  async function analyze() {
    if (!canSubmit) return;
    setScreen("loading");

    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[msgIdx]);
    }, 1800);

    try {
      let userContent;

      if (tab === "paste") {
        userContent = input;
      } else {
        const isPDF = uploadedFile.type === "application/pdf";
        userContent = [
          isPDF
            ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: uploadedFile.base64 } }
            : { type: "image", source: { type: "base64", media_type: uploadedFile.type, data: uploadedFile.base64 } },
          { type: "text", text: "This is my bank or credit card statement. Please analyze it and return the SpendTrap JSON audit." }
        ];
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userContent }],
        }),
      });

      const data = await response.json();
      clearInterval(msgInterval);

      // API-level error (auth, rate limit, etc.)
      if (data.error) {
        setErrorMsg(`API error: ${data.error.message || JSON.stringify(data.error)}`);
        setScreen("error");
        return;
      }

      const text = data.content?.map(b => b.text || "").join("") || "";
      if (!text) {
        setErrorMsg("Got an empty response. Please try again in a moment.");
        setScreen("error");
        return;
      }

      // Strip markdown fences and find the JSON object
      const clean = text.replace(/```json|```/g, "").trim();
      const jsonStart = clean.indexOf("{");
      const jsonEnd = clean.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) {
        setErrorMsg("Couldn't find valid JSON in the response. Try pasting your transactions as plain text instead.");
        setScreen("error");
        return;
      }

      const parsed = JSON.parse(clean.slice(jsonStart, jsonEnd + 1));

      if (parsed.error) {
        setErrorMsg(parsed.error);
        setScreen("error");
      } else {
        setResult(parsed);
        setScreen("results");
      }
    } catch (e) {
      clearInterval(msgInterval);
      setErrorMsg(`Parse error: ${e.message}. Try pasting your transactions as plain text instead of uploading.`);
      setScreen("error");
    }
  }

  function resetAll() {
    setScreen("home");
    setResult(null);
    setInput("");
    setUploadedFile(null);
    setReportUnlocked(false);
    setShowPayModal(false);
    setAwaitingReturn(false);
    localStorage.removeItem("spendtrap_result");
  }

  function handleShare() {
    const text = result
      ? `SpendTrap just found $${Math.round(result.totalAnnualWaste).toLocaleString()}/year trapped in my subscriptions and fees. My Waste Score: ${result.wasteScore}/100 (Grade ${result.grade}). What's yours? 👉 spendtrap.com`
      : "";
    // Primary: modern clipboard API
    const doCopy = () => {
      setShareFlash(true);
      setTimeout(() => setShareFlash(false), 2500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(doCopy).catch(() => fallbackCopy(text, doCopy));
    } else {
      fallbackCopy(text, doCopy);
    }
  }

  function fallbackCopy(text, onSuccess) {
    // Works inside iframes and older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:-999px;left:-999px;opacity:0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      onSuccess();
    } catch {}
    document.body.removeChild(ta);
  }

  const fontLink = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800;900&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #0a0a0a; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #111; }
      ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
      textarea { resize: none; }
      textarea::placeholder { color: #333; }
      @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.2} }
      @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      .fade-up  { animation: fadeUp 0.5s ease forwards; }
      .fade-up-1{ animation: fadeUp 0.5s 0.1s ease both; }
      .fade-up-2{ animation: fadeUp 0.5s 0.2s ease both; }
      .fade-up-3{ animation: fadeUp 0.5s 0.3s ease both; }
      .fade-up-4{ animation: fadeUp 0.5s 0.4s ease both; }
      .fade-up-5{ animation: fadeUp 0.5s 0.5s ease both; }
      .drop-zone { transition: all 0.2s ease; }
    `}</style>
  );

  const shell = (children) => (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e8e8e8", fontFamily: "'Syne', sans-serif", overflowX: "hidden" }}>
      {fontLink}
      {verifying && (
        <div style={{ position: "fixed", inset: 0, background: "#000000ee", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🪤</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Verifying your payment...</div>
            <div style={{ fontSize: 13, color: "#666" }}>Just a second while we confirm with Stripe.</div>
          </div>
        </div>
      )}
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, fontSize: 14 }}>🪤</div>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>SpendTrap</span>
          <span style={{ fontSize: 9, color: "#ef4444", fontFamily: "monospace", border: "1px solid #ef444433", padding: "2px 6px", borderRadius: 2, letterSpacing: "0.1em" }}>BETA</span>
        </div>
        {screen !== "home" && (
          <button onClick={resetAll} style={{ background: "none", border: "1px solid #222", color: "#666", fontSize: 12, padding: "6px 14px", borderRadius: 4, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}>
            ← New Audit
          </button>
        )}
      </div>
      {children}
      <div style={{ borderTop: "1px solid #141414", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 12, color: "#444", fontFamily: "monospace" }}>🪤 SpendTrap © 2026</span>
        <a href="mailto:partnerships@spendtrap.com" style={{ fontSize: 12, color: "#666", fontFamily: "monospace", textDecoration: "none" }}>partnerships@spendtrap.com</a>
      </div>
  );

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") return shell(
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "60px 24px 40px" }}>
      <div className="fade-up" style={{ marginBottom: 48 }}>
        <div style={{ display: "inline-block", fontFamily: "monospace", fontSize: 11, color: "#ef4444", letterSpacing: "0.2em", marginBottom: 20, border: "1px solid #ef444433", padding: "4px 10px", borderRadius: 2 }}>
          SUBSCRIPTION TRAP DETECTOR
        </div>
        <h1 style={{ fontSize: "clamp(36px, 7vw, 58px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 16 }}>
          Your money is<br /><span style={{ color: "#ef4444" }}>trapped.</span>
        </h1>
        <p style={{ fontSize: 16, color: "#aaa", lineHeight: 1.6, maxWidth: 480 }}>
          Upload a bank statement or paste your transactions to see a free preview of the subscriptions, repeat charges, and hidden spending leaks draining your account. Unlock the full audit for $4.99 one-time.
        </p>
      </div>

      <div className="fade-up-1">
        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 0, marginBottom: 12, border: "1px solid #1e1e1e", borderRadius: 7, padding: 4, background: "#0d0d0d" }}>
          {[{ id: "paste", label: "✏️  Paste Text" }, { id: "upload", label: "📎  Upload File" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "9px 0", border: "none", borderRadius: 5, cursor: "pointer",
              fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
              background: tab === t.id ? "#1a1a1a" : "transparent",
              color: tab === t.id ? "#e8e8e8" : "#555",
              boxShadow: tab === t.id ? "0 1px 4px #00000060" : "none",
              transition: "all 0.2s ease",
            }}>{t.label}</button>
          ))}
        </div>

        {/* PASTE TAB */}
        {tab === "paste" && (
          <div style={{ border: "1px solid #1e1e1e", borderRadius: 8, overflow: "hidden", background: "#0d0d0d" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 8 }}>
              {["#ef4444", "#eab308", "#22c55e"].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.6 }} />
              ))}
              <span style={{ fontSize: 11, color: "#444", fontFamily: "monospace", marginLeft: 4 }}>paste_statement.txt</span>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={"Paste transactions here...\n\nExamples that work great:\n• Bank statement text (copy from your bank's website)\n• Credit card charges list\n• A simple list: Netflix $15.99, Gym $49/mo, Spotify $9.99\n• Any format with merchant names + amounts"}
              style={{ width: "100%", height: 220, background: "transparent", border: "none", outline: "none", color: "#d4d4d4", fontFamily: "'Space Mono', monospace", fontSize: 13, lineHeight: 1.7, padding: "16px" }}
            />
          </div>
        )}

        {/* UPLOAD TAB */}
        {tab === "upload" && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              style={{ display: "none" }}
              onChange={e => { if (e.target.files[0]) handleFile(e.target.files[0]); }}
            />

            {!uploadedFile ? (
              <div
                className="drop-zone"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${isDragging ? "#ef4444" : "#252525"}`,
                  borderRadius: 8, background: isDragging ? "#180808" : "#0d0d0d",
                  padding: "52px 24px", textAlign: "center", cursor: "pointer",
                  transform: isDragging ? "scale(1.01)" : "scale(1)",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>📂</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                  {isDragging ? "Drop it here" : "Drag & drop your statement"}
                </div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 20 }}>or click to browse</div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  {Object.values(ACCEPTED_TYPES).filter((v, i, a) => a.findIndex(x => x.label === v.label) === i).map(({ label, icon }) => (
                    <span key={label} style={{ fontFamily: "monospace", fontSize: 10, color: "#555", border: "1px solid #222", padding: "3px 9px", borderRadius: 3, letterSpacing: "0.1em" }}>
                      {icon} {label}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ border: "1px solid #1a3a1a", borderRadius: 8, background: "#080f08", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, background: "#0d2a0d", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    {ACCEPTED_TYPES[uploadedFile.type]?.icon || "📄"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {uploadedFile.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>
                      {(uploadedFile.size / 1024).toFixed(1)} KB · {ACCEPTED_TYPES[uploadedFile.type]?.label}
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    style={{ background: "#1a0808", border: "1px solid #2d0f0f", color: "#ef4444", borderRadius: 5, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontFamily: "monospace", flexShrink: 0 }}
                  >✕ Remove</button>
                </div>
                <div style={{ marginTop: 14, padding: "10px 12px", background: "#0a1a0a", borderRadius: 6, border: "1px solid #162016" }}>
                  <div style={{ fontSize: 11, color: "#22c55e", fontFamily: "monospace" }}>
                    ✓ Ready · All transactions will be extracted automatically
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: 10, padding: "10px 14px", background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: "#555", lineHeight: 1.6 }}>
                <span style={{ color: "#666", fontWeight: 700 }}>Works best with:</span> PDF exports from your bank's website, screenshots of your statement, or photos of a printed statement. Your file is never stored.
              </div>
            </div>
          </div>
        )}

        <button
          onClick={analyze}
          disabled={!canSubmit}
          style={{
            width: "100%", marginTop: 12,
            background: canSubmit ? "#ef4444" : "#1a1a1a",
            color: canSubmit ? "#fff" : "#444",
            border: "none", borderRadius: 6, padding: "16px",
            fontSize: 15, fontWeight: 800, cursor: canSubmit ? "pointer" : "not-allowed",
            fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em",
            transition: "all 0.2s ease",
          }}>
          See My Free Preview →
        </button>

        <div style={{ marginTop: 10, textAlign: "center", fontSize: 12, color: "#666" }}>
          Free preview included. Full audit unlock is $4.99 one-time. No subscription.
        </div>

        <div style={{ display: "flex", gap: 20, marginTop: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {["No account needed", "Read-only analysis", "File deleted after processing", "No subscription required"].map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#666" }}>
              <span style={{ color: "#22c55e" }}>✓</span> {t}
            </div>
          ))}
        </div>
      </div>

      <div className="fade-up-2" style={{ marginTop: 60, borderTop: "1px solid #141414", paddingTop: 40 }}>
        <p style={{ fontSize: 11, color: "#444", letterSpacing: "0.15em", marginBottom: 20, fontFamily: "monospace" }}>WHAT YOU'LL GET</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { icon: "🎯", label: "Waste Score", desc: "0–100 rating of your financial waste" },
            { icon: "✂️", label: "Cut List", desc: "Every subscription you should cancel" },
            { icon: "🔄", label: "Swap Deals", desc: "Cheaper alternatives saving you real money" },
          ].map(({ icon, label, desc }) => (
            <div key={label} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 8, padding: "16px 14px" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── LOADING ───────────────────────────────────────────────────────────────
  if (screen === "loading") return shell(
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: 24 }}>
      <div style={{ position: "relative", width: 60, height: 60 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            position: "absolute", width: 10, height: 10, borderRadius: "50%", background: "#ef4444",
            top: i < 2 ? 0 : "auto", bottom: i >= 2 ? 0 : "auto",
            left: i % 2 === 0 ? 0 : "auto", right: i % 2 === 1 ? 0 : "auto",
            animation: `pulse-dot 1.2s ${i * 0.3}s ease-in-out infinite`
          }} />
        ))}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 20 }}>🪤</div>
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 13, color: "#ef4444", letterSpacing: "0.1em" }}>{loadingMsg}</div>
      <div style={{ fontSize: 12, color: "#333", fontFamily: "monospace" }}>
        {tab === "upload" && uploadedFile ? `Reading ${uploadedFile.name}...` : `Scanning ${input.split("\n").length} lines`}
      </div>
    </div>
  );

  // ── ERROR ─────────────────────────────────────────────────────────────────
  if (screen === "error") return shell(
    <div style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 20 }}>🤔</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Couldn't Parse That</h2>
      <p style={{ color: "#666", marginBottom: 28, lineHeight: 1.6 }}>{errorMsg}</p>
      <button onClick={resetAll} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}>Try Again</button>
    </div>
  );

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (screen === "results" && result) {
    const gradeColor = gradeColors[result.grade] || "#ef4444";
    const swaps = result.swaps || [];

    return shell(
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px 80px" }}>

        <div className="fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
          <ScoreRing score={result.wasteScore} grade={result.grade} />
          <div style={{ marginTop: 16 }}>
            <span style={{ background: gradeColor + "22", color: gradeColor, fontFamily: "monospace", fontSize: 11, letterSpacing: "0.2em", padding: "4px 12px", borderRadius: 3, border: `1px solid ${gradeColor}44` }}>
              GRADE {result.grade} — {gradeLabels[result.grade]}
            </span>
          </div>
          <p style={{ marginTop: 16, fontSize: 20, fontWeight: 700, color: "#d4d4d4", letterSpacing: "-0.01em" }}>
            "{result.headline}"
          </p>
        </div>

        <div className="fade-up-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Monthly Waste", value: result.totalMonthlyWaste, color: "#ef4444" },
            { label: "Annual Waste", value: result.totalAnnualWaste, color: "#f97316" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 8, padding: "20px" }}>
              <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 8 }}>{label.toUpperCase()}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color, fontFamily: "monospace" }}><CountUp target={Math.round(value)} /></div>
              <div style={{ fontSize: 11, color: "#444", marginTop: 4 }}>per {label.includes("Annual") ? "year" : "month"}</div>
            </div>
          ))}
        </div>

        {result.topInsight && (
          <div className="fade-up-2" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderLeft: "3px solid #ef4444", borderRadius: "0 8px 8px 0", padding: "16px 20px", marginBottom: 28 }}>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 6 }}>TOP INSIGHT</div>
            <div style={{ fontSize: 14, color: "#ccc", lineHeight: 1.6 }}>{result.topInsight}</div>
          </div>
        )}

        {/* ── FREE-TIER AFFILIATE STRIP ── visible to ALL users, paid or not ── */}
        <div className="fade-up-2" style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 12 }}>
            QUICK WINS — FREE TO DO RIGHT NOW
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              {
                icon: "🏦",
                label: "Stop paying bank fees",
                desc: "Switch to a free checking account — no monthly fees, ever.",
                cta: "Open Free Account",
                url: "https://www.chime.com/open-bank-account/?utm_source=spendtrap",
                badge: "FREE",
                badgeColor: "#22c55e",
              },
              {
                icon: "📱",
                label: "Cut your phone bill in half",
                desc: "Same coverage, half the price. Plans from $15/mo.",
                cta: "See Plans",
                url: "https://www.mintmobile.com/?utm_source=spendtrap",
                badge: "POPULAR",
                badgeColor: "#3b82f6",
              },
              {
                icon: "✂️",
                label: "Cancel forgotten subscriptions automatically",
                desc: "Rocket Money finds and cancels bills you forgot about.",
                cta: "Try Free",
                url: "https://www.rocketmoney.com/?utm_source=spendtrap",
                badge: "FREE TRIAL",
                badgeColor: "#a855f7",
              },
            ].map((offer, i) => (
              <a
                key={i}
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div style={{
                  background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 8,
                  padding: "14px 16px", display: "flex", alignItems: "center", gap: 14,
                  cursor: "pointer", transition: "border-color 0.15s ease",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#2a2a2a"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e1e"}
                >
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{offer.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#d4d4d4" }}>{offer.label}</span>
                      <span style={{
                        fontSize: 8, fontWeight: 700, letterSpacing: "0.12em",
                        color: offer.badgeColor, border: `1px solid ${offer.badgeColor}44`,
                        padding: "2px 6px", borderRadius: 2, fontFamily: "monospace",
                        background: offer.badgeColor + "11", flexShrink: 0,
                      }}>{offer.badge}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#555", lineHeight: 1.4 }}>{offer.desc}</div>
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: "#22c55e",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>{offer.cta} ↗</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "#666", fontFamily: "monospace", textAlign: "left" }}>
            Some recommendations are partner links. We may earn a fee if you sign up.
          </div>
        </div>

        {result.categories?.length > 0 && (
          <div className="fade-up-3" style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace", letterSpacing: "0.15em" }}>BREAKDOWN BY CATEGORY</div>
              {!reportUnlocked && result.categories.length > 1 && (
                <div style={{ fontSize: 10, color: "#f97316", fontFamily: "monospace", letterSpacing: "0.08em" }}>
                  🔒 {result.categories.length - 1} more locked
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {result.categories.map((cat, ci) => {
                // Hard gate — only render first category for free
                if (!reportUnlocked && ci > 0) return (
                  <div
                    key={ci}
                    onClick={() => setShowPayModal(true)}
                    style={{ background: "#0d0d0d", border: "1px dashed #2a1e0a", borderRadius: 8, padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 14 }}>🔒</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#555" }}>
                          {/* Show category name as teaser but blur the amount */}
                          {cat.name}
                        </div>
                        <div style={{ fontSize: 11, color: "#333", marginTop: 2 }}>{cat.items?.length} item{cat.items?.length !== 1 ? "s" : ""} hidden</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#f97316" }}>Included in Full Audit</div>
                  </div>
                );
                return (
                  <div key={ci} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ padding: "12px 16px", borderBottom: "1px solid #141414", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{cat.name}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 13, color: "#888" }}>${cat.monthlyTotal?.toFixed(2)}/mo</span>
                    </div>
                    {cat.items?.map((item, ii) => (
                      <div key={ii} style={{ padding: "10px 16px", display: "flex", alignItems: "flex-start", gap: 12, borderBottom: ii < cat.items.length - 1 ? "1px solid #141414" : "none" }}>
                        <VerdictBadge verdict={item.verdict} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
                            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#777" }}>${item.amount?.toFixed(2)}/mo</span>
                          </div>
                          <div style={{ fontSize: 11, color: "#555", lineHeight: 1.4 }}>{item.reason}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

              <div onClick={() => setShowPayModal(true)} style={{ marginTop: 10, padding: "12px 16px", background: "#0a0805", border: "1px dashed #2a1e0a", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 12, color: "#888" }}>Unlock remaining categories, swaps, and action plan</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#f97316" }}>Unlock Full Audit — $4.99</div>
              </div>
          </div>
        )}

        {swaps.length > 0 && (
          <div className="fade-up-4" style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 14 }}>RECOMMENDED SWAPS</div>

            {!reportUnlocked ? (
              /* Hard gate — swaps not rendered at all until paid */
              <div
                onClick={() => setShowPayModal(true)}
                style={{ background: "#0a0805", border: "1px dashed #2a1e0a", borderRadius: 10, padding: "32px 24px", textAlign: "center", cursor: "pointer" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>🔒</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316", marginBottom: 6 }}>
                  {swaps.length} Swap Recommendation{swaps.length > 1 ? "s" : ""} Locked
                </div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6, marginBottom: 20, maxWidth: 320, margin: "0 auto 20px" }}>
                  Unlock the full audit to see every suggested swap, every action step, and your downloadable report.
                </div>
                <div style={{ display: "inline-block", background: "#ef4444", color: "#fff", padding: "11px 28px", borderRadius: 7, fontSize: 14, fontWeight: 800 }}>
                  Unlock Full Audit — $4.99
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: "#666" }}>One-time payment · No subscription · Instant access</div>
              </div>
            ) : (
              /* Unlocked — show all swaps */
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {swaps.map((swap, si) => {
                    const url = getSwapUrl(swap);
                    return (
                      <div key={si} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 8, padding: "16px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                            <span style={{ fontSize: 13, color: "#ef4444", fontWeight: 600, textDecoration: "line-through" }}>{swap.from}</span>
                            <span style={{ color: "#444" }}>→</span>
                            <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>{swap.to}</span>
                          </div>
                          <div style={{ fontSize: 11, color: "#555" }}>Save ${swap.monthlySavings?.toFixed(0)}/mo · ${swap.annualSavings?.toFixed(0)}/yr</div>
                        </div>
                        <a href={url} target="_blank" rel="noopener noreferrer"
                          style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e44", borderRadius: 5, padding: "8px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif", letterSpacing: "0.05em", whiteSpace: "nowrap", textDecoration: "none", display: "inline-block" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#22c55e44"}
                          onMouseLeave={e => e.currentTarget.style.background = "#22c55e22"}>
                          {swap.action || "Switch Now"} ↗
                        </a>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 14, padding: "12px 16px", background: "#0a0a12", border: "1px solid #1a1a2e", borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
                  <div style={{ fontSize: 11, color: "#444", lineHeight: 1.6 }}>
                    <span style={{ color: "#555", fontWeight: 700 }}>Transparency:</span> Some links are affiliate links — if you sign up, we earn a small fee at no cost to you.
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <div className="fade-up-5" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 10, padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>📣</div>
          <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>Share Your Score</h3>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 20, lineHeight: 1.5 }}>
            "SpendTrap found ${Math.round(result.totalAnnualWaste).toLocaleString()}/year in wasted spending in my account. My Waste Score was {result.wasteScore}. What would yours be?"
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={handleShare} style={{ background: shareFlash ? "#22c55e" : "#ef4444", color: "#fff", border: "none", borderRadius: 6, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "'Syne', sans-serif", transition: "background 0.3s ease" }}>
              {shareFlash ? "✓ Copied!" : "Copy & Share"}
            </button>
            <button onClick={resetAll} style={{ background: "transparent", color: "#888", border: "1px solid #333", borderRadius: 6, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}>
              Audit Another Statement
            </button>
          </div>
        </div>

        {/* Save Report CTA */}
        <div className="fade-up-5" style={{ marginTop: 16, background: reportUnlocked ? "#080f08" : "#0a0805", border: `1px solid ${reportUnlocked ? "#1a3a1a" : "#2a1e0a"}`, borderRadius: 10, padding: "24px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "0.12em", color: reportUnlocked ? "#22c55e" : "#f97316", marginBottom: 6 }}>
              {reportUnlocked ? "✓ INCLUDED WITH FULL AUDIT" : "INCLUDED WITH FULL AUDIT"}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
              {reportUnlocked ? "Download your printable action plan" : "Get a printable PDF you can act on"}
            </div>
            <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>
              {reportUnlocked
                ? "Full breakdown, swap recommendations, and action steps — ready to print or share."
                : "Full breakdown · Swap table · Action steps you can actually use. Included in the full audit."}
            </div>
          </div>
          {reportUnlocked ? (
            <button
              onClick={() => generatePDF(result)}
              style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 6, padding: "12px 22px", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap" }}>
              ⬇ Download PDF
            </button>
          ) : (
            <button
              onClick={() => setShowPayModal(true)}
              style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 6, padding: "12px 22px", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap" }}>
              Unlock for $4.99 →
            </button>
          )}
        </div>

        {/* Payment Modal */}
        {showPayModal && (
          <div style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "32px", maxWidth: 420, width: "100%" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🪤</div>
              <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Unlock Full Audit</h3>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 24, lineHeight: 1.6 }}>
                One-time payment of <strong style={{ color: "#ef4444" }}>$4.99</strong>. No subscription. Instant access.
              </p>

              {/* What's included */}
              <div style={{ background: "#0d0d0d", borderRadius: 8, padding: "14px 16px", marginBottom: 24 }}>
                {[
                  "All locked categories unlocked",
                  "Complete swap recommendations and action steps",
                  "Cancellation links and provider negotiation guide",
                  "Downloadable PDF report — ready to print or share",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 10 : 0 }}>
                    <span style={{ color: "#22c55e", fontSize: 13, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a
                  href={STRIPE_PAYMENT_LINK}
                  target="_self"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (result) localStorage.setItem("spendtrap_result", JSON.stringify(result));
                  }}
                  style={{ display: "block", background: "#ef4444", color: "#fff", border: "none", borderRadius: 7, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "'Syne', sans-serif", textAlign: "center", textDecoration: "none" }}>
                  Unlock Full Audit — $4.99
                </a>

                <button
                  onClick={() => { setShowPayModal(false); setAwaitingReturn(false); }}
                  style={{ background: "none", border: "none", color: "#555", fontSize: 12, cursor: "pointer", fontFamily: "'Syne', sans-serif", padding: "4px" }}>
                  Maybe later
                </button>
              </div>

              <div style={{ marginTop: 16, fontSize: 10, color: "#333", fontFamily: "monospace", textAlign: "center", lineHeight: 1.6 }}>
                Secured by Stripe · No card data touches SpendTrap servers
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
