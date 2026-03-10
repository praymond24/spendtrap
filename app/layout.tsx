import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpendTrap — Subscription Trap Detector",
  description: "Find every subscription, fee, and hidden charge draining your account. Free preview. Full audit $4.99 one-time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FLCGJCZF98"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FLCGJCZF98');
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
