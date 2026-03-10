import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpendTrap — Subscription Trap Detector",
  description: "Find every subscription, fee, and hidden charge draining your account. Free preview. Full audit $4.99 one-time.",
  metadataBase: new URL("https://spendtrap.com"),
  openGraph: {
    title: "SpendTrap — Subscription Trap Detector",
    description: "Find every subscription, fee, and hidden charge draining your account. Free preview. Full audit $4.99 one-time.",
    url: "https://spendtrap.com",
    siteName: "SpendTrap",
    images: [
      {
        url: "/og-image.png",
        width: 1270,
        height: 760,
        alt: "SpendTrap — Subscription Trap Detector",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpendTrap — Subscription Trap Detector",
    description: "Find every subscription, fee, and hidden charge draining your account. Free preview. Full audit $4.99 one-time.",
    images: ["/og-image.png"],
  },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SpendTrap",
          "url": "https://spendtrap.com",
          "description": "Find every subscription, fee, and hidden charge draining your account.",
          "applicationCategory": "FinanceApplication",
          "offers": {
            "@type": "Offer",
            "price": "4.99",
            "priceCurrency": "USD"
          }
        })}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
